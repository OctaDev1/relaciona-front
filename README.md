# 🤝 Relaciona CRM 

Sistema de Gestão de Relacionamento com Clientes (CRM) desenvolvido para **centralizar informações de clientes, organizar oportunidades de negócio e otimizar o processo comercial de uma empresa**.

> **Relaciona CRM — Conectando pessoas. Fortalecendo relacionamentos.**

---

## 📋 Sobre o Projeto

O **Relaciona** é uma plataforma de CRM (Customer Relationship Management) desenvolvida para auxiliar empresas no gerenciamento de clientes e oportunidades de negócio.

A proposta do sistema é substituir dados descentralizados e processos manuais de acompanhamento comercial por uma solução centralizada, proporcionando **mais controle, organização e agilidade** para o relacionamento com clientes e o acompanhamento das negociações.

O projeto foi desenvolvido pela equipe **OctaDev**, formada por estudantes do Bootcamp Java Full Stack da Generation Brasil, com foco na construção de uma aplicação moderna, integrada e preparada para a evolução das rotinas comerciais.

---

## 🎯 Objetivos

- Centralizar informações dos clientes;
- Facilitar o gerenciamento de oportunidades de negócio;
- Organizar os dados dos usuários do sistema;
- Melhorar o controle das negociações;
- Aumentar a produtividade da equipe comercial;
- Disponibilizar uma API REST para integração com outras aplicações.

---

## 💡 Problema e Solução

### ❌ Cenário tradicional

- Dados de clientes descentralizados;
- Perda de histórico de interações;
- Acompanhamento complexo das negociações;
- Falta de organização do funil de vendas.

### ✅ Com o Relaciona CRM

- Informações centralizadas;
- Melhor relacionamento com clientes;
- Organização do funil de vendas;
- Maior produtividade da equipe;
- Apoio à tomada de decisões;
- Integração por API REST.

---

## 🚀 Tecnologias Utilizadas

### Backend

| Tecnologia | Descrição |
|------------|-----------|
| ☕ Java | Linguagem de programação |
| 🌱 Spring Boot | Framework principal do backend |
| 🗄️ Spring Data JPA | Persistência e acesso aos dados |
| 🔥 Hibernate | ORM |
| 🐬 MySQL | Banco de dados |
| 🌐 Tomcat | Servidor de aplicação |
| 📦 Maven | Gerenciador de dependências |
| 🔌 API REST | Comunicação e integração com o sistema |

### Frontend

| Tecnologia | Descrição |
|------------|-----------|
| ⚛️ React | Biblioteca para construção da interface |
| 🟦 TypeScript | Tipagem e desenvolvimento do frontend |
| ⚡ Vite | Ferramenta de build e desenvolvimento |
| 🎨 Tailwind CSS | Estilização da aplicação |
| 🟢 Node.js | Ambiente utilizado no desenvolvimento do frontend |

---

## 🏛️ Arquitetura

O Relaciona CRM possui uma arquitetura baseada na separação entre **frontend, backend e banco de dados**.

```text
┌─────────────────────────────┐
│          FRONTEND            │
│  React + TypeScript + Vite   │
│        + Tailwind CSS        │
└──────────────┬───────────────┘
               │
               │ API REST
               ▼
┌─────────────────────────────┐
│          BACKEND             │
│   Java + Spring Boot / JPA   │
└──────────────┬───────────────┘
               │
               ▼
┌─────────────────────────────┐
│        BANCO DE DADOS        │
│            MySQL             │
└─────────────────────────────┘
```

---

## 🔧 Arquitetura Backend

A API do Relaciona foi estruturada para disponibilizar serviços responsáveis pelo gerenciamento dos dados comerciais.

Entre as principais operações estão:

- **Cadastrar e consultar clientes e oportunidades**
  - Registro centralizado;
  - Validação de dados;
  - Listagem dinâmica.

- **Atualizar e deletar registros**
  - Manutenção dos dados cadastrais;
  - Atualização do status das oportunidades;
  - Remoção segura de registros.

---

## 📊 Banco de Dados

**db_relaciona**

O sistema utiliza o **MySQL** como SGBD.

### 📌 Tabela: `tb_cliente`

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | BIGINT | Identificador único do cliente |
| `nomeCompleto` | VARCHAR(100) | Nome completo do cliente |
| `email` | VARCHAR(255) | E-mail do cliente |
| `cpf` | VARCHAR(11) | CPF do cliente |
| `cnpj` | VARCHAR(255) | CNPJ do cliente |
| `tipoPessoa` | VARCHAR(255) | Tipo do cliente |
| `dataNascimento` | DATE | Data de nascimento do cliente |

