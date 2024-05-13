//import mockSearchResults from "./mockSearchResults"

const client_id = '5a8b6b4d07494bc9b4885a6d959083c1';
const scope = 'user-read-private playlist-modify-private playlist-modify-public';
const redirectUri = 'http://preeminent-mooncake-36d241.netlify.app';

//Obtain a Spotify Access Token

const Spotify = {

    spotifyAccessToken: (callback, accessToken) => {
        const urlParams = new URLSearchParams(window.location.search);



        if (accessToken) { return accessToken }
        if (urlParams.has("code")) {

            let code = urlParams.get('code');
            let codeVerifier = localStorage.getItem('code_verifier');

            let body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: client_id,
                code_verifier: codeVerifier
            });
            fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('HTTP status ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    //alert(data.access_token)
                    callback(data.access_token);
                })
                .catch(error => {
                    console.error('Error:', error);
                });


        }
        else {


            function generateRandomString(length) {
                let text = '';
                let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                for (let i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

            let codeVerifier = generateRandomString(128);


            async function generateCodeChallenge(codeVerifier) {
                function base64encode(string) {
                    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
                        .replace(/\+/g, '-')
                        .replace(/\//g, '_')
                        .replace(/=+$/, '');
                }

                const encoder = new TextEncoder();
                const data = encoder.encode(codeVerifier);
                const digest = await window.crypto.subtle.digest('SHA-256', data);

                return base64encode(digest);
            }

            generateCodeChallenge(codeVerifier)
                .then(codeChallenge => {
                    let state = generateRandomString(16);


                    localStorage.setItem('code_verifier', codeVerifier);

                    let args = new URLSearchParams({
                        response_type: 'code',
                        client_id: client_id,
                        scope: scope,
                        redirect_uri: redirectUri,
                        state: state,
                        code_challenge_method: 'S256',
                        code_challenge: codeChallenge
                    });


                    window.location = 'https://accounts.spotify.com/authorize?' + args;
                })
        }


    },
    // *************************************************************************************************************************
    //Implement Spotify Search Request
    search: (input, accessToken, callback) => {

        if (input === '') { return [] }

        console.log(input)
        const processJSONintoTrackArray = (resultsJSON) => {

            function trackFactory(id, name, artist, album, uri) {
                return {
                    id,
                    name,
                    artist,
                    album,
                    uri

                }
            }


            return resultsJSON.tracks.items.map((item) => trackFactory(item.id, item.name, item.artists[0].name, item.album.name, item.uri))
        }

        const uriInput = encodeURIComponent(input)

        const endPoint = `https://api.spotify.com/v1/search?q=${uriInput}&type=track&market=GB`
        //console.log(endPoint)
        const parameters = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
        fetch(endPoint, parameters)
            .then(
                response => {
                    if (response.ok) { return response.json() };
                    throw new Error('Request failed!');
                }
            )
            .then(result => {
                console.log(JSON.stringify(result))
                return (callback(processJSONintoTrackArray(result)))
            })

    },
    // *************************************************************************************************************************
    // Save a User’s Playlist
    savePlaylistToSpotify: async (name, playList, accessToken) => {
        if (!name || !playList.length) {
            alert('Nothing chosen');
            return;
        }

        const GetUserName = async () => {
            const endPointGetUserName = 'https://api.spotify.com/v1/me';
            const parametersGetUserName = {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            };

            const response = await fetch(endPointGetUserName, parametersGetUserName);

            if (response.ok) {
                const result = await response.json();
                console.log(JSON.stringify(result));
                return result.id;
            } else {
                throw new Error('Username Request failed! ' + response.status);
            }
        };

        const makePlaylist = async (userId) => {
            const endPointMakePlaylist = `https://api.spotify.com/v1/users/${userId}/playlists`;
            const body = JSON.stringify({
                "name": name,
                "description": "Jammming List",
                "public": false
            });

            const parametersMakePlaylist = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: body
            };

            const response = await fetch(endPointMakePlaylist, parametersMakePlaylist);

            if (response.ok) {
                const result = await response.json();
                console.log(JSON.stringify(result));
                return result.id;
            } else {
                throw new Error('Make Playlist Request failed! ' + response.status);
            }
        };

        const addTracks = async (playListId) => {
            const endPointAddTracks = `https://api.spotify.com/v1/playlists/${playListId}/tracks`;
            const parametersAddTracks = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uris: playList.map((t) => t.uri)
                })
            };

            const response = await fetch(endPointAddTracks, parametersAddTracks);

            if (response.ok) {
                const result = await response.json();
                console.log(JSON.stringify(result));
                alert('Playlist Saved!');
            } else {
                throw new Error('Add Tracks Request failed! ' + response.status);
            }
        };

        const userID = await GetUserName();
        const playListId = await makePlaylist(userID);
        await addTracks(playListId);
    }

}





export default Spotify;

