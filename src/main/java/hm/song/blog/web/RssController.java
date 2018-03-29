package hm.song.blog.web;

import com.rometools.rome.feed.rss.*;
import hm.song.blog.core.post.domain.Post;
import hm.song.blog.core.post.repo.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
public class RssController {

	private static final String OWNER = "ConfidentDeveloper";

	@Autowired
	private PostRepository postRepo;

	@GetMapping("/rss")
	public Channel rss() {
		Channel channel = new Channel();
		channel.setFeedType("rss_2.0");
		channel.setTitle(OWNER);
		channel.setDescription("Share what I've known and learned");
		channel.setLink("https://confidentdeveloper.net/");
		channel.setUri("https://confidentdeveloper.net/");
		channel.setLanguage("ko");
		channel.setGenerator(OWNER);

		Date postDate = new Date();
		channel.setPubDate(postDate);

		List<Post> posts = postRepo.findByIsDisplayOrderByIdDesc(true);
		List<Item> items = posts.stream()
				.map(post -> {
					Item item = new Item();
					item.setAuthor(OWNER);
					item.setTitle(post.getTitle());
					item.setLink("https://confidentdeveloper.net/posts/" + post.getId());
					item.setPubDate(post.getRegDate());

					Guid guid = new Guid();
					guid.setValue("https://confidentdeveloper.net/posts/" + post.getId());
					item.setGuid(guid);

					List<Category> categories = post.getTags().stream().map(tag -> {
						Category category = new Category();
						category.setValue(tag.getTag());
						return category;
					}).collect(toList());
					item.setCategories(categories);

					Description description = new Description();
					description.setValue(post.getContents().length() > 200 ?
							post.getContents().substring(0, 190) :
							post.getContents());
					item.setDescription(description);

					return item;
				}).collect(toList());
		channel.setItems(items);

		return channel;
	}
}
