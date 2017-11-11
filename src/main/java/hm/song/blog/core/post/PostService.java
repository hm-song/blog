package hm.song.blog.core.post;

import hm.song.blog.core.post.domain.Post;
import hm.song.blog.core.post.domain.PostSummary;
import hm.song.blog.core.post.repo.PostRepository;
import hm.song.blog.core.post.repo.PostSummaryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class PostService {

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    private PostSummaryRepository postSummaryRepo;

    @Autowired
    private PostRepository postRepo;

    @Transactional(readOnly = true)
    public PageImpl<PostDto> getPosts(int page, int size, boolean includeHide) {
        PageRequest pageRequest = new PageRequest(page, size);
        List<PostSummary> posts;
        long totalSize;

        if (includeHide) {
            Page<PostSummary> queryResult = postSummaryRepo.findByOrderByRegDateDesc(pageRequest);
            posts = queryResult.getContent();
            totalSize = queryResult.getTotalElements();
        } else {
            Page<PostSummary> queryResult = postSummaryRepo.findByIsDisplayOrderByRegDateDesc(true, pageRequest);
            posts = queryResult.getContent();
            totalSize = queryResult.getTotalElements();
        }
        List<PostDto> postSummary = posts.stream()
                                        .map(PostDto::summryOf)
                                        .collect(toList());
        return new PageImpl<>(postSummary, pageRequest, totalSize);

    }

    @Transactional
    public void writePost(String title, String contents) {
        Post post = new Post();
        post.setTitle(title);
        post.setContents(contents);
        post.setRegDate(new Date());
        post.setModDate(new Date());
        postRepo.saveAndFlush(post);
    }

    @Transactional
    public void removePost(int id) {
        Post post = postRepo.findOne(id);
        if (post == null) {
            return;
        }
        post.setDisplay(false);
    }

    @Transactional
    public Post getPost(int id) {
        return postRepo.findOne(id);
    }
}
