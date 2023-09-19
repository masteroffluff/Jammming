import React, {useEffect, useState} from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar'
import TrackList from './TrackList'
import Spotify from './Spotify'



function App(){
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        setAccessToken( Spotify.SpotifyAccessToken())
      },[]); // run the access routine once at the start

    return (
    <>
        <h1>Fluffy Awesome Spotify List Maker</h1>
        <p>{accessToken}</p>
        <div id='container'>
            <div id ="searchContainer">
                <h2>Search</h2>
                <SearchBar />
                <SearchResults />
            </div>
            <div id="playListContainer">
                <h2>Playlist</h2>
                <TrackList />
            </div>
        
        </div>


    </>)
}


export default App