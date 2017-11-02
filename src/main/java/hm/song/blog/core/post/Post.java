package hm.song.blog.core.post;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "POST")
@Data
public class Post {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "TITLE", length = 255, nullable = false)
    private String title;

    @Column(name = "CONTENTS", length = 20000, nullable = false)
    private String contents;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "REG_DATE", nullable = false)
    private Date regDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "MOD_DATE", nullable = false)
    private Date modDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    public Date getModDate() {
        return modDate;
    }

    public void setModDate(Date modDate) {
        this.modDate = modDate;
    }
}
