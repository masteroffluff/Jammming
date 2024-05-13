import React, {useEffect, useState} from 'react';
import SearchResults from './searchResults/SearchResults';
import SearchBar from './searchBar/SearchBar'
import PlayList from './playlist/PlayList'
import Spotify from './Spotify'
import './App.css'

function App(){
    const [accessToken, setAccessToken] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults]=useState([])
    const [playlist,setPlaylist]=useState([]);

   

    useEffect(() => {
        Spotify.spotifyAccessToken(setAccessToken)
     },[]); // run the access routine once at the start

    useEffect(()=>{
                   
        setFilteredResults(()=>searchResults.filter((item)=>!((playlist.map((pl)=>pl.id)).includes(item.id))))

        }

        ,[playlist,searchResults]);
        
/*     const filterSerachList= ()=>{
        setSearchResults((prev)=>prev.filter((item)=>!((playlist.map((pl)=>pl.id)).includes(item.id))))
    } */


    const handleClick=()=>{
        //alert('click')
        //setAccessToken('');
        window.location.replace(
            'http://preeminent-mooncake-36d241.netlify.app',
          );
        Spotify.spotifyAccessToken(setAccessToken,'')
    }


    const searchBarCallback= (results)=>{
        console.log("search bar callback")
        setSearchResults(results)
        
      }
    
    const addToPlaylist=(t)=>{
        let onPlayList = playlist.map(item => item.id).includes(t.id)
        if (!onPlayList){
      
            setPlaylist((prev) => ([ ...prev, t]))
            
        }
    }
    const removeTrack = (trackIdToRemove) => {
        
        setPlaylist((prev)=>{return prev.filter((t)=>t.id!==trackIdToRemove)})
        
        }

    if(accessToken){
    return (
    <div className='App'>
        <h1 style={{width:'100%', textAlign:'center'}}>JAMMMING</h1>
        <h2>Spotify Song List Maker</h2>
                <div className='trackContainer'>
            <div className='container'>
                
                <SearchBar callback={searchBarCallback} accessToken={accessToken} />
                <SearchResults searchResults={filteredResults} callback={addToPlaylist} />
            </div>
            <div className="container">
                <PlayList playlist={playlist} accessToken={accessToken} removeCallback ={removeTrack}/>
            </div>
        
        </div>


    </div>)}
    return(
    <div className='App'>
        <h1 style={{width:'100%', textAlign:'center'}}>Jammming</h1>
    <button onClick={handleClick}>Logon to spotify</button>
    </div>)
  
}


export default App
