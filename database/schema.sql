CREATE DATABASE IF NOT EXISTS projeto_redes;

USE projeto_redes;

DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO clientes (nome, email) VALUES
('Caio Primo', 'caio.primo@email.com'),
('Juan Teles', 'juan.teles@email.com'),
('Joice Paiva', 'joice.paiva@email.com');

INSERT INTO produtos (nome, preco) VALUES
('Notebook Dell', 3500.00),
('Mouse Gamer', 120.50),
('Monitor LG', 899.99);