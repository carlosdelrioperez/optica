package com.example.demo.stripe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentIntentDto {

    public enum Currency {
        USD, EUR;
    }

    private int amount;
    private Currency currency;
}
