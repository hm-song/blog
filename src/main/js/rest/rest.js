import axios from 'axios';

export function callGetPostsApi(page) {
    return axios.get('/api/posts?page=' + page);
}