package com.backend.backprojetobichofull.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "draws")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Draw {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_sorteio", nullable = false)
    @Builder.Default
    private LocalDateTime dataSorteio = LocalDateTime.now();

    @Column(name = "p_1_milhar", nullable = false, length = 4)
    private String p1Milhar;

    @Column(name = "p_2_milhar", nullable = false, length = 4)
    private String p2Milhar;

    @Column(name = "p_3_milhar", nullable = false, length = 4)
    private String p3Milhar;

    @Column(name = "p_4_milhar", nullable = false, length = 4)
    private String p4Milhar;

    @Column(name = "p_5_milhar", nullable = false, length = 4)
    private String p5Milhar;
}