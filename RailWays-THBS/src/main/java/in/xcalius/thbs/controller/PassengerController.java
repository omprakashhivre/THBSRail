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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.xcalius.thbs.model.Passenger;
import in.xcalius.thbs.repository.PassengerRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/thbs")
public class PassengerController {

	@Autowired
	PassengerRepository passengerRepository;
	
	@PostMapping("/passengers")
	public ResponseEntity<Passenger> createPassenger(@RequestBody Passenger pass){
		
			try {
				Passenger _pass = passengerRepository.save(new Passenger(pass.getPname(),pass.getAge(),pass.getGender()));
				return new ResponseEntity<>(_pass,HttpStatus.CREATED);
			} catch (Exception e) {
				
				return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
			}		
	}
	
	@GetMapping("/allpassengers")
	public ResponseEntity<List<Passenger>> getPassengers(){
		List<Passenger> list = new ArrayList<Passenger>();
		
		try {
			passengerRepository.findAll().forEach(list::add);
			return new ResponseEntity<>(list,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	@GetMapping("/passengers/{id}")
	public ResponseEntity<Passenger> getPassengerById(@PathVariable("id") int id){
		Optional<Passenger> Passengerdata = passengerRepository.findById(id);
		
		if(Passengerdata.isPresent()){
			return new ResponseEntity<>(Passengerdata.get(),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		
	}
	@GetMapping("/passengers/nameage")
	public ResponseEntity<List<Passenger>> getPassengerBynameAge(@RequestParam String pname,@RequestParam int age){
		List<Passenger> Passengerdata = passengerRepository.getPassengerByPname(pname,age);
		System.out.println(Passengerdata.toString());
		if(Passengerdata.isEmpty()){
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		else {
			return new ResponseEntity<>(Passengerdata,HttpStatus.OK);
		}	
		
	}
	@PutMapping("/passengers/{id}")
	public ResponseEntity<Passenger> updtaePassenger(@PathVariable("id") int id,@RequestBody Passenger pass){
		Optional<Passenger> Passengerdata = passengerRepository.findById(id);
		
		if(Passengerdata.isPresent()){
			Passenger usr = Passengerdata.get();
			usr.setPname(pass.getPname());
			usr.setAge(pass.getAge());
			usr.setGender(pass.getGender());
			return new ResponseEntity<>(passengerRepository.save(usr),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		
	}
	
	@DeleteMapping("/passengers/{id}")
	public ResponseEntity<Passenger> deletePassenger(@PathVariable("id") int id){
		try {
			passengerRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}