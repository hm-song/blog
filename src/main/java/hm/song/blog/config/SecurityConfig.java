package hm.song.blog.config;

import hm.song.blog.config.security.RestAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private Environment env;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/api/public/**").permitAll()
				.antMatchers("/index", "/posts/**", "/index2").permitAll()
				.antMatchers("/css/**", "/image/**", "/js/**", "/libs/**").permitAll()
				.antMatchers("/api/admin/**").authenticated()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginProcessingUrl("/handleLogin")
				.successHandler(authenticationSuccessHandler())
				.failureHandler(new SimpleUrlAuthenticationFailureHandler())
				.permitAll()
				.and()
			.logout()
				.logoutSuccessUrl("/index")
				.and()
				.csrf().disable();
	}

	@Bean
	public UserDetailsService userDetailService() {
		InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
		manager.createUser(
				User.withUsername("admin")
						.password("admin")
						.roles("ADMIN").build());
		return manager;
	}

	@Bean
	public RestAuthenticationSuccessHandler authenticationSuccessHandler() {
		return new RestAuthenticationSuccessHandler();
	}
}
