package in.xcalius.thbs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import in.xcalius.thbs.model.Passenger;
import in.xcalius.thbs.model.Train;

public interface TrainRepository extends JpaRepository<Train, Integer>{
	
	@Query(value="select * from train where source = ?1 AND destination=?2",nativeQuery=true)
	public List<Train> getTrainBySourceDest(String Source,String Destination);
	

	
	
	public List<Train> getTrainByTrainname(String trainname);
//	public List<Train> trainBySourceDestination(String source,String Dest);

}
