package hm.song.blog.core.post.domain;

import com.fasterxml.jackson.annotation.JsonGetter;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

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

    public boolean isDisplay() {
        return isDisplay;
    }

    public void setDisplay(boolean display) {
        isDisplay = display;
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
