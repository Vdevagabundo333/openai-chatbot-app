# HighCapital-Desafio-Tecnico - Backend

Este é o serviço de backend do projeto, uma API REST em C# com ASP.NET Core, Entity Framework Core e SQLite para persistência.

## 🚀 Como Iniciar

A forma recomendada de iniciar este serviço é através do **Docker Compose na raiz do projeto**. Você só precisará do Docker instalado.

Para rodar localmente fora do Docker, siga as instruções abaixo:

### Pré-requisitos
* .NET 6 SDK instalado
* Docker instalado (se for usar via container)
* Editor de código (ex: VS Code)

### 1. Configurar as variáveis de ambiente
Crie um arquivo `.env` na raiz do backend, seguindo o `.env.example`, e defina as variáveis necessárias.

### 2. Subir o ambiente completo (build + run)
```
docker compose up --build -d
```

### 3. Rodar as migrations (criar o banco e as tabelas)
```
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
