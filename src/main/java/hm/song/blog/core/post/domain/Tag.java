package hm.song.blog.core.post.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "TAG")
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = "post")
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
	public String toString() {
		return "Tag{" +
				"id=" + id +
				'}';
	}
}
