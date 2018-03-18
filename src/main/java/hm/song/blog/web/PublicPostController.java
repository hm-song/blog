package hm.song.blog.web;

import hm.song.blog.core.post.domain.Post;
import hm.song.blog.core.post.PostDto;
import hm.song.blog.core.post.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/public")
public class PublicPostController {

	private static final Logger logger = LoggerFactory.getLogger(PublicPostController.class);

	@Autowired
	private PostService service;

	@GetMapping(value = "/posts", params={"page"})
	@ResponseBody
	public Page<PostDto> getPosts(Principal principal, int page) {
		logger.info("getPost() - page={}, principal={}", page, principal != null);
		boolean onlyPublic = principal == null;
		return service.getPosts(onlyPublic, page);
	}

	@GetMapping(value = "/posts", params={"page", "search"})
	@ResponseBody
	public Page<PostDto> searchPost(Principal principal, String search, int page) {
		logger.info("searchPost() - search={}, page={}, principal={}", search, page, principal != null);
		boolean onlyPublic = principal == null;
		return service.searchPost(onlyPublic, search, page);
	}

	@GetMapping(value = "/posts/{id}")
	public Post showPostDetail(Principal principal, @PathVariable int id) {
		Post post = service.getPost(id, principal != null);
		post.getContents();
		return post;
	}

	@GetMapping(value = "/comments/write")
	@ResponseBody
	public String writeComment(Principal principal) {
		logger.info("{}", principal);
		return "Authentication is done";
	}
}
