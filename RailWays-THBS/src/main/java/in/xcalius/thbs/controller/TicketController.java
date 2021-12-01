package in.xcalius.thbs.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.xcalius.thbs.model.Ticket;
import in.xcalius.thbs.model.Train;
import in.xcalius.thbs.repository.TicketRepository;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/thbs")
public class TicketController {

	@Autowired
	TicketRepository ticketRepository;
	
	@PostMapping("/tickets")
	public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket){
		
			try {
				Ticket _ticket = ticketRepository.save(new Ticket(ticket.getPnr(),ticket.getDate(),ticket.getPid(),ticket.getTrainno()));
				return new ResponseEntity<>(_ticket,HttpStatus.CREATED);
			} catch (Exception e) {
				
				return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
			}		
	}
	
	@GetMapping("/alltickets")
	public ResponseEntity<List<Ticket>> getTickets(){
		List<Ticket> list = new ArrayList<Ticket>();
		
		try {
			ticketRepository.findAll().forEach(list::add);
			return new ResponseEntity<>(list,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	@GetMapping("/tickets/{id}")
	public ResponseEntity<List<Ticket>> getTicketById(@PathVariable("id") String pnr){
		List<Ticket> Ticketdata = ticketRepository.getTicketByPnr(pnr);
		
		if(!Ticketdata.isEmpty()){
			return new ResponseEntity<>(Ticketdata,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		
	}
	@GetMapping("/ticketsbypid/{id}")
	public ResponseEntity<List<Ticket>> getTicketByPid(@PathVariable("id") int pid){
		List<Ticket> Ticketdata = ticketRepository.getTicketByPid(pid);
		
		if(!Ticketdata.isEmpty()){
			return new ResponseEntity<List<Ticket>>(Ticketdata,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		
	}
//	@GetMapping("/ticketsbydate/{id}")
//	public ResponseEntity<List<Ticket>> getTicketByDate(@PathVariable("id") String date){
//		List<Ticket> Ticketdata = ticketRepository.getTicketByDate(date);
//		
//		if(!Ticketdata.isEmpty()){
//			return new ResponseEntity<List<Ticket>>(Ticketdata,HttpStatus.OK);
//		}
//		else {
//			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
//		}	
//		
//	}
	
	
	
//	@PutMapping("/tickets/{id}")
//	public ResponseEntity<List<Ticket>> updateTicket(@PathVariable("id") String pnr,@RequestBody Ticket ticket){
//		List<Ticket> Ticketdata = ticketRepository.getTicketByPnr(pnr);
//		
//		if(!Ticketdata.isEmpty()){
//			Ticket tn = Ticketdata.get(0);
//			tn.setDate(ticket.getDate());
//			tn.setPid(ticket.getPid());
//			tn.setTrainno(ticket.getTrainno());
//			tn.setPnr(ticket.getPnr());
//			return new ResponseEntity<>( ticketRepository.save(tn),HttpStatus.OK);
//		}
//		else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}	
//		
//	}
	
	@DeleteMapping("/ticketsbypnr/{id}")
	public ResponseEntity<Ticket> deleteTicketbypnr(@PathVariable("id") String pnr){
		try {
			ticketRepository.deleteByName(pnr);
			System.out.println("deleted");
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	@DeleteMapping("/tickets/{id}")
	public ResponseEntity<Ticket> deleteTicket(@PathVariable("id") int counter){
		try {
			ticketRepository.deleteById(counter);
			System.out.println("deleted");
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	
}