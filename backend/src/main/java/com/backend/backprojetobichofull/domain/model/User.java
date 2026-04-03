package com.backend.backprojetobichofull.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Builder.Default
    @Column(nullable = false)
    private BigDecimal saldo = new BigDecimal("1000.00");

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = false)
    @Builder.Default
    private List<Bet> apostas = new ArrayList<>();

    public void debitarSaldo(BigDecimal valor) {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("O valor da aposta deve ser maior que zero.");
        }

        if (this.saldo.compareTo(valor) < 0) {
            throw new RuntimeException("Saldo insuficiente para realizar a aposta.");
        }

        this.saldo = this.saldo.subtract(valor);
    }

    public void creditarSaldo(BigDecimal valor) {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("O valor de crédito deve ser maior que zero.");
        }

        this.saldo = this.saldo.add(valor);
    }
}
