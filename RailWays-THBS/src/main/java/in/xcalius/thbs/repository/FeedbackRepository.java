package in.xcalius.thbs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import in.xcalius.thbs.model.Feedback;


public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

	@Query(value="select * from feedback where rate >= ?1",nativeQuery=true)
	public List<Feedback> getFedbackByRate(int rate);
	
	public List<Feedback> getFeedbackByEmail(String email);


}
