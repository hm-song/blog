package hm.song.blog.web;

import hm.song.blog.core.post.PostService;
import hm.song.blog.core.post.domain.Post;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin")
public class AdminPostController {

	private static final Logger logger = LoggerFactory.getLogger(AdminPostController.class);

	@Autowired
	private PostService service;

	@PostMapping(value = "/posts/write")
	public int writePost(String title, boolean display, String contents, String tags[]) {
		logger.info("writePost - title={}, display={}, tags={}, contents = {}",
				title, display, tags, contents);
		return service.writePost(title, display, contents, tags);
	}

	@GetMapping(value = "/posts/{id}/modify/view")
	public String getModifyView(Principal principal, @PathVariable int id, Model model) {
		Post post = service.getPost(id, principal != null);
		model.addAttribute("id", post.getId());
		model.addAttribute("title", post.getTitle());
		model.addAttribute("contents", post.getContents());
		model.addAttribute("regDate", post.getReadableRegDate());
		return "modify";
	}

	@PostMapping(value = "/posts/{id}/modify")
	public int updatePost(@PathVariable int id, String title,
	                      boolean display, String contents, String[] tags) {
		logger.info("updatePost() - id={}, title={}, display={}, contentsSize={}, tags={}",
				id, title, display, contents.length(), tags);
		return service.updatePost(id, title, contents, display, tags);
	}

	@PostMapping(value = "/posts/{id}/remove")
	@ResponseBody
	public void removePost(@PathVariable int id) {
		logger.info("hidePost - id={}", id);
		service.hidePost(id);
	}
}
