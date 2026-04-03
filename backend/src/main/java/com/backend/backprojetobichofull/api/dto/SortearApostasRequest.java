package com.backend.backprojetobichofull.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SortearApostasRequest {
    private List<Long> apostaIds;
}