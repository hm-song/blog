import React from 'react';

const Header = ({title, subTitle}) => {
    return (
        <header className="masthead" style={{backgroundImage: 'url("/image/banner.jpg")'}}>
            <div className="overlay" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="site-heading">
                            <h1>{title}</h1>
                            <span className="subheading">{subTitle}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
