package in.xcalius.thbs.model;

//import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ticket")
public class Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int counter;
	
	
	@Column(name="pnr",nullable=false)
	private String pnr;
	
	@Column(name="date")
	private String date;
	@Column(name="pid")
	private int pid;
	@Column(name="trainno")
	private int trainno;

	public Ticket() {
		
	}

	public Ticket(String pnr, String date, int pid, int trainno) {
		super();
		//this.counter = counter;
		this.pnr = pnr;
		this.date = date;
		this.pid = pid;
		this.trainno = trainno;
	}

	public int getCounter() {
		return counter;
	}

	public void setCounter(int counter) {
		this.counter = counter;
	}

	public String getPnr() {
		return pnr;
	}

	public void setPnr(String pnr) {
		this.pnr = pnr;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public int getTrainno() {
		return trainno;
	}

	public void setTrainno(int trainno) {
		this.trainno = trainno;
	}

	@Override
	public String toString() {
		return "Ticket [counter=" + counter + ", pnr=" + pnr + ", date=" + date + ", pid=" + pid + ", trainno="
				+ trainno + "]";
	}
	
}
