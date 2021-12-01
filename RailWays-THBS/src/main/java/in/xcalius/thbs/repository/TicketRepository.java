package in.xcalius.thbs.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import in.xcalius.thbs.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer>{

//	@Query(value = "select t from ticket t where LOWER(t.pnr) = LOWER(:pnr)")
//	public Optional<Ticket> findByPnr(@Param("pnr") String id);
	
	public List<Ticket> getTicketByPnr(String pnr);

	public List<Ticket> getTicketByPid(int pid);
	
	public List<Ticket> getTicketByDate(String pnr);

	@Modifying
	@Transactional
	@Query(value="DELETE from ticket t WHERE t.pnr = ?1",nativeQuery = true)
	public long deleteByName(String pnr);



}


