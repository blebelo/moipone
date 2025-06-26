# Stage 1: Build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["MoiponeWebAPI.csproj", "./"]
RUN dotnet restore "./MoiponeWebAPI.csproj"

# Copy everything else and build/publish
COPY . .
RUN dotnet publish "MoiponeWebAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Create runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "MoiponeWebAPI.dll"]
