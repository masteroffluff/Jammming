const client_id = '5a8b6b4d07494bc9b4885a6d959083c1';
const client_secret = 'd1148ead55644cb398608925944bc292';
//const spotifyBaseUrL = ""
const redirect_uri = 'http://localhost:3000';


//Obtain a Spotify Access Token

const Spotify={
    
    SpotifyAccessToken: async ()=>{
        
        const authParameters ={
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + client_id +'&client_secret='+client_secret
        }
        try{
            await fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(
                response=>{if(response.ok) {return response.json()};
                throw new Error('Request failed!');}        
            ) 
            .then(data=>(data.access_token)) 
            
            }
        catch(error){
            alert(error);
        }
    
    }

//Implement Spotify Search Request



//Save a User’s Playlist
};

export default Spotify;

