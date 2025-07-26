package edu.wgu.d387_sample_code;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.ResourceBundle;

@SpringBootApplication
public class D387SampleCodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(D387SampleCodeApplication.class, args);

		// Multithreaded welcome message (B1)
		Thread englishThread = new Thread(() -> {
			ResourceBundle bundle = ResourceBundle.getBundle("messages", Locale.ENGLISH);
			System.out.println("English: " + bundle.getString("welcome.message"));
		});

		Thread frenchThread = new Thread(() -> {
			ResourceBundle bundle = ResourceBundle.getBundle("messages", Locale.FRENCH);
			System.out.println("French: " + bundle.getString("welcome.message"));
		});

		englishThread.start();
		frenchThread.start();

		// B3b: Use time zone converter to display presentation time
		LocalDateTime presentationTime = LocalDateTime.of(2025, 7, 30, 14, 0); // 2:00 PM ET

		ZoneId eastern = ZoneId.of("America/New_York");
		ZoneId mountain = ZoneId.of("America/Denver");
		ZoneId utc = ZoneId.of("UTC");

		String etTime = convertTime(presentationTime, eastern, eastern);
		String mtTime = convertTime(presentationTime, eastern, mountain);
		String utcTime = convertTime(presentationTime, eastern, utc);

		System.out.println("Live Online Presentation Time:");
		System.out.println("Eastern Time (ET): " + etTime);
		System.out.println("Mountain Time (MT): " + mtTime);
		System.out.println("Coordinated Universal Time (UTC): " + utcTime);
	}

	// B3a: Convert between time zones
	public static String convertTime(LocalDateTime localTime, ZoneId fromZone, ZoneId toZone) {
		ZonedDateTime fromZonedTime = ZonedDateTime.of(localTime, fromZone);
		ZonedDateTime toZonedTime = fromZonedTime.withZoneSameInstant(toZone);
		return toZonedTime.format(DateTimeFormatter.ofPattern("hh:mm a z"));
	}
}

