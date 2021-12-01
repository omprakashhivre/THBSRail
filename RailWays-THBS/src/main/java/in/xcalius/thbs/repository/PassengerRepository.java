package in.xcalius.thbs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import in.xcalius.thbs.model.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Integer>{
	
	@Query(value="select * from passenger where pname=?1 AND age=?2",nativeQuery = true)
	public List<Passenger> getPassengerByPname(String pname,int age);

}
