import React, {useEffect, useState} from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar'
import PlayList from './PlayList'
import Spotify from './Spotify'
import './App.css'

function App(){
    const [accessToken, setAccessToken] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [newTrack, setNewTrack]= useState()

    const handleClick=()=>{
        //alert('click')
        //setAccessToken('');
        window.location.replace(
            'http://localhost:3000',
          );
        Spotify.spotifyAccessToken(setAccessToken,'')
    }

    useEffect(() => {
         Spotify.spotifyAccessToken(setAccessToken)
      },[]); // run the access routine once at the start

    const searchBarCallback= (results)=>{
        console.log("search bar callback")
        setSearchResults(results)

      }
    const addToPlaylist=(t)=>{
        setNewTrack(t)
    }

    if(accessToken){
    return (
    <div className='App'>
        <h1 style={{width:'100%', textAlign:'center'}}>JAMMMING aka Fluffy's Awesome Spotify List Maker</h1>
       
        <div className='trackContainer'>
            <div className='container'>
                
                <SearchBar callback={searchBarCallback} accessToken={accessToken} />
                <SearchResults searchResults={searchResults} callback={addToPlaylist} />
            </div>
            <div className="container">
                <PlayList newTrack={newTrack} accessToken={accessToken} />
            </div>
        
        </div>


    </div>)}
    return(
    <div className='App'>
        <h1 style={{width:'100%', textAlign:'center'}}>Fluffy's Awesome Spotify List Maker</h1>
    <button onClick={handleClick}>Logon to spotify</button>
    </div>)
  
}


export default App
