FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY HighCapital.Chatbot.Api.csproj ./
RUN dotnet restore

COPY . ./

RUN dotnet tool install --global dotnet-ef --version 7.0.5
ENV PATH="$PATH:/root/.dotnet/tools"

RUN mkdir -p data && chmod a+rw data

RUN dotnet ef database update --project ./HighCapital.Chatbot.Api.csproj

RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app

COPY --from=build /out .

EXPOSE 5000

# Inicia a aplicação
ENTRYPOINT ["dotnet", "./HighCapital.Chatbot.Api.dll"]