package hm.song.blog.web;

import hm.song.blog.core.post.domain.Post;
import hm.song.blog.core.post.PostDto;
import hm.song.blog.core.post.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/public")
public class PublicPostController {

	private static final Logger logger = LoggerFactory.getLogger(PublicPostController.class);

	@Autowired
	private PostService service;

	@GetMapping(value = "/posts")
	@ResponseBody
	public PageImpl<PostDto> getPosts(int page) {
		logger.info("getPost - page={}", page);
		return service.getPosts(page);
	}

	@GetMapping(value = "/posts/{id}")
	public Post showPostDetail(@PathVariable int id, Model model) {
		Post post = service.getPost(id);
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
