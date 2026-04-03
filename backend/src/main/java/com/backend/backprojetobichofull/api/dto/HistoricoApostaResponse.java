package com.backend.backprojetobichofull.api.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class HistoricoApostaResponse {
    private Long id;
    private String tipo_aposta;
    private String numero;
    private BigDecimal valor_apostado;
    private String status;
    private BigDecimal premio;
    private LocalDateTime data_aposta;
}