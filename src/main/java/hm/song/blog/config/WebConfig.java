package hm.song.blog.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("index");
		registry.addViewController("/index").setViewName("index");
		registry.addViewController("/posts/**").setViewName("index");
		registry.addViewController("/page/**").setViewName("index");
		registry.addViewController("/admin/modify/**").setViewName("index");
		registry.addViewController("/admin/write").setViewName("index");

//		registry.addRedirectViewController("/posts/*", "/");
	}
}
