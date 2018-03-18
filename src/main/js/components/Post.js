import React from 'react';
import { NavLink } from 'react-router-dom';

import TagComponent from './common/TagComponent';

const Post = ({ post, authenticated }) => {
    const tags = post.tags.map(tag => {
        return (
            <TagComponent tag={tag.tag} key={tag.tag}/>
        )
    });

    return (
        <div>
            <header className="masthead" style={{backgroundImage: 'url("/image/banner.jpg")'}}>
                <div className="overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-md-10 mx-auto">
                            <div className="post-heading">
                                <h1>{post.title}</h1>
                                <h5>
                                    {tags}
                                </h5>
                                <span className="meta">
                                    Posted on {post.regDate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <article>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-md-10 mx-auto">
                            {post.contents}
                        </div>
                    </div>
                    <PostDetailHiddenMenu
                        postId={post.id}
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
