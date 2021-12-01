package in.xcalius.thbs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="train")
public class Train {
	
	@Id
	@Column(name="trainno")
	private int trainno;
	
	@Column(name="trainname")
	private String trainname;
	@Column(name="source")
	private String source;
	@Column(name="destination")
	private String destination;
	@Column(name="price")
	private double price;
	
	public Train() {
		
	}

	public Train(int trainno, String trainname, String source, String destination, double price) {
		super();
		this.trainno = trainno;
		this.trainname = trainname;
		this.source = source;
		this.destination = destination;
		this.price = price;
	}

	public int getTrainno() {
		return trainno;
	}

	public void setTrainno(int trainno) {
		this.trainno = trainno;
	}

	public String getTrainname() {
		return trainname;
	}

	public void setTrainname(String trainname) {
		this.trainname = trainname;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Train [trainno=" + trainno + ", trainname=" + trainname + ", source=" + source + ", destination="
				+ destination + ", price=" + price + "]";
	}
	
	

}
