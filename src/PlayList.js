import React, {useState, useEffect} from 'react';
import Track from './Track'
import Spotify from './Spotify'


function PlayList({newTrack,accessToken}){
  const [tracks,setTracks] = useState([]) // state to hold the playist
  const [playlistName,setPlaylistName] = useState('') // state to hold the playist name

  useEffect(()=>{
    if (newTrack) {
      console.log (newTrack.name)
      if (tracks.lenght===0||!(tracks.map(item => item.id).includes(newTrack.id))){
    
      setTracks((prev) => ([ ...prev, newTrack]))
      }
    }
  }
  ,[newTrack])

  function handlePlayListNameChange({target}){
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
      
      <h2>Playlist</h2>
      <form>
        <label for='Playlist Name'>Playlist Name</label>
        <input name='Playlist Name' onChange={handlePlayListNameChange} value={playlistName} />
      </form>
      <ul>  
        {tracks.map((track,index) => (
          <Track 
            key={index} 
            track={track} 
            callback={removeTrack}
            callBackLabel={'X'}
          />
        ))}
      </ul>
      <br />
      <button type="text" onClick={handleClick}>Save To Spotify</button>
    </>)
}

export default PlayList