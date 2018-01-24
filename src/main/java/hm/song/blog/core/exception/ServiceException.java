package hm.song.blog.core.exception;


public class ServiceException extends RuntimeException {

	private static String DEFAULT_MESSAGE = "예상치못한 에러가 발생했습니다.";

	public ServiceException() {
		super(DEFAULT_MESSAGE);
	}

	public ServiceException(String message) {
		super(message);
	}

	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}
}
