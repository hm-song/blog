package hm.song.blog.config;

import hm.song.blog.config.security.RestAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private Environment env;

	@Value("${admin.username}")
	String adminId;

	@Value("${admin.password}")
	String adminPwd;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/").permitAll()
				.antMatchers("/api/public/**").permitAll()
				.antMatchers("/posts/**").permitAll()
				.antMatchers("/css/**", "/image/**", "/js/**", "/libs/**", "/favicon.ico", "/bundle.js").permitAll()
				.antMatchers("/rss").permitAll()

				.antMatchers("/api/admin/**").authenticated()
				.antMatchers("/admin/**").authenticated()

				.and()
			.formLogin()
				.loginProcessingUrl("/handleLogin")
				.successHandler(authenticationSuccessHandler())
				.failureHandler(new SimpleUrlAuthenticationFailureHandler())
				.permitAll()
				.and()
			.logout()
				.logoutUrl("/logout")
				.logoutSuccessUrl("/")
				.and()
			.csrf().disable();
	}

	@Bean
	public UserDetailsService userDetailService() {
		InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
		manager.createUser(
				User.withUsername(adminId)
						.password(adminPwd)
						.roles("ADMIN").build());
		return manager;
	}

	@Bean
	public RestAuthenticationSuccessHandler authenticationSuccessHandler() {
		return new RestAuthenticationSuccessHandler();
	}
}
