//import mockSearchResults from "./mockSearchResults"

const client_id = '5a8b6b4d07494bc9b4885a6d959083c1';
const client_secret = 'd1148ead55644cb398608925944bc292';

//let accessToken ='';

//Obtain a Spotify Access Token

const Spotify={
    
    spotifyAccessToken: (callback)=>{
        const accessTokenEndpoint = 'https://accounts.spotify.com/api/token';
        const authParameters ={
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + client_id +'&client_secret='+client_secret
        }

        try{
            return fetch(accessTokenEndpoint, authParameters)
            .then(
                response=>{if(response.ok) {return response.json()};
                throw new Error('Request failed!');}        
            ) 
            .then(data=>{
                console.log(data.access_token)
                return (callback(data.access_token))}) 
            
            }
        catch(error){
            alert(error);
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

