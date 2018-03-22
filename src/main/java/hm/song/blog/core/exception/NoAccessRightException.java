package hm.song.blog.core.exception;

public class NoAccessRightException extends ServiceException {

	protected static String DEFAULT_MESSAGE = "접근 권한이 없습니다.";

	public NoAccessRightException() {
		super(DEFAULT_MESSAGE);
	}

	public NoAccessRightException(String message) {
		super(message);
	}

	public NoAccessRightException(String message, Throwable cause) {
		super(message, cause);
	}
}
