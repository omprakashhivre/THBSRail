package in.xcalius.thbs.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.xcalius.thbs.model.Feedback;
import in.xcalius.thbs.repository.FeedbackRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/thbs")
public class FeedbackController {
	
	@Autowired
	FeedbackRepository  feedbackRepository;
	
	@PostMapping("/addfeedback")
	public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback fb){		
			try {
				Feedback _fb = feedbackRepository.save(new Feedback(fb.getEmail(),fb.getName(),fb.getComment(),fb.getRate(),fb.isIslogin()));
				return new ResponseEntity<>(_fb,HttpStatus.CREATED);
			} catch (Exception e) {				
				return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
			}		
	}
	
	@GetMapping("/feedbacks/{id}")
	public ResponseEntity<List<Feedback>> getfeedback(@PathVariable("id") String email){
		List<Feedback> userdata = feedbackRepository.getFeedbackByEmail(email);		
		if(userdata.isEmpty()){			
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		else {
			return new ResponseEntity<>(userdata,HttpStatus.OK);
		}			
	}	
	
	@GetMapping("/allfeedbacks")
	public ResponseEntity<List<Feedback>> getAllFeedback(){
		List<Feedback> list = new ArrayList<Feedback>();
		
		try {
			feedbackRepository.findAll().forEach(list::add);
			return new ResponseEntity<>(list,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}

	@GetMapping("/feedbackrate/{id}")
	public ResponseEntity<List<Feedback>> getFeedbackbyrating(@PathVariable("id") int id){
		List<Feedback> fbl = feedbackRepository.getFedbackByRate(id);
		
		if(fbl.isEmpty()){
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);

		}
		else {
			return new ResponseEntity<>(fbl,HttpStatus.OK);
		}	
		
	}
}
