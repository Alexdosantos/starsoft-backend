# 🚀 Backend Starsoft

Este é o backend do projeto **Starsoft**, desenvolvido com Node.js e TypeORM, utilizando uma arquitetura robusta baseada em microserviços e ferramentas modernas de mensageria, busca e monitoramento.

## 📦 Tecnologias e Serviços

Este projeto utiliza os seguintes serviços via `docker-compose`:

- **PostgreSQL** – Banco de dados relacional
- **TypeORM** – ORM para integração com PostgreSQL
- **Kafka** – Broker de mensagens para comunicação assíncrona
- **Kafdrop** – UI para monitoramento dos tópicos Kafka
- **Elasticsearch** – Motor de busca para indexação e consultas avançadas
- **Kibana** – Interface para visualização e análise de dados do Elasticsearch

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

2. **Execute o projeto:**

   ```bash
   docker-compose up
   ```

## ▶️ Como Acessar os Rotas do Projeto

1. **Acesse a documentação Swagger:**

   ```bash
   http://localhost:3001/api/v1/docs
   ```

2. **Acesse a interface do Kafdrop:**

   ```bash
   http://localhost:9000
   ```

3. **Acesse a interface do Kibana:**

   ```bash
   http://localhost:5601
   ```

4. **Acesse a interface do Elasticsearch:**

   ```bash
   http://localhost:9200
   ```

5. **Acesse a interface do Kafka:**

   ```bash
   http://localhost:9092
   ```

