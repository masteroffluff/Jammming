import React from 'react';
import Track from './Track';



function SearchResults({searchResults,callback}){
    const addToPlaylist=(t)=>{
        callback(t)
    }

    return<>
        {searchResults.map((track)=>{return(
        <>
            <ul>
                <Track 
                key={track.id} 
                track={track} 
                callback={addToPlaylist}
                callBackLabel={'Add'}
                />
            </ul>        
        </>
        )}
        )}
    </>
}

export default SearchResults