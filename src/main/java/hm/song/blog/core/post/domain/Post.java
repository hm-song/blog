package hm.song.blog.core.post.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "POST")
public class Post extends BasePost {

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "CONTENTS", length = 20000, nullable = false)
    private String contents;

    public Post(String title, boolean isDisplay, Date regDate, Date modDate, String contents) {
        super(title, isDisplay, regDate, modDate);
        this.contents = contents;
    }

    public Post() {
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }
}
