import React from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar'
import TrackList from './TrackList'



function App(){

    return <>
        <h1>Fluffy Awesome Spotify List Maker</h1>
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


    </>
}


export default App