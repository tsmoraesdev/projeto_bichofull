package com.backend.backprojetobichofull.application.usecases;

import com.backend.backprojetobichofull.api.dto.BetResponse;
import com.backend.backprojetobichofull.domain.model.Bet;
import com.backend.backprojetobichofull.domain.model.User;
import com.backend.backprojetobichofull.infrastructure.persistence.BetRepository;
import com.backend.backprojetobichofull.infrastructure.persistence.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListarMinhasApostasUseCase {

    private final BetRepository betRepository;
    private final UserRepository userRepository;

    public ListarMinhasApostasUseCase(BetRepository betRepository, UserRepository userRepository) {
        this.betRepository = betRepository;
        this.userRepository = userRepository;
    }

    public List<BetResponse> executar(String emailUsuarioLogado) {
        User user = userRepository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        List<Bet> apostas = betRepository.findByUserIdOrderByDataApostaDesc(user.getId());

        return apostas.stream()
                .map(aposta -> BetResponse.builder()
                        .id(aposta.getId())
                        .tipo_aposta(aposta.getTipoAposta().name())
                        .palpite(aposta.getPalpite())
                        .valor_apostado(aposta.getValorApostado())
                        .status(aposta.getStatus().name())
                        .data_aposta(aposta.getDataAposta())
                        .saldo_atual(user.getSaldo())
                        .build())
                .toList();
    }
}
