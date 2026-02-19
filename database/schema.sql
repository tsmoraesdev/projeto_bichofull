CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, -- RNF03: Hash de senha
    saldo DECIMAL(10, 2) DEFAULT 1000.00 -- RF01: Saldo inicial
);

CREATE TABLE apostas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT,
    valor DECIMAL(10, 2) NOT NULL,
    modalidade ENUM('MILHAR', 'DEZENA', 'GRUPO') NOT NULL, -- RF05
    numero_apostado VARCHAR(4),
    data_aposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);