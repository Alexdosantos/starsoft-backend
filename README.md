# 🚀 Backend Starsoft

Este é o backend do projeto **Starsoft**, desenvolvido com NestJS e TypeORM, utilizando uma arquitetura robusta e ferramentas modernas de mensageria, busca e monitoramento.

## 📦 Tecnologias e Serviços

Este projeto utiliza os seguintes serviços via `docker-compose`:

- **PostgreSQL** – Banco de dados relacional
- **TypeORM** – ORM para integração com PostgreSQL
- **Kafka** – Broker de mensagens para comunicação assíncrona
- **Kafdrop** – UI para monitoramento dos tópicos Kafka
- **Elasticsearch** – Motor de busca para indexação e consultas avançadas
- **Kibana** – Interface para visualização e análise de dados do Elasticsearch
- **Winston** – Logger para registro de eventos e mensagens

---

## 🛠️ Requisitos

Antes de iniciar, você precisará ter instalado em sua máquina:

- [Docker](https://www.docker.com/)


---

## ▶️ Como Rodar o Projeto

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/Alexdosantos/starsoft-backend.git
   cd backend-starsoft
   ```

2. **Crie um arquivo .env na raiz do projeto:**

   ```bash
   Copie o arquivo exemple.env e cole no arquivo .env
   ```

3. **Execute o projeto:**

   ```bash
   docker-compose up
   ```

## ▶️ Como gerar e rodar as migrations
### Para criar e aplicar migrações no banco de dados com TypeORM, siga os passos abaixo:

1. **Entre no container da aplicação rodando o comando abaixo: OBS: o container deve ter sido iniciado com o docker-compose up para que as migrations sejam aplicadas.**

   ```bash
   docker exec -it starsoft-backend-app-1 sh
   ```

2. **Gere a migration:**

   ```bash
   npm run migration:generate -- src/migrations/NOME-DA-MIGRATION
   ```

3. **Aplique a migration:**

   ```bash
   npm run migration:run
   ```

## ▶️ Baixe o arquivo do insomnia com as rotas do projeto

   ```bash
   https://drive.google.com/file/d/1f1phgoWL09Cv4gebb_bCKnWFgV5LgASU/view?usp=drive_link
   ```
   

## ▶️ Como Acessar os Rotas do Projeto

1. **Rota do projeto:**


   ```bash
   http://localhost:5252/api/v1
   ```

2. **Acesse a documentação Swagger:**

   ```bash
   http://localhost:5252/api/v1/docs
   ```
3. **Acesse a interface do Kafdrop:**

   ```bash
   http://localhost:9000
   ```
4. **Acesse a interface do Kibana:**

   ```bash
   http://localhost:5601
   ```
5. **Acesse a interface do Elasticsearch:**

   ```bash
   http://localhost:9200
   ```

6. **Acesse a interface do Kafka:**

   ```bash
   http://localhost:9092
   ```

