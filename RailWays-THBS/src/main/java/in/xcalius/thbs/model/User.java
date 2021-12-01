package in.xcalius.thbs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class User {
	
	@Id
	@Column(name="email")
	private String email;
	@Column(name="password")
	private String password;
	@Column(name="name")
	private String name;
	@Column(name="passengers")
	private String passengers;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassengers() {
		return passengers;
	}
	public void setPassengers(String passengers) {
		this.passengers = passengers;
	}
	public User(String email, String password, String name, String passengers) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.passengers = passengers;
	}
	public User() {
		super();
	}
	@Override
	public String toString() {
		return "User [email=" + email + ", password=" + password + ", name=" + name + ", passengers=" + passengers
				+ "]";
	}
	
	
	
	
	

}

