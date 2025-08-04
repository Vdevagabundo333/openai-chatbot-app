# HighCapital-Desafio-Tecnico

## 🚀 Como iniciar a aplicação do zero
Este guia ajuda você a configurar, rodar e preparar a aplicação backend (API C#) com banco SQLite, incluindo a criação do banco e das tabelas via migrations do Entity Framework Core.

### Pré-requisitos
* .NET 6 SDK instalado na sua máquina
* Docker instalado (se for usar via container)
* Editor de código (ex: VS Code)

### 1: Clonar o repositório
`git clone <url-do-repositorio>`

`cd HighCapital-Desafio-Tecnico`

### 2. Subir o ambiente completo (build + run)
```
docker compose up --build -d
```

### 3. Rodar as migrations (criar o banco e as tabelas)
```bash
docker compose run --rm ef database update --project /app/HighCapital.Chatbot.Api.csproj
```

Criar migration:
```
docker compose run --rm ef migrations add AddNovosCampos --project /app/HighCapital.Chatbot.Api.csproj
```

### 4. Executar ambiente
```
docker compose up
```

### 5. Testar a API
Acesse no navegador ou no Insomnia/Postman:
http://localhost:5000/api/bots

ou abra o Swagger (se configurado):
http://localhost:5000/swagger

### Tecnologias utilizadas
* .NET 6
* Entity Framework Core + SQLite
* Docker
* OpenAI API (ChatGPT)
* ReactJS (frontend separado)

---

## 📄 Licença

Projeto criado por [Tiago Castro](https://www.linkedin.com/in/tiagogoncalvesdecastro) como parte do desafio técnico da HighCapital.