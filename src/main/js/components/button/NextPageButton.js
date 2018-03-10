import React from 'react';

const NextPageButton = ({handleClick}) => {
    return (
        <button className="btn btn-primary float-right" onClick={handleClick}>Older Posts &rarr;</button>
    );
};

export default NextPageButton;
