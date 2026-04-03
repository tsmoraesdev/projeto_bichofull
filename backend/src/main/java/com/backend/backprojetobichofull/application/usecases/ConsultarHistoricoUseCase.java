package com.backend.backprojetobichofull.application.usecases;

import com.backend.backprojetobichofull.api.dto.HistoricoApostaResponse;
import com.backend.backprojetobichofull.api.dto.HistoricoResponse;
import com.backend.backprojetobichofull.api.dto.HistoricoResumoResponse;
import com.backend.backprojetobichofull.api.dto.HistoricoSorteioResponse;
import com.backend.backprojetobichofull.domain.model.Bet;
import com.backend.backprojetobichofull.domain.model.Draw;
import com.backend.backprojetobichofull.domain.model.StatusAposta;
import com.backend.backprojetobichofull.domain.model.TipoAposta;
import com.backend.backprojetobichofull.domain.model.User;
import com.backend.backprojetobichofull.infrastructure.persistence.BetRepository;
import com.backend.backprojetobichofull.infrastructure.persistence.DrawRepository;
import com.backend.backprojetobichofull.infrastructure.persistence.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ConsultarHistoricoUseCase {

    private final BetRepository betRepository;
    private final DrawRepository drawRepository;
    private final UserRepository userRepository;

    public ConsultarHistoricoUseCase(BetRepository betRepository,
                                     DrawRepository drawRepository,
                                     UserRepository userRepository) {
        this.betRepository = betRepository;
        this.drawRepository = drawRepository;
        this.userRepository = userRepository;
    }

    public HistoricoResponse executar(String emailUsuarioLogado) {
        User user = userRepository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        List<Bet> apostas = betRepository.findByUserIdOrderByDataApostaDesc(user.getId());
        List<Draw> sorteios = drawRepository.findAllByOrderByDataSorteioDesc();

        BigDecimal totalGanhos = BigDecimal.ZERO;
        BigDecimal totalPerdas = BigDecimal.ZERO;

        for (Bet aposta : apostas) {
            if (aposta.getStatus() == StatusAposta.GANHOU) {
                totalGanhos = totalGanhos.add(calcularPremio(aposta));
            } else if (aposta.getStatus() == StatusAposta.PERDEU) {
                totalPerdas = totalPerdas.add(aposta.getValorApostado());
            }
        }

        long apostasPremiadas = betRepository.countByUserIdAndStatus(user.getId(), StatusAposta.GANHOU);
        long apostasPerdidas = betRepository.countByUserIdAndStatus(user.getId(), StatusAposta.PERDEU);

        HistoricoResumoResponse resumo = HistoricoResumoResponse.builder()
                .total_ganhos(totalGanhos)
                .total_perdas(totalPerdas)
                .apostas_premiadas(apostasPremiadas)
                .apostas_perdidas(apostasPerdidas)
                .build();

        List<HistoricoApostaResponse> apostasResponse = apostas.stream()
                .map(aposta -> HistoricoApostaResponse.builder()
                        .id(aposta.getId())
                        .tipo_aposta(aposta.getTipoAposta().name())
                        .numero(aposta.getPalpite())
                        .valor_apostado(aposta.getValorApostado())
                        .status(aposta.getStatus().name())
                        .premio(aposta.getStatus() == StatusAposta.GANHOU ? calcularPremio(aposta) : BigDecimal.ZERO)
                        .data_aposta(aposta.getDataAposta())
                        .build())
                .toList();

        List<HistoricoSorteioResponse> sorteiosResponse = sorteios.stream()
                .map(draw -> HistoricoSorteioResponse.builder()
                        .id(draw.getId())
                        .data_sorteio(draw.getDataSorteio())
                        .premios(List.of(
                                draw.getP1Milhar(),
                                draw.getP2Milhar(),
                                draw.getP3Milhar(),
                                draw.getP4Milhar(),
                                draw.getP5Milhar()
                        ))
                        .build())
                .toList();

        return HistoricoResponse.builder()
                .resumo(resumo)
                .apostas(apostasResponse)
                .sorteios(sorteiosResponse)
                .build();
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