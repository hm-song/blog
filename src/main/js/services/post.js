import axios from 'axios';

export function getPosts(page, size) {
    return axios.get('/api/posts?page=' + page + '&size=' + size);
}