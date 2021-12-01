package in.xcalius.thbs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import in.xcalius.thbs.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	@Query(value="select * from user where email = ?1 AND password=?2",nativeQuery=true)
	public User getTrainBySourceDest(String email,String password);
//	
//
//	
//	
	public List<User> findUserByEmail(String email);
//	public List<Train> trainBySourceDestination(String source,String Dest);

}
