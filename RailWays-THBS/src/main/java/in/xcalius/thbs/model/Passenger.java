package in.xcalius.thbs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="passenger")
public class Passenger {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pid;
	
	@Column(name="pname")
	private String pname;
	@Column(name="age")
	private int age;
	@Column(name="gender")
	private String gender;
	
	public Passenger() {
		
	}
	public Passenger( String pname, int age, String gender) {
		super();
		//this.pid = pid;
		this.pname = pname;
		this.age = age;
		this.gender = gender;
	}
	
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	@Override
	public String toString() {
		return "Passenger [pid=" + pid + ", pname=" + pname + ", age=" + age + ", gender=" + gender + "]";
	}
	
	
	
	

}
