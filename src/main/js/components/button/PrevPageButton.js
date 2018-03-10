import React from 'react';

const PrevPageButton = ({handleClick}) => {
    return (
        <button className="btn btn-primary float-left" onClick={handleClick}>&larr; Newer Posts</button>
    );
};

export default PrevPageButton;
