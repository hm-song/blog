package hm.song.blog.core.post.domain;

import com.google.common.base.Objects;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
public class TagPk implements Serializable {

	@Column(name = "POST_ID")
	private int postId;

	@Column(name = "TAG", length = 64)
	private String tag;

}
