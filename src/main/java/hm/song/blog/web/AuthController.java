package hm.song.blog.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AuthController {

	@GetMapping(value = "/api/public/checkAuthentication")
	@ResponseBody
	public boolean isAuthenticated(Principal principal) {
		return principal != null;
	}
}
