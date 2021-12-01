package in.xcalius.thbs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="feedback")
public class Feedback {
	@Id
	@Column(name="feedbackid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int feedbackid;
	
	@Column(name="email")
	private String email;
	@Column(name="Name")
	private String name;
	@Column(name="comment")
	private String comment;
	@Column(name="rate")
	private byte rate;
	@Column(name="isuserlogin")
	private String islogin;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public byte getRate() {
		return rate;
	}
	public void setRate(byte rate) {
		this.rate = rate;
	}
	public String isIslogin() {
		return islogin;
	}
	public void setIslogin(String islogin) {
		this.islogin = islogin;
	}
	public int getFeedbackid() {
		return feedbackid;
	}
	public void setFeedbackid(int feedbackid) {
		this.feedbackid = feedbackid;
	}
	public Feedback(String email, String name, String comment, byte rate, String islogin) {
		super();
		this.email = email;
		this.name = name;
		this.comment = comment;
		this.rate = rate;
		this.islogin = islogin;
	}
	public Feedback() {
		super();
	}
	@Override
	public String toString() {
		return "Feedback [email=" + email + ", name=" + name + ", comment=" + comment + ", rate=" + rate + ", islogin="
				+ islogin + "]";
	}
	
	
	
	
	
	

}
