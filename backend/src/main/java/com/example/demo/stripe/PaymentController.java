package com.example.demo.stripe;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.cliente.ClienteRepository;
import com.example.demo.email.EmailService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import jakarta.mail.MessagingException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/stripe")
public class PaymentController {

    private final PaymentService paymentService;
    private final EmailService emailService;
    private final ClienteRepository clienteRepository;

    public PaymentController(PaymentService paymentService, EmailService emailService,
            ClienteRepository clienteRepository) {
        this.paymentService = paymentService;
        this.emailService = emailService;
        this.clienteRepository = clienteRepository;
    }

    @PostMapping("/paymentIntent")
    public ResponseEntity<String> payment(@RequestBody PaymentIntentDto paymentIntentDto) throws StripeException {
        PaymentIntent paymentIntent = paymentService.paymentIntent(paymentIntentDto);
        String paymentString = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentString, HttpStatus.OK);
    }

    @PostMapping("/confirm")
    public ResponseEntity<String> confirm(@RequestBody ConfirmRequest request) throws StripeException {
        PaymentIntent paymentIntent = paymentService.confirm(request.getId());
        String paymentString = paymentIntent.toJson();
        String emailCliente = clienteRepository.findById(request.getClienteId()).get().getEmail();
        try {
            emailService.sendCompraConfirmationEmail(emailCliente, request.getPedidoId());
            return new ResponseEntity<String>(paymentString, HttpStatus.OK);
        } catch (MessagingException e) {
            return new ResponseEntity<>("Error al enviar el correo de confirmación", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<String> cancel(@PathVariable("id") String id) throws StripeException {
        PaymentIntent paymentIntent = paymentService.cancel(id);
        String paymentString = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentString, HttpStatus.OK);
    }

}
