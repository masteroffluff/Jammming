//import mockSearchResults from "./mockSearchResults"

const client_id = '5a8b6b4d07494bc9b4885a6d959083c1';
const scope = 'user-read-private playlist-modify-private';


//Obtain a Spotify Access Token

const Spotify={
    
    spotifyAccessToken: (callback,accessToken)=>{
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUri = 'http://localhost:3000';
        

        if (accessToken){return accessToken}
        if (urlParams.has("code")){
        
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
                alert(data.access_token)
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

//Implement Spotify Search Request
    search:(input,accessToken,callback)=>{
        
        if (input==='') {return []}
        
        console.log(input)
        const processJSONintoTrackArray=(resultsJSON)=>{
            
            function trackFactory(id,name,artist,album){
                return {
                    id,
                    name,
                    artist,
                    album
                }
            }


            return resultsJSON.tracks.items.map((item)=>trackFactory(item.id,item.name,item.artists[0].name,item.album.name))
        }

        const uriInput = encodeURIComponent(input)
        
        const endPoint = `https://api.spotify.com/v1/search?q=${uriInput}&type=track&market=GB`
        console.log(endPoint)
        const searchParmeters = {
            method:'GET',
            headers: {
              Authorization: 'Bearer ' + accessToken
            }
        }
        fetch(endPoint,searchParmeters)
        .then(
            response=>{if(response.ok) {return response.json()};
            throw new Error('Request failed!');}        
        ) 
        .then(result=>{
            console.log(JSON.stringify(result))
            return (callback (processJSONintoTrackArray(result)))}) 
        
    },

//Save a User’s Playlist
    savePlaylistToSpotify:async (name,playList,accessToken)=>{
        // get the username
        const GetUserName = ()=>{
            const userNameEndPoint = 'https://api.spotify.com/v1/me'
            const usernameParameters = {
                method: 'GET',
                headers:{
                    Authorization: 'Bearer ' + accessToken
                }
            }
            fetch(userNameEndPoint,usernameParameters)
            .then(
                response=>{if(response.ok) {return response.json()};
                throw new Error('Username Request failed!');}        
            ) 
            .then(result=>{
                console.log(JSON.stringify(result))
                return (alert(result.display_name))
            })

        }
        GetUserName()
        
    }


}





export default Spotify;


async function getTokenFromAPI() {
    try {
        var params = {
            client_id: '<client_id>',
            response_type: 'token',
            redirect_uri: 'http://localhost:8888/callback'
        };

        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => `${esc(k)}=${esc(params[k])}`)
            .join('&');

        fetch('https://accounts.spotify.com/authorize', query).then(function (response) {
            console.log('response, ' + JSON.stringify(response));
            return response;
        })
    } catch(error) {
        console.error(error);
    }
}