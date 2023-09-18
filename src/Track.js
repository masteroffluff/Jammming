import React from 'react';

function Track({track,removeTrack}){

    function handleRemoveClick (e){
        removeTrack(track.id)

    }

    return <>
    <li>{track.name},{track.artist},{track.album} 
    <button
        aria-label="Remove thought"
        className="remove-button"
        onClick={handleRemoveClick}
      >
    X
    </button>
    </li>
    </>
}

export default Track