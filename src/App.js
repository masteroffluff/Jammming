import React, {useEffect, useState} from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar'
import TrackList from './TrackList'
import Spotify from './Spotify'



function App(){
    const [accessToken, setAccessToken] = useState('');
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
         Spotify.spotifyAccessToken(setAccessToken)
      },[]); // run the access routine once at the start

    const searchBarCallback= (results)=>{
        setSearchResults(results)
      }

    return (
    <>
        <h1>Fluffy Awesome Spotify List Maker</h1>
       
        <div id='container'>
            <div id ="searchContainer">
                <h2>Search</h2>
                <SearchBar callback={searchBarCallback} accessToken={accessToken} />
                <SearchResults searchResults={searchResults} />
            </div>
            <div id="playListContainer">
                <h2>Playlist</h2>
                <TrackList />
            </div>
        
        </div>


    </>)
}


export default App


