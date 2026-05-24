# Projeto Redes — API REST + MySQL + Nginx

Sistema desenvolvido para simular uma infraestrutura web utilizando duas máquinas virtuais, separando a camada de proxy reverso da camada de aplicação e banco de dados.

---

# Integrantes

* Joice Paiva — Banco de Dados (MySQL)
* Caio Primo — Back-End/API REST
* Juan Teles — Proxy Reverso e Infraestrutura (Nginx)

---

# Objetivo do Projeto

Implementar uma arquitetura web com:

```plaintext
Cliente → VM1 (Nginx/Proxy Reverso) → VM2 (API REST + Banco de Dados)
```

Onde:

* VM1 será responsável pelo Proxy Reverso utilizando Nginx
* VM2 hospedará:

  * API RESTful em Node.js
  * Banco de Dados MySQL

---

# Tecnologias Utilizadas

## Back-End

* Node.js
* Express

## Banco de Dados

* MySQL

## Infraestrutura

* Nginx
* Ubuntu Server / Debian

---

# Estrutura do Projeto

```plaintext
projeto-redes/
│
├── api/          # Código fonte da API REST
├── database/     # Script SQL do banco de dados
├── nginx/        # Configuração do Nginx
├── docs/         # Documentação das rotas
└── README.md
```

---

# Banco de Dados

## Banco utilizado

```plaintext
MySQL
```

## Nome do banco

```plaintext
projeto_redes
```

## Tabelas

### clientes

* id
* nome
* email

### produtos

* id
* nome
* preco

---

# Configuração do Banco de Dados

## Criar banco e tabelas

Execute o arquivo:

```plaintext
/database/schema.sql
```

Ou execute manualmente:

```sql
CREATE DATABASE projeto_redes;

USE projeto_redes;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);
```

---

# Configuração da API

## Instalar dependências

Dentro da pasta `/api` execute:

```bash
npm install
```

---

## Configurar arquivo `.env`

Criar o arquivo:

```plaintext
/api/.env
```

Conteúdo:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=projeto_redes
```

---

# Executar a API

Na pasta `/api` execute:

```bash
node server.js
```

Se tudo estiver correto:

```plaintext
✅ INFRAESTRUTURA: Conexão com o banco de dados estabelecida com sucesso!
🚀 API RESTful rodando na porta 3000
```

---

# Rotas da API

## Clientes

| Método | Rota          |
| ------ | ------------- |
| GET    | /clientes     |
| POST   | /clientes     |
| PUT    | /clientes/:id |
| DELETE | /clientes/:id |

---

## Produtos

| Método | Rota          |
| ------ | ------------- |
| GET    | /produtos     |
| POST   | /produtos     |
| PUT    | /produtos/:id |
| DELETE | /produtos/:id |

---

# Exemplos de Dados

## Clientes cadastrados

* Caio Primo
* Juan Teles
* Joice Paiva

---

# Proxy Reverso (Nginx)

A configuração do Nginx estará disponível na pasta:

```plaintext
/nginx
```

O proxy reverso será responsável por encaminhar as requisições recebidas na VM1 para a API hospedada na VM2.

---

# Configuração das Máquinas Virtuais

## VM1

* Nginx
* Proxy Reverso

## VM2

* Node.js
* API REST
* MySQL

---

# Status do Projeto

| Etapa                  | Status          |
| ---------------------- | --------------- |
| Banco de Dados         | ✅               |
| API REST               | ✅               |
| CRUD Completo          | ✅               |
| Integração API + MySQL | ✅               |
| Proxy Reverso Nginx    | 🔄 Em andamento |
| Comunicação VM1 ↔ VM2  | 🔄 Em andamento |

---

# Observações

* O projeto utiliza arquitetura em camadas.
* A API realiza persistência dos dados diretamente no MySQL.
* O Nginx será configurado utilizando Virtual Host próprio, sem utilizar o arquivo padrão `default`.
