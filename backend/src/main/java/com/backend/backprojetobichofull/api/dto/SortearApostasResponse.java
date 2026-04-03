package com.backend.backprojetobichofull.api.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class SortearApostasResponse {
    private List<String> ultimo_sorteio;
    private List<ResultadoApostaResponse> apostas;
    private BigDecimal total_premio;
    private BigDecimal saldo_atual;
    private String mensagem;
}