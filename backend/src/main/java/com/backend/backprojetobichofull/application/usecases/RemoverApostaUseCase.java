package com.backend.backprojetobichofull.application.usecases;

import com.backend.backprojetobichofull.domain.model.Bet;
import com.backend.backprojetobichofull.domain.model.StatusAposta;
import com.backend.backprojetobichofull.domain.model.User;
import com.backend.backprojetobichofull.infrastructure.persistence.BetRepository;
import com.backend.backprojetobichofull.infrastructure.persistence.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class RemoverApostaUseCase {

    private final BetRepository betRepository;
    private final UserRepository userRepository;

    public RemoverApostaUseCase(BetRepository betRepository, UserRepository userRepository) {
        this.betRepository = betRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Map<String, Object> executar(Long apostaId, String emailUsuarioLogado) {
        User user = userRepository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        Bet aposta = betRepository.findByIdAndUserId(apostaId, user.getId())
                .orElseThrow(() -> new RuntimeException("Aposta não encontrada."));

        if (aposta.getStatus() != StatusAposta.PENDENTE) {
            throw new RuntimeException("Somente apostas pendentes podem ser removidas.");
        }

        BigDecimal valorEstorno = aposta.getValorApostado();

        betRepository.delete(aposta);

        user.creditarSaldo(valorEstorno);
        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("mensagem", "Aposta removida com sucesso.");
        response.put("saldo_atual", user.getSaldo());

        return response;
    }
}
