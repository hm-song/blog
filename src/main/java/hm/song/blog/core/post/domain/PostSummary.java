package hm.song.blog.core.post.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "POST")
public class PostSummary extends BasePost {

    public PostSummary() {
        super();
    }
}
