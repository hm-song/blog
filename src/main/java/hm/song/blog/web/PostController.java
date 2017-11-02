package hm.song.blog.web;

import hm.song.blog.core.post.Post;
import hm.song.blog.core.post.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService service;

    @GetMapping(value = "/posts")
    @ResponseBody
    public Page<Post> getPosts(int page, int size) {
        return service.getPosts(page, size);
    }

    @GetMapping(value = "/posts/{id}")
    public String showPostDetail(@PathVariable int id, Model model) {
        Post post = service.getPost(id);
        model.addAttribute("title", post.getTitle());
        model.addAttribute("contents", post.getContents());
        return "post";
    }
}
