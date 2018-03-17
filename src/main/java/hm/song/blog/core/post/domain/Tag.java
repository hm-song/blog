package hm.song.blog.core.post.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "TAG")
@Data
@NoArgsConstructor
public class Tag {

	@EmbeddedId
	@JsonIgnore
	private TagPk id;

	@ManyToOne
	@JoinColumn(name = "POST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private Post post;

	public Tag(int postId, String tag) {
		this.id = new TagPk(postId, tag);
	}

	public String getTag() {
		return this.id.getTag();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		if (!super.equals(o)) return false;

		Tag tag = (Tag) o;

		return id != null ? id.equals(tag.id) : tag.id == null;
	}

	@Override
	public int hashCode() {
		int result = super.hashCode();
		result = 31 * result + (id != null ? id.hashCode() : 0);
		return result;
	}
}
