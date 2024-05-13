import React,{useState} from 'react';
import style from './track.module.css'

function Track({track,callback, callBackLabel}){
    const [styleState, setStyleState]=useState(style.track2)
    function handleMouseEnter(){
        setStyleState(style.track1)
    }
    function handleMouseLeave(){
        setStyleState(style.track2)
    }
    function handleRemoveClick (e){
        callback(track)

    }

    return (
    <div className={style.track} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className={styleState}><h3>{track.name}</h3></div>
        <p style={{display:'inline', height:'auto'}}>{track.artist},{track.album} </p>
        <button onClick={handleRemoveClick}>{callBackLabel}</button>
    </div>)
}

export default Track