import React, {useState, useEffect} from 'react';
import Track from './Track'
import Spotify from './Spotify'
import style from './PlayList.module.css'


function PlayList({newTrack,accessToken}){
  const [tracks,setTracks] = useState([]) // state to hold the playist
  const [playlistName,setPlaylistName] = useState('') // state to hold the playist name

  useEffect(()=>{
    if (newTrack) {
      console.log (newTrack.name)
      let onTrackList = tracks.map(item => item.id).includes(newTrack.id)
      if (!onTrackList){
    
      setTracks((prev) => ([ ...prev, newTrack]))
      }
    }
  }
  ,[newTrack])

  function handlePlayListNameChange({target}){
    console.log (target.value)
    setPlaylistName(target.value)
  }

  function handleClick(){
    
      Spotify.savePlaylistToSpotify(playlistName,tracks,accessToken)
    }

  const removeTrack = (trackToRemove) => {
    const trackIdToRemove = trackToRemove.id;
    setTracks((prev)=>{return prev.filter((t)=>t.id!==trackIdToRemove)})
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
          {tracks.map((track,index) => (
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