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

import in.xcalius.thbs.model.Ticket;
import in.xcalius.thbs.model.Train;
import in.xcalius.thbs.repository.TrainRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/thbs")
public class TrainController {

	@Autowired
	TrainRepository trainRepository;
	
	@PostMapping("/trains")
	public ResponseEntity<Train> createTrain(@RequestBody Train train){
		
			try {
				Train _train = trainRepository.save(new Train(train.getTrainno(),train.getTrainname(),train.getSource(),train.getDestination(),train.getPrice()));
				return new ResponseEntity<>(_train,HttpStatus.CREATED);
			} catch (Exception e) {
				
				return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
			}		
	}
	
	@GetMapping("/alltrains")
	public ResponseEntity<List<Train>> getTrains(){
		List<Train> list = new ArrayList<Train>();
		
		try {
			trainRepository.findAll().forEach(list::add);
			return new ResponseEntity<>(list,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	@GetMapping("/trains/{id}")
	public ResponseEntity<Train> getTrainById(@PathVariable("id") int id){
		Optional<Train> Traindata = trainRepository.findById(id);
		
		if(Traindata.isPresent()){
			return new ResponseEntity<>(Traindata.get(),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		
	}
	@GetMapping("/trainbyname")
	public ResponseEntity<List<Train>> getTrainsByTrainname(@RequestParam String trainname){
		List<Train> Passengerdata = trainRepository.getTrainByTrainname(trainname);
		
		if(!Passengerdata.isEmpty()){
			return new ResponseEntity<List<Train>>(Passengerdata,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		
	}
	@GetMapping("/trainbysource")
	public ResponseEntity<List<Train>> getTrainsBySourceDest(@RequestParam String source,@RequestParam String dest){
		List<Train> Passengerdata = trainRepository.getTrainBySourceDest(source, dest);
		
		if(!Passengerdata.isEmpty()){
			return new ResponseEntity<List<Train>>(Passengerdata,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		
	}
	@PutMapping("/trains/{id}")
	public ResponseEntity<Train> updateTrain(@PathVariable("id") int id,@RequestBody Train train){
		Optional<Train> Traindata = trainRepository.findById(id);
		
		if(Traindata.isPresent()){
			Train tn = Traindata.get();
			tn.setTrainname(train.getTrainname());
			tn.setSource(train.getSource());
			tn.setDestination(train.getDestination());
			tn.setPrice(train.getPrice());
			return new ResponseEntity<>(trainRepository.save(tn),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		
	}
	
	
	@DeleteMapping("/trains/{id}")
	public ResponseEntity<Ticket> deleteTrain(@PathVariable("id") int id){
		try {
			System.out.println("in delete");
			trainRepository.deleteById(id);
			System.out.println("after delete");
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
}