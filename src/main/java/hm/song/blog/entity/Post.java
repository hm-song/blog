package hm.song.blog.entity;

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

    @Column(name = "CONTENTS", length = 3000, nullable = false)
    private String contents;

    @Column(name = "REG_DATE", nullable = false)
    private Date regDate = new Date();

    @Column(name = "MOD_DATE", nullable = false)
    private Date modDate = new Date();

    public Post(String title, String contents) {
        this.title = title;
        this.contents = contents;
    }

    public Post() {
    }
}
