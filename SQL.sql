USE `db_saep` ;
-- ===========================
-- TABELA: Produto
-- ===========================
CREATE TABLE Produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo CHAR(50),
    tipo CHAR(20),
    armazenamento FLOAT,
    largura INT,
    altura INT,
    tensao INT,
    conectividade CHAR(50),
    CHECK (tipo IN ('Notebook', 'Smartphone', 'TV Smart'))
);

-- ===========================
-- TABELA: Estoque
-- ===========================
CREATE TABLE Estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto INT,
    quantidade INT,
    preco FLOAT,
    FOREIGN KEY (produto) REFERENCES Produto(id)
);

-- ===========================
-- TABELA: EntradaSaida
-- ===========================
CREATE TABLE EntradaSaida (
    id INT AUTO_INCREMENTestoque PRIMARY KEY,
    produto INT,
    responsavel CHAR(50),
    ultimaAlteracao DATETIME,
    FOREIGN KEY (produto) REFERENCES Produto(id)
);

INSERT INTO Produto (modelo, tipo, armazenamento, largura, altura, tensao, conectividade) VALUES
('XPS 13', 'Notebook', 512, 30, 20, 19, 'Wi-Fi; Bluetooth'),
('Galaxy S22', 'Smartphone', 256, 7, 15, 5, '5G; Wi-Fi; Bluetooth'),
('iPhone 14', 'Smartphone', 128, 7, 14, 5, '5G; Wi-Fi; Bluetooth'),
('LG OLED55', 'TV Smart', 16, 123, 72, 110, 'Wi-Fi; Ethernet'),
('Dell G15', 'Notebook', 1024, 36, 25, 19, 'Wi-Fi; Bluetooth');


INSERT INTO Estoque (produto, quantidade, preco) VALUES
(1, 12, 7200.00),
(2, 30, 4200.50),
(3, 25, 5100.90),
(4, 8, 7800.00),
(5, 10, 6200.00);


INSERT INTO EntradaSaida (produto, responsavel, ultimaAlteracao) VALUES
(1, 'Carlos Almeida', '2025-01-10 14:22:00'),
(2, 'Fernanda Silva', '2025-02-03 09:10:00'),
(3, 'Pedro Ramos', '2025-02-15 17:45:00'),
(4, 'Juliana Costa', '2025-03-01 11:30:00'),
(5, 'Roberto Lima', '2025-03-05 08:50:00');

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,               -- ID gerado automaticamente
    password VARCHAR(128) NOT NULL,                   -- Senha hash
    last_login TIMESTAMP NULL,                        -- Data e hora do último login
    is_superuser BOOLEAN NOT NULL,                    -- Se é um superusuário
    username VARCHAR(150) NOT NULL UNIQUE,            -- Nome de usuário único
    first_name VARCHAR(30),                           -- Primeiro nome
    last_name VARCHAR(150),                           -- Sobrenome
    email VARCHAR(254),                               -- E-mail
    is_staff BOOLEAN NOT NULL,                        -- Se o usuário tem acesso ao painel administrativo
    is_active BOOLEAN NOT NULL,                       -- Se o usuário está ativo
    date_joined TIMESTAMP NOT NULL,                   -- Data de criação do usuário
    CONSTRAINT username_unique UNIQUE (username)     -- Garantia de que o username é único
);


INSERT INTO usuario (username, password, email, first_name, last_name, is_superuser, is_staff, is_active, date_joined)
VALUES
('usuario1', '$2y$12$KIXbnpXXKmjc9qJHjC5FLOib7dz3WQ3xeCwVlz1s4tTbx0JfjL.lG', 'usuario1@exemplo.com', 'Carlos', 'Silva', false, true, true, '2025-12-01 10:00:00'),
('usuario2', '$2y$12$MQRuqVRsmrW73QpcBW4tR1IKzJhOmXa74b7gkq9lgOjlKaei.qDLa', 'usuario2@exemplo.com', 'Ana', 'Costa', false, false, true, '2025-12-02 11:15:00'),
('usuario3', '$2y$12$2EKcoRiQFdN4Gj0QLrF/6i7yD.jX0O8OEKqdyk64s6ZT2Z4DWLv.m', 'usuario3@exemplo.com', 'Pedro', 'Oliveira', false, false, true, '2025-12-03 09:00:00'),
('usuario4', '$2y$12$V5llzsf4Pp0vIf3aQjqcpYYGE1gFiYLVhR3xO.xD.TtYNpeoGRw5C', 'usuario4@exemplo.com', 'Maria', 'Pereira', false, true, true, '2025-12-04 14:30:00'),
('usuario5', '$2y$12$gh9ioh.ZVuTkAn.Dv9tnmQEdnDsqFSaaPSHlTT8Wdoa3YBoak8WlS', 'usuario5@exemplo.com', 'Lucas', 'Melo', false, false, true, '2025-12-05 13:20:00');
