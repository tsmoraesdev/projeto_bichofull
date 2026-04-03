package com.backend.backprojetobichofull.application.usecases;

import com.backend.backprojetobichofull.api.dto.ResultadoApostaResponse;
import com.backend.backprojetobichofull.api.dto.SortearApostasRequest;
import com.backend.backprojetobichofull.api.dto.SortearApostasResponse;
import com.backend.backprojetobichofull.domain.model.*;
import com.backend.backprojetobichofull.infrastructure.persistence.BetRepository;
import com.backend.backprojetobichofull.infrastructure.persistence.DrawRepository;
import com.backend.backprojetobichofull.infrastructure.persistence.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SortearApostasUseCase {

    private final BetRepository betRepository;
    private final DrawRepository drawRepository;
    private final UserRepository userRepository;

    public SortearApostasUseCase(BetRepository betRepository,
                                 DrawRepository drawRepository,
                                 UserRepository userRepository) {
        this.betRepository = betRepository;
        this.drawRepository = drawRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public SortearApostasResponse executar(SortearApostasRequest dto, String emailUsuarioLogado) {
        if (dto == null || dto.getApostaIds() == null || dto.getApostaIds().isEmpty()) {
            throw new RuntimeException("Selecione pelo menos uma aposta para realizar o sorteio.");
        }

        User user = userRepository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        List<Bet> apostasSelecionadas = betRepository.findByIdInAndUserId(dto.getApostaIds(), user.getId());

        if (apostasSelecionadas.isEmpty()) {
            throw new RuntimeException("Nenhuma aposta válida foi encontrada para o usuário.");
        }

        List<Bet> apostasPendentes = apostasSelecionadas.stream()
                .filter(aposta -> aposta.getStatus() == StatusAposta.PENDENTE)
                .toList();

        if (apostasPendentes.isEmpty()) {
            throw new RuntimeException("Selecione apenas apostas pendentes para realizar o sorteio.");
        }

        List<String> sorteio = gerarSorteio();

        Draw draw = Draw.builder()
                .p1Milhar(sorteio.get(0))
                .p2Milhar(sorteio.get(1))
                .p3Milhar(sorteio.get(2))
                .p4Milhar(sorteio.get(3))
                .p5Milhar(sorteio.get(4))
                .build();

        drawRepository.save(draw);

        BigDecimal totalPremio = BigDecimal.ZERO;
        List<ResultadoApostaResponse> resultados = new ArrayList<>();

        for (Bet aposta : apostasPendentes) {
            boolean ganhou = verificarResultado(aposta, sorteio.get(0));
            BigDecimal premio = ganhou ? calcularPremio(aposta) : BigDecimal.ZERO;

            aposta.setStatus(ganhou ? StatusAposta.GANHOU : StatusAposta.PERDEU);
            betRepository.save(aposta);

            if (ganhou) {
                totalPremio = totalPremio.add(premio);
            }

            resultados.add(ResultadoApostaResponse.builder()
                    .id(aposta.getId())
                    .tipo_aposta(aposta.getTipoAposta().name())
                    .palpite(aposta.getPalpite())
                    .valor_apostado(aposta.getValorApostado())
                    .status(aposta.getStatus().name())
                    .premio(premio)
                    .build());
        }

        if (totalPremio.compareTo(BigDecimal.ZERO) > 0) {
            user.creditarSaldo(totalPremio);
            userRepository.save(user);
        }

        String mensagem = totalPremio.compareTo(BigDecimal.ZERO) > 0
                ? "Parabéns! Você ganhou R$ " + totalPremio + "."
                : "Nenhuma aposta foi premiada neste sorteio.";

        return SortearApostasResponse.builder()
                .ultimo_sorteio(sorteio)
                .apostas(resultados)
                .total_premio(totalPremio)
                .saldo_atual(user.getSaldo())
                .mensagem(mensagem)
                .build();
    }

    private List<String> gerarSorteio() {
        Random random = new Random();
        List<String> premios = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            String numero = String.format("%04d", random.nextInt(10000));
            premios.add(numero);
        }

        return premios;
    }

    private boolean verificarResultado(Bet aposta, String primeiroPremio) {
        if (aposta.getTipoAposta() == TipoAposta.MILHAR) {
            return primeiroPremio.equals(aposta.getPalpite());
        }

        if (aposta.getTipoAposta() == TipoAposta.DEZENA) {
            return primeiroPremio.substring(2).equals(aposta.getPalpite());
        }

        if (aposta.getTipoAposta() == TipoAposta.GRUPO) {
            int dezena = Integer.parseInt(primeiroPremio.substring(2));
            int grupoSorteado = dezena == 0 ? 25 : (int) Math.ceil(dezena / 4.0);
            String grupoFormatado = String.format("%02d", grupoSorteado);
            return grupoFormatado.equals(aposta.getPalpite());
        }

        return false;
    }

    private BigDecimal calcularPremio(Bet aposta) {
        if (aposta.getTipoAposta() == TipoAposta.GRUPO) {
            return aposta.getValorApostado().multiply(BigDecimal.valueOf(18));
        }

        if (aposta.getTipoAposta() == TipoAposta.DEZENA) {
            return aposta.getValorApostado().multiply(BigDecimal.valueOf(60));
        }

        return aposta.getValorApostado().multiply(BigDecimal.valueOf(400));
    }
}