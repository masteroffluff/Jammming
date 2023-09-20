import React from 'react';
import Spotify from './Spotify.js'

function SearchBar({callback}){



    const handleSubmit=(e)=>{
        e.preventDefault();
        Spotify.search("floorkiller",callback)

    }

    return <>
    <form>
        <label for="name">Name</label>
        <input name="name" />
{/*         <label for="artist">Artist</label>
        <input name="artist" />
        <label for="album">Album</label>
        <input name="album" />     */
        <button type="submit">🔍</button> }
    </form>
    </>
}


export default SearchBar