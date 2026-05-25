# Documentação das Rotas da API

Base URL via Proxy (VM1): `http://IP_DA_VM1/`  
Base URL direto (VM2):    `http://IP_DA_VM2:3000/`

---

## Clientes

### GET /clientes
Lista todos os clientes cadastrados.

**Resposta de sucesso `200`:**
```json
[
  { "id": 1, "nome": "Caio Primo",  "email": "caio.primo@email.com",  "criado_em": "2025-01-01T00:00:00.000Z" },
  { "id": 2, "nome": "Juan Teles",  "email": "juan.teles@email.com",  "criado_em": "2025-01-01T00:00:00.000Z" },
  { "id": 3, "nome": "Joice Paiva", "email": "joice.paiva@email.com", "criado_em": "2025-01-01T00:00:00.000Z" }
]
```

---

### POST /clientes
Cria um novo cliente.

**Body (JSON):**
```json
{
  "nome": "Novo Cliente",
  "email": "novo@email.com"
}
```

**Resposta de sucesso `201`:**
```json
{
  "id": 4,
  "nome": "Novo Cliente",
  "email": "novo@email.com"
}
```

**Resposta de erro `400` (campos faltando):**
```json
{ "error": "Nome e Email son obrigatórios." }
```

---

### PUT /clientes/:id
Atualiza os dados de um cliente existente.

**Parâmetro de rota:** `id` — ID do cliente a atualizar.

**Body (JSON):**
```json
{
  "nome": "Nome Atualizado",
  "email": "atualizado@email.com"
}
```

**Resposta de sucesso `200`:**
```json
{
  "message": "Cliente atualizado com sucesso",
  "id": "1",
  "nome": "Nome Atualizado",
  "email": "atualizado@email.com"
}
```

**Resposta de erro `404`:**
```json
{ "error": "Cliente não encontrado." }
```

---

### DELETE /clientes/:id
Remove um cliente pelo ID.

**Parâmetro de rota:** `id` — ID do cliente a remover.

**Resposta de sucesso `200`:**
```json
{ "message": "Cliente removido com sucesso" }
```

**Resposta de erro `404`:**
```json
{ "error": "Cliente não encontrado." }
```

---

## Produtos

### GET /produtos
Lista todos os produtos cadastrados.

**Resposta de sucesso `200`:**
```json
[
  { "id": 1, "nome": "Notebook Dell", "preco": "3500.00", "criado_em": "2025-01-01T00:00:00.000Z" },
  { "id": 2, "nome": "Mouse Gamer",   "preco": "120.50",  "criado_em": "2025-01-01T00:00:00.000Z" },
  { "id": 3, "nome": "Monitor LG",    "preco": "899.99",  "criado_em": "2025-01-01T00:00:00.000Z" }
]
```

---

### POST /produtos
Cria um novo produto.

**Body (JSON):**
```json
{
  "nome": "Teclado Mecânico",
  "preco": 250.00
}
```

**Resposta de sucesso `201`:**
```json
{
  "id": 4,
  "nome": "Teclado Mecânico",
  "preco": 250.00
}
```

**Resposta de erro `400` (campos faltando):**
```json
{ "error": "Nome e Preço são obrigatórios." }
```

---

### PUT /produtos/:id
Atualiza os dados de um produto existente.

**Parâmetro de rota:** `id` — ID do produto a atualizar.

**Body (JSON):**
```json
{
  "nome": "Teclado Mecânico RGB",
  "preco": 299.90
}
```

**Resposta de sucesso `200`:**
```json
{
  "message": "Produto atualizado com sucesso",
  "id": "4",
  "nome": "Teclado Mecânico RGB",
  "preco": 299.90
}
```

**Resposta de erro `404`:**
```json
{ "error": "Produto não encontrado." }
```

---

### DELETE /produtos/:id
Remove um produto pelo ID.

**Parâmetro de rota:** `id` — ID do produto a remover.

**Resposta de sucesso `200`:**
```json
{ "message": "Produto removido com sucesso" }
```

**Resposta de erro `404`:**
```json
{ "error": "Produto não encontrado." }
```

---

## Códigos de Status Utilizados

| Código | Significado                        |
|--------|------------------------------------|
| 200    | Sucesso                            |
| 201    | Criado com sucesso                 |
| 400    | Dados inválidos ou campos faltando |
| 404    | Recurso não encontrado             |
| 500    | Erro interno no servidor           |
