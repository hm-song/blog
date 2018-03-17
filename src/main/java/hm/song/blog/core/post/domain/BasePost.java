package hm.song.blog.core.post.domain;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Data;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@MappedSuperclass
public class BasePost {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "TITLE", length = 255, nullable = false)
	private String title;

	@Column(name = "IS_DISPLAY", nullable = false)
	private boolean isDisplay;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "REG_DATE", nullable = false)
	private Date regDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "MOD_DATE", nullable = false)
	private Date modDate;

	@OneToMany(mappedBy = "post", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Tag> tags = new ArrayList<>();

	public BasePost(String title, boolean isDisplay, Date regDate, Date modDate) {
		this.title = title;
		this.isDisplay = isDisplay;
		this.regDate = regDate;
		this.modDate = modDate;
	}

	public BasePost() {
	}

	@JsonGetter("regDate")
	public String getReadableRegDate() {
		return new SimpleDateFormat("MMMMM dd, yyyy").format(regDate);
	}

	@Override
	public String toString() {
		return "BasePost{" +
				"id=" + id +
				", title='" + title + '\'' +
				", isDisplay=" + isDisplay +
				", regDate=" + regDate +
				", modDate=" + modDate +
				", tags=" + tags +
				'}';
	}
}
