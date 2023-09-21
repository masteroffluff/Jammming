import React from 'react';

function Track({track,callback, callBackLabel}){

    function handleRemoveClick (e){
        callback(track)

    }

    return <>
    <li>{track.name},{track.artist},{track.album} 
    <button onClick={handleRemoveClick}>{callBackLabel}</button>
    </li>
    </>
}

export default Track