package com.backend.backprojetobichofull.application.usecases;

import com.backend.backprojetobichofull.api.dto.BetRequest;
import com.backend.backprojetobichofull.api.dto.BetResponse;
import com.backend.backprojetobichofull.domain.model.Bet;
import com.backend.backprojetobichofull.domain.model.StatusAposta;
import com.backend.backprojetobichofull.domain.model.TipoAposta;
import com.backend.backprojetobichofull.domain.model.User;
import com.backend.backprojetobichofull.infrastructure.persistence.BetRepository;
import com.backend.backprojetobichofull.infrastructure.persistence.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class RegistrarApostaUseCase {

    private final BetRepository betRepository;
    private final UserRepository userRepository;

    public RegistrarApostaUseCase(BetRepository betRepository, UserRepository userRepository) {
        this.betRepository = betRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public BetResponse executar(BetRequest dto, String emailUsuarioLogado) {
        User user = userRepository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        TipoAposta tipoAposta = converterTipo(dto.getTipo_aposta());
        String palpiteFormatado = validarEFormatarPalpite(dto.getPalpite(), tipoAposta);
        BigDecimal valorApostado = validarValor(dto.getValor_apostado());

        user.debitarSaldo(valorApostado);

        Bet bet = Bet.builder()
                .tipoAposta(tipoAposta)
                .palpite(palpiteFormatado)
                .valorApostado(valorApostado)
                .status(StatusAposta.PENDENTE)
                .user(user)
                .build();

        Bet apostaSalva = betRepository.save(bet);
        userRepository.save(user);

        return BetResponse.builder()
                .id(apostaSalva.getId())
                .tipo_aposta(apostaSalva.getTipoAposta().name())
                .palpite(apostaSalva.getPalpite())
                .valor_apostado(apostaSalva.getValorApostado())
                .status(apostaSalva.getStatus().name())
                .data_aposta(apostaSalva.getDataAposta())
                .saldo_atual(user.getSaldo())
                .build();
    }

    private TipoAposta converterTipo(String tipo) {
        if (tipo == null || tipo.isBlank()) {
            throw new RuntimeException("Tipo de aposta é obrigatório.");
        }

        try {
            return TipoAposta.valueOf(tipo.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Tipo de aposta inválido. Use GRUPO, DEZENA ou MILHAR.");
        }
    }

    private BigDecimal validarValor(BigDecimal valor) {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("O valor da aposta deve ser maior que zero.");
        }
        return valor;
    }

    private String validarEFormatarPalpite(String palpite, TipoAposta tipoAposta) {
        if (palpite == null || palpite.isBlank()) {
            throw new RuntimeException("O palpite é obrigatório.");
        }

        String apenasNumeros = palpite.replaceAll("\\D", "");

        return switch (tipoAposta) {
            case GRUPO -> formatarGrupo(apenasNumeros);
            case DEZENA -> formatarDezena(apenasNumeros);
            case MILHAR -> formatarMilhar(apenasNumeros);
        };
    }

    private String formatarGrupo(String numero) {
        if (numero.isBlank()) {
            throw new RuntimeException("Grupo inválido.");
        }

        int grupo = Integer.parseInt(numero);
        if (grupo < 1 || grupo > 25) {
            throw new RuntimeException("Grupo inválido. Informe um valor entre 1 e 25.");
        }

        return String.format("%02d", grupo);
    }

    private String formatarDezena(String numero) {
        if (numero.isBlank() || numero.length() > 2) {
            throw new RuntimeException("Dezena inválida. Informe um valor entre 00 e 99.");
        }

        int dezena = Integer.parseInt(numero);
        if (dezena < 0 || dezena > 99) {
            throw new RuntimeException("Dezena inválida. Informe um valor entre 00 e 99.");
        }

        return String.format("%02d", dezena);
    }

    private String formatarMilhar(String numero) {
        if (numero.isBlank() || numero.length() > 4) {
            throw new RuntimeException("Milhar inválida. Informe um valor entre 0000 e 9999.");
        }

        int milhar = Integer.parseInt(numero);
        if (milhar < 0 || milhar > 9999) {
            throw new RuntimeException("Milhar inválida. Informe um valor entre 0000 e 9999.");
        }

        return String.format("%04d", milhar);
    }
}