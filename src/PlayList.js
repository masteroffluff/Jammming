import React, {useState, useEffect} from 'react';
import Track from './Track'

const dummyTracklist = [
    {id:1, name:"Trust the Pain",artist:'Witch of the Vale',album:'Commemorate'},
    {id:2, name:"Juicy",artist:'Angelspit',album:'Krankhaus'}
]

function PlayList({newTrack}){
  const [tracks,setTracks] = useState(dummyTracklist) // state to hold the playist
  const [playlistName,setPlaylistName] = useState('') // state to hold the playist name

  useEffect(()=>{
    if (newTrack) {
      console.log (newTrack.name)
      setTracks((prev) => ([ ...prev, newTrack]))
    }
  }
  ,[newTrack])

  function handlePlayListNameChange({target}){
    setPlaylistName(target.value)
  }

  function handleClick(){
        alert("saved to spotify")
    }

  const removeTrack = (trackToRemove) => {
    const trackIdToRemove = trackToRemove.id;
    setTracks((prev)=>{return prev.filter((t)=>t.id!==trackIdToRemove)})
    }

    return (
    <>
      
      <h2>Playlist</h2>
      <form>
        <label for='Playlist Name'></label>
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