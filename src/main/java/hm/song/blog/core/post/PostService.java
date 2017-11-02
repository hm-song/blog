package hm.song.blog.core.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {

    @Autowired
    private PostRepository repo;

    @Transactional
    public Page<Post> getPosts(int page, int size) {
        return repo.findAllByOrderByRegDateDesc(new PageRequest(page, size));
    }

    @Transactional
    public Post getPost(int id) {
        return repo.findOne(id);
    }
}
