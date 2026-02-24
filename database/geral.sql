CREATE DATABASE IF NOT EXISTS bichofull;
USE bichofull;

-- Tabela de Usuários 
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL, -- Hash BCrypt 
    saldo DECIMAL(10, 2) NOT NULL DEFAULT 1000.00, -- Saldo Inicial Fictício 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_saldo_positivo CHECK (saldo >= 0) --  Impede saldo negativo
);

-- Tabela de Sorteios 
CREATE TABLE draws (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_sorteio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    p_1_milhar CHAR(4) NOT NULL, -- 
    p_2_milhar CHAR(4) NOT NULL,
    p_3_milhar CHAR(4) NOT NULL,
    p_4_milhar CHAR(4) NOT NULL,
    p_5_milhar CHAR(4) NOT NULL
);

-- Tabela de Apostas 
CREATE TABLE bets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tipo_aposta ENUM('GRUPO', 'DEZENA', 'MILHAR') NOT NULL, -- Modalidades 
    valor_apostado DECIMAL(10, 2) NOT NULL,
    palpite VARCHAR(4) NOT NULL, -- Grupo, dezena ou milhar 
    status ENUM('PENDENTE', 'GANHOU', 'PERDEU') DEFAULT 'PENDENTE',
    data_aposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Referência (RF04, RN01)
CREATE TABLE animals (
    grupo INT PRIMARY KEY, -- 1 a 25 
    animal VARCHAR(50) NOT NULL,
    dezenas VARCHAR(20) NOT NULL -- 4 dezenas por grupo 
);