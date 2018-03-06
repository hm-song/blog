import React from 'react';
import { NavLink } from 'react-router-dom';

const Post = ({ title, body, postId, authenticated }) => {
    return (
        <div>
            <header className="masthead" style={{backgroundImage: 'url("/image/banner.jpg")'}}>
                <div className="overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="site-heading">
                                <h1>{title}</h1>
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
                    <PostDetailHiddenMenu
                        postId={postId}
                        authenticated={authenticated}
                    />
                </div>
            </article>
        </div>
    );
};

const PostDetailHiddenMenu = ({ postId, authenticated }) => {
    if (authenticated) {
        return (
            <div style={{marginTop: 10, textAlign: 'right'}}>
                <NavLink to={"/modify/" + postId}>
                    <button type="button" className="btn btn-dark">수정모드</button>
                </NavLink>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

export default Post;
