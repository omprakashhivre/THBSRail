package in.xcalius.thbs.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.xcalius.thbs.model.User;
import in.xcalius.thbs.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/thbs")
public class UserController {

	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/insertusers")
	public ResponseEntity<User> createUser(@RequestBody User user){
		
			try {
				User _user = userRepository.save(new User(user.getEmail(),user.getPassword(),user.getName(),user.getPassengers()));
				return new ResponseEntity<>(_user,HttpStatus.CREATED);
			} catch (Exception e) {
				
				return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
			}		
	}
	
//	@GetMapping("/alltrains")
//	public ResponseEntity<List<Train>> getTrains(){
//		List<Train> list = new ArrayList<Train>();
//		
//		try {
//			trainRepository.findAll().forEach(list::add);
//			return new ResponseEntity<>(list,HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		
//		
//	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<List<User>> getUserByemail(@PathVariable("id") String email){
		List<User> userdata = userRepository.findUserByEmail(email);
		
		if(!userdata.isEmpty()){
			return new ResponseEntity<>(userdata,HttpStatus.OK);
			
		}
		else {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);

		}	
		
	}
	
	@PutMapping("/changepass/{id}")
	public ResponseEntity<User> updateTrain(@PathVariable("id") String email,@RequestBody User user){
		List<User> userdata = userRepository.findUserByEmail(email);
		
		if(userdata.isEmpty()){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		else {
			User usr = userdata.get(0);
			usr.setPassword(user.getPassword());
			return new ResponseEntity<>(userRepository.save(usr),HttpStatus.OK);			
		}
	}
	@PutMapping("/addnewpass/{id}")
	public ResponseEntity<User> updatepass(@PathVariable("id") String pass,@RequestBody User user){
		List<User> userdata = userRepository.findUserByEmail(pass);
		
		if(userdata.isEmpty()){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		else {
			User usr = userdata.get(0);
			usr.setPassengers(user.getPassengers());
			return new ResponseEntity<>(userRepository.save(usr),HttpStatus.OK);			
		}
	}
	
	
//	@DeleteMapping("/deluser/{id}")
//	public ResponseEntity<Ticket> deleteUser(@PathVariable("id") String id){
//		try {
//			System.out.println("in delete User");
//			userRepository.deleteById(id);
//			System.out.println("after delete");
//			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//		} catch (Exception e) {
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		
//	}	
	
}