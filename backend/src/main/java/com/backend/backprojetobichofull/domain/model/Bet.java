package com.backend.backprojetobichofull.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo_aposta", nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoAposta tipoAposta;

    @Column(name = "valor_apostado", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorApostado;

    @Column(name = "palpite", nullable = false, length = 4)
    private String palpite;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private StatusAposta status = StatusAposta.PENDENTE;

    @Column(name = "data_aposta", nullable = false)
    @Builder.Default
    private LocalDateTime dataAposta = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}