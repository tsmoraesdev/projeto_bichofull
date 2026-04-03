package com.backend.backprojetobichofull.api.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class BetResponse {
    private Long id;
    private String tipo_aposta;
    private String palpite;
    private BigDecimal valor_apostado;
    private String status;
    private LocalDateTime data_aposta;
    private BigDecimal saldo_atual;
}