package hm.song.blog.web;

import hm.song.blog.core.post.domain.Post;
import hm.song.blog.core.post.domain.PostSummary;
import hm.song.blog.core.post.PostDto;
import hm.song.blog.core.post.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

@Controller
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService service;

    @GetMapping(value = "/posts")
    @ResponseBody
    public PageImpl<PostDto> getPosts(int page, int size, Principal principal) {
        logger.info("getPost - page={}, size={}", page, size);
        boolean authorized = principal != null;
        return service.getPosts(page, size, authorized);
    }

    @GetMapping(value = "/posts/{id}")
    public String showPostDetail(@PathVariable int id, Model model) {
        Post post = service.getPost(id);
        model.addAttribute("title", post.getTitle());
        model.addAttribute("contents", post.getContents());
        model.addAttribute("regDate", post.getReadableRegDate());
        return "post";
    }

    @PostMapping(value = "/posts/write")
    public String writePost(String title, String contents) {
        logger.info("writePost - title={}, contents = {}", contents);
        service.writePost(title, contents);
        return "redirect:/index";
    }

    @PostMapping(value = "/posts/{id}/remove")
    @ResponseBody
    public void removePost(@PathVariable int id) {
        logger.info("removePost - id={}", id);
        service.removePost(id);
    }
}
