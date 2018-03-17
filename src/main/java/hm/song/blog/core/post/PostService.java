package hm.song.blog.core.post;

import com.google.common.base.Strings;
import hm.song.blog.core.exception.PostIsNotPublishedException;
import hm.song.blog.core.post.domain.BasePost;
import hm.song.blog.core.post.domain.Post;
import hm.song.blog.core.post.domain.PostSummary;
import hm.song.blog.core.post.domain.Tag;
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

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.toList;


@Service
public class PostService {

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    private static int PAGE_SIZE = 5;

    @Autowired
    private PostSummaryRepository postSummaryRepo;

    @Autowired
    private PostRepository postRepo;

    @Transactional(readOnly = true)
    public PageImpl<PostDto> getPosts(boolean onlyPublic, int page) {
        PageRequest pageRequest = new PageRequest(page, PAGE_SIZE);

        Page<PostSummary> queryResult;
	    if (onlyPublic) {
			queryResult = postSummaryRepo.findByIsDisplayOrderByRegDateDesc(true, pageRequest);
        } else {
	    	queryResult = postSummaryRepo.findByOrderByRegDateDesc(pageRequest);
	    }

	    List<PostSummary> posts = queryResult.getContent();
	    long totalSize = queryResult.getTotalElements();

        List<PostDto> postSummary = posts.stream()
                                        .map(PostDto::summryOf)
                                        .collect(toList());

        return new PageImpl<>(postSummary, pageRequest, totalSize);
    }

    @Transactional(readOnly = true)
    public PageImpl<PostDto> searchPost(boolean onlyPublic, String search, int page) {
    	PageRequest pageRequest = new PageRequest(page, PAGE_SIZE);

	    Page<PostSummary> queryResult;
	    if (onlyPublic) {
    	    queryResult = postSummaryRepo.findByTitleContainingAndIsDisplayOrderByRegDateDesc(search,
			        onlyPublic, pageRequest);
	    } else {
		    queryResult = postSummaryRepo.findByTitleContainingOrderByRegDateDesc(search, pageRequest);
	    }

	    List<PostSummary> posts = queryResult.getContent();
	    long totalSize = queryResult.getTotalElements();

	    List<PostDto> postSummary = posts.stream()
			    .map(PostDto::summryOf)
			    .collect(toList());

	    return new PageImpl<>(postSummary, pageRequest, totalSize);
    }

	@Transactional(readOnly = true)
	public Post getPost(int id, boolean authenticated) {
		Post post = postRepo.findOne(id);
		if (!authenticated && !post.isDisplay()) {
			throw new PostIsNotPublishedException();
		}

		return post;
	}

    @Transactional
    public int writePost(String title, String contents) {
        Post post = new Post();
        post.setTitle(title.trim());
        post.setContents(contents.trim());
        post.setRegDate(new Date());
        post.setModDate(new Date());
        return postRepo.saveAndFlush(post).getId();
    }

    @Transactional
    public int updatePost(int id, String title, String contents,
                          boolean isDisplay, String[] tags) {
        Post post = postRepo.findOne(id);
        if (post == null) {
            throw new RuntimeException("Post not found with id = " + id);
        }

        if (!Strings.isNullOrEmpty(title)) {
            post.setTitle(title.trim());
        }

        if (!Strings.isNullOrEmpty(contents)) {
            post.setContents(contents.trim());
        }

        // 요청 안들어온 태그 삭제
	    List<Tag> updatedTags = post.getTags().stream()
			    .filter(item -> Arrays.asList(tags).contains(item))
			    .collect(toList());

        // 새로운 태그 추가
        updatedTags.addAll(Arrays.stream(tags)
				        .map(tag -> new Tag(id, tag))
		                .filter(tag -> !updatedTags.contains(tag))
				        .collect(toList()));

	    post.setTags(updatedTags);
	    post.setDisplay(isDisplay);

        return id;
    }

    @Transactional
    public void hidePost(int id) {
        Post post = postRepo.findOne(id);
        if (post == null) {
            return;
        }
        post.setDisplay(false);
    }
}
