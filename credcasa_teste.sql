-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Tempo de geração: 08/06/2023 às 17:58
-- Versão do servidor: 5.7.34
-- Versão do PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `credcasa_teste`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `telefone` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `data_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `leads`
--

INSERT INTO `leads` (`id`, `id_usuario`, `nome`, `email`, `telefone`, `cidade`, `estado`, `data_time`) VALUES
(1, 1, 'Joabe Antunes', 'joabe@gmail.com', '(43) 54235-3453', 'Jundiaí', 'SP', '2023-03-02 01:30:44'),
(2, 1, 'Adrielly', 'adrielly@gmail.com', '(32) 43543-5643', 'Adamantina', 'SP', '2023-03-12 11:23:52'),
(3, 1, 'Fredy', 'fredy@gmail.com', '(32) 43543-1233', 'Jundiaí', 'SP', '2023-03-12 11:23:52'),
(4, 1, 'Lucas', 'lucas@gmail.com', '(32) 2345-1233', 'São Paulo', 'SP', '2023-08-03 11:23:52'),
(5, 1, 'Rosangela', 'rosangela@gmail.com', '(32) 2345-1233', 'São Paulo', 'SP', '2023-08-01 11:23:52'),
(6, 1, 'Fernando', 'fernando@gmail.com', '(32) 2345-1233', 'São Paulo', 'SP', '2023-08-05 11:23:52'),
(7, 1, 'Marcia', 'marcia@gmail.com', '(32) 2345-1233', 'São Paulo', 'SP', '2023-08-02 11:23:52'),
(8, 1, 'Gisele', 'gisele@gmail.com', '(32) 2345-1233', 'São Paulo', 'SP', '2023-05-10 11:23:52'),
(9, 1, 'Gerson', 'gerson@gmail.com', '(32) 2345-1233', 'São Paulo', 'SP', '2023-01-09 11:23:52');

-- --------------------------------------------------------

--
-- Estrutura para tabela `perfil_profissional`
--

CREATE TABLE `perfil_profissional` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `foto` varchar(600) DEFAULT 'images/users/default.jpg',
  `sobre` longtext,
  `visibilidade_perfil` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `perfil_profissional`
--

INSERT INTO `perfil_profissional` (`id`, `id_usuario`, `foto`, `sobre`, `visibilidade_perfil`) VALUES
(3, 268, 'images/users/uploads/8f121ce07d74717e0b1f21d122e04521/ce5e4f9ecdad4cf98e968509053917ff.jpg', 'teste123', 1),
(4, 269, 'images/users/uploads/06138bc5af6023646ede0e1f7c1eac75/8aae5e6798716012c131c72195d8be8e.png', 'CONSTRUTOR, INVESTIDOR E ENGENHEIRO CIVIL, ESPECIALISTA EM FINANCIAMENTO IMOBILIÁRIO.\n\nJÁ AJUDOU MAIS DE 200 FAMÍLIAS A CONQUISTAREM A CASA DOS SONHOS. ESTÁ ATUANTE NO MERCADO IMOBILIÁRIO DESDE 2010. FUNDOU A SUA CONSTRUTORA EM 2015 E DE LÁ PRA CÁ VEM REALIZANDO O SONHO DA CASA PRÓPRIA DE MUITAS FAMÍLIAS.', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `id` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` (`id`, `state`) VALUES
(1, 0),
(2, 0),
(3, 0),
(4, 0),
(5, 0),
(6, 0),
(7, 0),
(8, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(255) NOT NULL,
  `nome` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `profissao` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `celular` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `estado` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cidade` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `senha` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `perfil` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `codigo_ativacao` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `conta_ativada` int(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `profissao`, `celular`, `estado`, `cidade`, `email`, `senha`, `perfil`, `data_cadastro`, `codigo_ativacao`, `conta_ativada`) VALUES
(1, 'Charles  Dev', 'Engenheiro', '(11) 98765-9876', 'AL', 'Batalha', 'teste', '202cb962ac59075b964b07152d234b70', '2', '2023-01-30 20:09:43', NULL, 1);

--
-- Gatilhos `usuarios`
--
DELIMITER $$
CREATE TRIGGER `add_perfil_profissional` AFTER INSERT ON `usuarios` FOR EACH ROW INSERT INTO perfil_profissional (id_usuario) VALUES (new.id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deletar_leads` AFTER DELETE ON `usuarios` FOR EACH ROW IF EXISTS
(SELECT * FROM leads WHERE leads.id_usuario = OLD.id) 
THEN 
DELETE from leads WHERE leads.id_usuario = OLD.id;
END IF
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deletar_perfil_profissional` AFTER DELETE ON `usuarios` FOR EACH ROW IF EXISTS
(SELECT * FROM perfil_profissional WHERE perfil_profissional.id_usuario = OLD.id) 
THEN 
DELETE from perfil_profissional WHERE perfil_profissional.id_usuario = OLD.id;
END IF
$$
DELIMITER ;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `perfil_profissional`
--
ALTER TABLE `perfil_profissional`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `perfil_profissional`
--
ALTER TABLE `perfil_profissional`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=289;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
