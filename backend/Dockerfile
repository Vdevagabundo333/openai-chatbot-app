FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY HighCapital.Chatbot.Api.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS final
WORKDIR /app

COPY HighCapital.Chatbot.Api.csproj ./
COPY . ./  

COPY --from=build /out ./publish

RUN dotnet tool install --global dotnet-ef --version 7.0.5
ENV PATH="$PATH:/root/.dotnet/tools"

ENV ASPNETCORE_URLS=http://+:5000

EXPOSE 5000

ENTRYPOINT ["sh", "-c", "dotnet ef database update --project ./HighCapital.Chatbot.Api.csproj && dotnet ./publish/HighCapital.Chatbot.Api.dll"]
