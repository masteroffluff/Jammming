import React from 'react';

function Track({track,callback, callBackLabel}){

    function handleRemoveClick (e){
        callback(track)

    }

    return (
    <div style={{width:500, textAlign:'left'}}>
        <li>{track.name},{track.artist},{track.album} 
        <button onClick={handleRemoveClick}>{callBackLabel}</button>
        </li>
    </div>)
}

export default Track