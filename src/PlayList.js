import React, {useState} from 'react';
import Track from './Track'
import Spotify from './Spotify'
import style from './PlayList.module.css'


function PlayList({playlist,accessToken, removeCallback}){

  const [playlistName,setPlaylistName] = useState('') // state to hold the playist name


  function handlePlayListNameChange({target}){
    console.log (target.value)
    setPlaylistName(target.value)
  }

  function handleClick(){
    
      Spotify.savePlaylistToSpotify(playlistName,playlist,accessToken)
    }

  const removeTrack = (trackToRemove) => {
    const trackIdToRemove = trackToRemove.id;
    removeCallback(trackIdToRemove);
    }

    return (
      <>
      <div className={style.PlayList}>
        
        <h2>Playlist</h2>
        
        <form onSubmit={(e)=>e.preventDefault()}>
          <label for='Playlist Name'>Playlist Name:</label>
          <input name='Playlist Name' onChange={handlePlayListNameChange} value={playlistName} />
          <button type="text" onClick={handleClick}>Save To Spotify</button>
        </form>
        
        </div>  
          {playlist.map((track,index) => (
            <Track 
              key={index} 
              track={track} 
              callback={removeTrack}
              callBackLabel={'X'}
            />
          ))}

        
        
      
    </>)
}

export default PlayList