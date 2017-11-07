package hm.song.blog.core.post;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class PostService {

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    private PostRepository repo;

    @Transactional(readOnly = true)
    public Page<Post> getPosts(int page, int size) {
        return repo.findAllByOrderByRegDateDesc(new PageRequest(page, size));
    }

    @Transactional
    public void writePost(String title, String contents) {
        Post post = new Post();
        post.setTitle(title);
        post.setContents(contents);
        post.setRegDate(new Date());
        post.setModDate(new Date());
        repo.saveAndFlush(post);
    }

    @Transactional
    public void removePost(int id) {
        Post post = repo.findOne(id);
        if (post == null) {
            return;
        }

        post.setDisplay(false);
    }

    @Transactional
    public Post getPost(int id) {
        return repo.findOne(id);
    }
}
