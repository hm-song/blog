package hm.song.blog.core.post.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TagPk implements Serializable {

	@Column(name = "POST_ID")
	private int postId;

	@Column(name = "TAG", length = 64)
	private String tag;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		if (!super.equals(o)) return false;

		TagPk tagPk = (TagPk) o;

		if (postId != tagPk.postId) return false;
		return tag != null ? tag.equals(tagPk.tag) : tagPk.tag == null;
	}

	@Override
	public int hashCode() {
		int result = super.hashCode();
		result = 31 * result + postId;
		result = 31 * result + (tag != null ? tag.hashCode() : 0);
		return result;
	}
}
