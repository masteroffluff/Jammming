import React,{useState} from 'react';
import spotify from '../utils/spotify.js'
import style from './searchbar.module.css'

function SearchBar({callback,accessToken}){

    const [trackName,setTrackName]= useState('')
    const handleNameChange=({target})=>{
        setTrackName(target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("search " + accessToken)
        spotify.search(trackName,accessToken,callback)

    }
    

    return (
    <div className={style.searchbar}>
        <h2>Search</h2>
        <form onSubmit={handleSubmit}>
            <label for="name">Name:</label>
            <input name="name" value={trackName} onChange = {handleNameChange}/>
{/*         <label for="artist">Artist</label>
            <input name="artist" />
            <label for="album">Album</label>
            <input name="album" /> */}
            <button type="submit">🔍 Search</button>
        </form>
    </div>)
}


export default SearchBar