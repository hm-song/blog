package hm.song.blog.core.post;

import com.fasterxml.jackson.annotation.JsonGetter;
import hm.song.blog.core.post.domain.PostSummary;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class PostDto {

    private int id;

    private String title;

    private boolean isDisplay;

    private Date regDate;

    private Date modDate;

    public PostDto() {
    }

    public static PostDto summryOf(PostSummary post) {
        PostDto dto = new PostDto();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setRegDate(post.getRegDate());
        dto.setDisplay(post.isDisplay());
        return dto;
    }

    @JsonGetter("regDate")
    public String getReadableRegDate() {
        return new SimpleDateFormat("yyyy-MM-dd").format(regDate);
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
