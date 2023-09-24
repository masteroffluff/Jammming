import React from 'react';
import Track from './Track';



function SearchResults({searchResults,callback}){
    const addToPlaylist=(t)=>{
        callback(t)
    }

    return<>
        {searchResults.map((track,index)=>{return(
        <>
                <Track 
                key={index} 
                track={track} 
                callback={addToPlaylist}
                callBackLabel={'Add'}
                />
        </>
        )}
        )}
    </>
}

export default SearchResults