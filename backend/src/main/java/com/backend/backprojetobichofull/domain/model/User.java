package com.backend.backprojetobichofull.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

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

    // RF03 - Novos usuários devem começar com um saldo fictício de R$ 1.000,00 
    @Column(nullable = false)
    private BigDecimal saldo = new BigDecimal("1000.00");

    /**
     * RN03 - O saldo nunca pode ficar negativo.
     * Este método encapsula a lógica de negócio para débito.
     */
    public void debitarSaldo(BigDecimal valor) {
        if (this.saldo.compareTo(valor) < 0) {
            throw new RuntimeException("Saldo insuficiente para realizar a aposta.");
        }
        this.saldo = this.saldo.subtract(valor);
    }

    public void creditarSaldo(BigDecimal valor) {
        this.saldo = this.saldo.add(valor);
    }

    }
