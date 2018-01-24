package hm.song.blog.core.exception;

public class PostIsNotPublishedException extends ServiceException {

	protected static String DEFAULT_MESSAGE = "비공개 포스트입니다.";

	public PostIsNotPublishedException() {
		super(DEFAULT_MESSAGE);
	}

	public PostIsNotPublishedException(String message) {
		super(message);
	}

	public PostIsNotPublishedException(String message, Throwable cause) {
		super(message, cause);
	}

}
