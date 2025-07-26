package edu.wgu.d387_sample_code.internationalization;

import java.util.Locale;
import java.util.ResourceBundle;

public class WelcomeMessage implements Runnable {

    private String welcomeMessage;

    public WelcomeMessage(Locale locale) {
        ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
        this.welcomeMessage = bundle.getString("welcome.message");
    }

    public String getWelcomeMessage() {
        return welcomeMessage;
    }

    public void setWelcomeMessage(String welcomeMessage) {
        this.welcomeMessage = welcomeMessage;
    }

    @Override
    public void run() {
        System.out.println("Thread verification: " + welcomeMessage +
                ", ThreadID: " + Thread.currentThread().getId());
    }
}