### 📌 Tabela: `tb_oportunidade`

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | BIGINT | Identificador único da oportunidade |
| `titulo` | VARCHAR(50) | Nome da oportunidade |
| `valorEstimado` | DECIMAL | Valor estimado da negociação |
| `status` | VARCHAR(50) | Situação da oportunidade |
| `dataCriacao` | DATE | Data de criação da oportunidade |
| `dataFechamento` | DATE | Data de fechamento da negociação |

### 📌 Tabela: `tb_usuario`

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | BIGINT | Identificador único do usuário |
| `nome` | VARCHAR(255) | Nome do usuário |
| `email` | VARCHAR(255) | E-mail |
| `senha` | VARCHAR(255) | Senha criptografada |
| `foto` | VARCHAR(5000) | URL da foto de perfil |
| `cargo` | VARCHAR(25) | Cargo do usuário |
| `status` | BOOLEAN | Usuário ativo ou inativo |
| `dataCadastro` | DATE | Data de cadastro |

---

## 📈 Estrutura de Dados

As tabelas `tb_cliente`, `tb_oportunidade` e `tb_usuario` representam as principais entidades do sistema.

Um **cliente** pode abrir várias **oportunidades**, e várias **oportunidades** são gerenciadas por um **usuário**, permitindo a centralização dessas informações em uma única plataforma.

---

## 🎨 Design da Aplicação

A identidade visual do Relaciona CRM foi criada para transmitir:

- 🤝 **Confiança**
- 🗂️ **Organização**
- ⚖️ **Equilíbrio**

### 🎨 Paleta de cores

| Cor | Uso | Código |
|-----|-----|--------|
| Primária | Ações principais | `#00A3FF` |
| Secundária | Superfícies e fundos | `#F0F2F5` |
| Neutra | Textos e ícones | `#73777E` |

---

## 📌 Funcionalidades

### 👥 Gestão de Clientes

- Cadastro de clientes;
- Consulta de clientes;
- Atualização de clientes;
- Exclusão de clientes.

### 💼 Gestão de Oportunidades

- Cadastro de oportunidades;
- Gerenciamento do status das oportunidades;
- Acompanhamento do funil de vendas.

### 🔎 Consultas

- Listagem centralizada;
- Filtros e busca dinâmica.

### 🔌 Integração

- API REST;
- Integração com banco de dados MySQL;
- Estrutura preparada para integrações externas.

---

## 🖥️ Demonstração Prática

A plataforma permite acompanhar em tempo real a operação comercial.

Entre os recursos demonstrados estão:

- Gestão centralizada de clientes e oportunidades;
- Organização do funil de vendas;
- Integração por API REST;
- Conexão com banco de dados MySQL.

---

## 🔮 Implementações Futuras

O Relaciona possui uma visão de evolução baseada em três frentes estratégicas.

### 1. 🤖 IA & Priorização

- IA para priorização de clientes, analisando os dados e identificando quais possuem maior probabilidade de fechar negócio.

### 2. 🔔 Follow-up Inteligente

- Notificações automáticas como:
  - "Você não fala com este cliente há 10 dias."
  - "Retorne o contato hoje."

### 3. ♿ Acessibilidade

- Modo de alto contraste;
- Navegação por teclado;
- Ajuste do tamanho da fonte;
- Compatibilidade com leitores de tela.

---

## 📂 Estrutura do Projeto

```text
Relaciona CRM
│
├── Backend
│   ├── Java
│   ├── Spring Boot
│   ├── Spring Data JPA
│   └── API REST
│
├── Frontend
│   ├── React
│   ├── TypeScript
│   ├── Vite
│   └── Tailwind CSS
│
└── Banco de Dados
    └── MySQL
```

---

## 👥 Equipe

O **Relaciona CRM** foi desenvolvido pela equipe **OctaDev**, formada por estudantes do Bootcamp Java Full Stack da Generation Brasil.

### Desenvolvedores

- Felipe Oliveira Lopes
- Gabriel José Alegre
- Giovanna Karolline Menezes Ribeiro
- Guilherme Oliveira
- João Vitor Diniz Alves
- Juliana Macedo
- Maryane Praxedes Alves da Silva
- Thiago José Nascimento Versiani

---

## 🏆 Sobre a OctaDev

A equipe **OctaDev** desenvolveu o Relaciona CRM com foco em tecnologia, organização, inovação e na construção de uma solução capaz de centralizar e impulsionar o relacionamento comercial com clientes.

---

## 📄 Licença

Este projeto possui finalidade **acadêmica e de aprendizado**, desenvolvido no contexto do Bootcamp Java Full Stack da Generation Brasil.
