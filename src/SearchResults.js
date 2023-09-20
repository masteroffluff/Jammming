import React from 'react';

function SearchResults({searchResults}){
    return<>
        {searchResults.map((sr)=>{return(
            <>
                <h3>{sr.name}</h3>
                <p>{sr.album} {sr.artist}</p>
                <br />
            </>
        )}
        )}
    </>
}

export default SearchResults