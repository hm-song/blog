package hm.song.blog.core.post.repo;

import hm.song.blog.core.post.domain.PostSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostSummaryRepository extends JpaRepository<PostSummary, Integer> {

    Page<PostSummary> findByIsDisplayOrderByRegDateDesc(boolean isDisplay, Pageable pageable);

    Page<PostSummary> findByOrderByRegDateDesc(Pageable pageable);
}
