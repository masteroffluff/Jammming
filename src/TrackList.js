import React, {useState, useEffect} from 'react';
import Track from './Track'

const dummyTracklist = [
    {id:1, name:"Trust the Pain",artist:'Witch of the Vale',album:'Commemorate'},
    {id:2, name:"Juicy",artist:'Angelspit',album:'Krankhaus'}
]

function TrackList({newTrack}){
  const [tracks,setTracks] = useState(dummyTracklist) // state to hold the playist

  useEffect(()=>{
    if (newTrack) {
      console.log (newTrack.name)
      setTracks((prev) => ([ ...prev, newTrack]))
    }
  }
  ,[newTrack])

  function handleClick(){
        alert("saved to spotify")
    }

  const removeTrack = (trackToRemove) => {
    const trackIdToRemove = trackToRemove.id;
    setTracks((prev)=>{return prev.filter((t)=>t.id!==trackIdToRemove)})
    }

    return (
    <>
      <ul>
        {tracks.map((track) => (
          <Track 
            key={track.id} 
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

export default TrackList