import React,{useState} from 'react';
import Spotify from './Spotify.js'

function SearchBar({callback,accessToken}){

    const [trackName,setTrackName]= useState('')
    const handleNameChange=({target})=>{
        setTrackName(target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("search " + accessToken)
        Spotify.search(trackName,accessToken,callback)

    }
    

    return <>
    <form onSubmit={handleSubmit}>
        <label for="name">Name</label>
        <input name="name" value={trackName} onChange = {handleNameChange}/>
        <p>{trackName}</p>
{/*         <label for="artist">Artist</label>
        <input name="artist" />
        <label for="album">Album</label>
        <input name="album" />     */
        <button type="submit">🔍</button> }
    </form>
    </>
}


export default SearchBar