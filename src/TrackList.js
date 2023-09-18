import React, {useState} from 'react';
import Track from './Track'

const dummyTracklist = [
    {id:1, name:"Trust the Pain",artist:'Witch of the Vale',album:'Commemorate'},
    {id:2, name:"Juicy",artist:'Angelspit',album:'Krankhaus'}
]

function TrackList(){
    const [tracks,setTracks] = useState(dummyTracklist) // state to hold the playist

function handleClick(){
        alert("saved to spotify")
    }

    const removeTrack = (trackIdToRemove) => {
        setTracks((prev)=>{return prev.filter((t)=>t.id!==trackIdToRemove)})
      }

    return <>
         {tracks.map((track) => (
            <Track 
              key={track.id} 
              track={track} 
              removeTrack={removeTrack}
            />
          ))}
          <br />
          <button type="text" onClick={handleClick}>Save To Spotify</button>
    </>
}

export default TrackList