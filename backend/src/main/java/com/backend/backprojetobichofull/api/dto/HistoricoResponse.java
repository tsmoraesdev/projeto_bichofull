package com.backend.backprojetobichofull.api.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class HistoricoResponse {
    private HistoricoResumoResponse resumo;
    private List<HistoricoApostaResponse> apostas;
    private List<HistoricoSorteioResponse> sorteios;
}