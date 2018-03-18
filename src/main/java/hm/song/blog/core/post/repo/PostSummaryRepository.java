package hm.song.blog.core.post.repo;

import hm.song.blog.core.post.domain.PostSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedNativeQuery;
import java.util.List;

@Repository
public interface PostSummaryRepository extends JpaRepository<PostSummary, Integer> {

	Page<PostSummary> findByIsDisplayOrderByRegDateDesc(boolean isDisplay,
	                                                    Pageable pageable);

	Page<PostSummary> findByOrderByRegDateDesc(Pageable pageable);

	Page<PostSummary> findByTitleContainingOrderByRegDateDesc(String keyword,
	                                                          Pageable pageable);

	Page<PostSummary> findByTitleContainingAndIsDisplayOrderByRegDateDesc(String keyword,
	                                                                boolean isDisplay,
	                                                                Pageable pageable);

	// like 절 및 동등 비교 구문에서 동일한 파라미터를 사용할 경우 %를 한곳에만 사용 불가능하다.
	// TODO: N+1 이슈 여부 확인
	@Query("select p1 from PostSummary p1 " +
			"where " +
			"p1.id in (select p2.id from PostSummary p2 where title like %?1%) " +
			"or " +
			"p1.id in (select t.id.postId from Tag t where t.id.tag = ?2) " +
			"and p1.isDisplay = ?3")
	Page<PostSummary> findByTitleLikeAndIsDisplayFromPostOrTagFromTag(String search, String tag,
	                                                                  boolean isDisplay, Pageable pageable);


	@Query("select p1 from PostSummary p1 " +
			"where " +
			"p1.id in (select p2.id from PostSummary p2 where title like %?1%) " +
			"or " +
			"p1.id in (select t.id.postId from Tag t where t.id.tag = ?2)")
	Page<PostSummary> findByTitleLikeAndFromPostOrTagFromTag(String search, String tag, Pageable pageable);
}
