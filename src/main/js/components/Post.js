import React from 'react';

const Post = ({ title, body }) => {
    return (
        <div>
            <header className="masthead" style={{backgroundImage: 'url("/image/banner.jpg")'}}>
                <div className="overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="site-heading">
                                <h1>{title}</h1>
                                <span className="subheading">Sub Title!!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <article>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            {body}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Post;
