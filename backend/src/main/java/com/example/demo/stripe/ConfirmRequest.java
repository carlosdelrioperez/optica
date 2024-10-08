package com.example.demo.stripe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmRequest {

    private String id;
    private Integer clienteId;
    private Integer pedidoId;

}
