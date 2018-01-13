import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({posts, onClickPost}) => {
    return (
        <div>
            {posts.map((item) => {
                return <Post id={item.id}
                             title={item.title}
                             regDate={item.regDate}
                             key={item.id}
                             onClick={() => onClickPost}/>
            })}
        </div>
    );
}

PostList.propTypes = {
    // postList: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         id: PropTypes.number,
    //         title: PropTypes.string,
    //         regDate: PropTypes.string
    //     })
    // ),
    // onClick: PropTypes.func.isRequired
};

export default PostList;
