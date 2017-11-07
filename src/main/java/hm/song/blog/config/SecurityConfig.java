package hm.song.blog.config;

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

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private Environment env;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/index", "/posts/**").permitAll()
                .antMatchers("/css/**", "/image/**", "/js/**", "/libs/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .successForwardUrl("/index")
                .failureForwardUrl("/login")
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
                User.withUsername(env.getProperty("security.username"))
                        .password(env.getProperty("security.password"))
                        .roles("ADMIN").build());
        return manager;
    }
}
