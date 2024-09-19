package com.example.demo.email;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public EmailService(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    public void sendMail(String email, String asunto, String contentHTML) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject(asunto);
            helper.setText(contentHTML, true);
            helper.addInline("logoImage", new ClassPathResource("static/centro-optico-cabildo.jpeg"));
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar el correo", e);
        }
    }

    public void sendCitaConfirmationEmail(String email, String fechaCita, String horaCita, String nombreOptico)
            throws MessagingException {
        String asunto = "Confirmación de cita en Centro Óptico Cabildo";
        Context context = new Context();
        context.setVariable("fechaCita", fechaCita);
        context.setVariable("horaCita", horaCita);
        context.setVariable("nombreOptico", nombreOptico);
        String contentHTML = templateEngine.process("emailCita", context);
        sendMail(email, asunto, contentHTML);
    }

    public void sendCompraConfirmationEmail(String email, Integer id) throws MessagingException {
        String asunto = "Confirmación de compra en Centro Óptico Cabildo";
        Context context = new Context();
        context.setVariable("id", id);
        String contentHTML = templateEngine.process("emailCompra", context);
        sendMail(email, asunto, contentHTML);
    }
}
