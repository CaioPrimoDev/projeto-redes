require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais obrigatórios
app.use(cors()); 
app.use(express.json()); 

// Configuração do Pool de Conexão com o MySQL (Lê as credenciais do arquivo .env)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testar a conexão com o banco de dados assim que o servidor iniciar
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ CONFIGURAÇÃO DE REDE/BANCO: Erro ao conectar no MySQL:', err.message);
    } else {
        console.log('✅ INFRAESTRUTURA: Conexão com o banco de dados estabelecida com sucesso!');
        connection.release();
    }
});

// ==========================================
// 👥 ROTAS DO CRUD: CLIENTES
// ==========================================

// 1. READ ALL - Listar todos os clientes
app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            console.error('Erro no GET /clientes:', err);
            return res.status(500).json({ error: err.message || 'Erro ao buscar clientes.' });
        }
        res.json(results);
    });
});

// 2. CREATE - Criar um novo cliente
app.post('/clientes', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e Email son obrigatórios.' });
    }

    const query = 'INSERT INTO clientes (nome, email) VALUES (?, ?)';
    db.query(query, [nome, email], (err, result) => {
        if (err) {
            console.error('Erro no POST /clientes:', err);
            return res.status(500).json({ error: err.message || 'Erro ao salvar cliente.' });
        }
        res.status(201).json({ id: result.insertId, nome, email });
    });
});

// 3. UPDATE - Atualizar um cliente existente
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e Email são obrigatórios para atualização.' });
    }

    const query = 'UPDATE clientes SET nome = ?, email = ? WHERE id = ?';
    db.query(query, [nome, email, id], (err, result) => {
        if (err) {
            console.error(`Erro no PUT /clientes/${id}:`, err);
            return res.status(500).json({ error: err.message || 'Erro ao atualizar cliente.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado.' });
        }
        res.json({ message: 'Cliente atualizado com sucesso', id, nome, email });
    });
});

// 4. DELETE - Remover um cliente
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM clientes WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(`Erro no DELETE /clientes/${id}:`, err);
            return res.status(500).json({ error: err.message || 'Erro ao remover cliente.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado.' });
        }
        res.json({ message: 'Cliente removido com sucesso' });
    });
});

// ==========================================
// 📦 ROTAS DO CRUD: PRODUTOS
// ==========================================

// 1. READ ALL - Listar todos os produtos
app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) {
            console.error('Erro no GET /produtos:', err);
            return res.status(500).json({ error: err.message || 'Erro ao buscar produtos.' });
        }
        res.json(results);
    });
});

// 2. CREATE - Criar um novo produto
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ error: 'Nome e Preço são obrigatórios.' });
    }

    const query = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';
    db.query(query, [nome, preco], (err, result) => {
        if (err) {
            console.error('Erro no POST /produtos:', err);
            return res.status(500).json({ error: err.message || 'Erro ao salvar produto.' });
        }
        res.status(201).json({ id: result.insertId, nome, preco });
    });
});

// 3. UPDATE - Atualizar um produto existente
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ error: 'Nome e Preço são obrigatórios para atualização.' });
    }

    const query = 'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?';
    db.query(query, [nome, preco, id], (err, result) => {
        if (err) {
            console.error(`Erro no PUT /produtos/${id}:`, err);
            return res.status(500).json({ error: err.message || 'Erro ao atualizar produto.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.json({ message: 'Produto atualizado com sucesso', id, nome, preco });
    });
});

// 4. DELETE - Remover um produto
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM produtos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(`Erro no DELETE /produtos/${id}:`, err);
            return res.status(500).json({ error: err.message || 'Erro ao remover produto.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.json({ message: 'Produto removido com sucesso' });
    });
});

// Inicialização do Servidor Web
app.listen(PORT, () => {
    console.log(`🚀 API RESTful rodando na porta ${PORT}`);
    console.log(`📡 Aguardando conexões do Proxy Reverso (Nginx)...`);
});