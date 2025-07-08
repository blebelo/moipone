FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["MoiponeWebAPI.csproj", "./"]
RUN dotnet restore "./MoiponeWebAPI.csproj"

COPY . .
RUN dotnet publish "MoiponeWebAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "MoiponeWebAPI.dll"]
