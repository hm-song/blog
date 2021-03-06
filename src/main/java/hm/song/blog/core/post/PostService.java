package hm.song.blog.core.post;

import com.google.common.base.Strings;
import hm.song.blog.core.exception.PostIsNotPublishedException;
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

import java.util.*;

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
    public Page<PostDto> getPosts(boolean onlyPublic, int page) {
        PageRequest pageRequest = new PageRequest(page, PAGE_SIZE);

        Page<PostSummary> queryResult;
	    if (onlyPublic) {
			queryResult = postSummaryRepo.findByIsDisplayOrderByRegDateDesc(true, pageRequest);
        } else {
	    	queryResult = postSummaryRepo.findByOrderByRegDateDesc(pageRequest);
	    }

	    return toPagedDto(queryResult, pageRequest);
    }

    private Page<PostDto> toPagedDto(Page<PostSummary> queryResult, PageRequest pageRequest) {
	    List<PostSummary> posts = queryResult.getContent();
	    long totalSize = queryResult.getTotalElements();

	    List<PostDto> postDtoList = posts.stream()
			    .map(PostDto::summryOf)
			    .collect(toList());

	    return new PageImpl<>(postDtoList, pageRequest, totalSize);
    }

    @Transactional(readOnly = true)
    public Page<PostDto> searchPost(boolean onlyPublic, String search, int page) {
    	PageRequest pageRequest = new PageRequest(page, PAGE_SIZE);

	    Page<PostSummary> queryResult;
	    if (onlyPublic) {
    	    queryResult = postSummaryRepo.findByTitleLikeAndIsDisplayFromPostOrTagFromTag(search,
			        search, onlyPublic, pageRequest);
	    } else {
		    queryResult = postSummaryRepo.findByTitleLikeAndFromPostOrTagFromTag(search, search, pageRequest);
	    }

	    return toPagedDto(queryResult, pageRequest);
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
    public int writePost(String title, boolean display, String contents, String[] tags) {
        Post post = new Post();
        post.setTitle(title.trim());
        post.setContents(contents.trim());
        post.setRegDate(new Date());
        post.setModDate(new Date());
        post.setDisplay(display);

        // post먼저 저장후 생성되는 ID를 이후에 생성되는 테그에 사용한다.
        postRepo.saveAndFlush(post);

	    post.updateTag(tags);
	    return post.getId();
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

		post.updateTag(tags);
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
