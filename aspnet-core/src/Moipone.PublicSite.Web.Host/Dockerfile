FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/Moipone.PublicSite.Web.Host/Moipone.PublicSite.Web.Host.csproj", "src/Moipone.PublicSite.Web.Host/"]
COPY ["src/Moipone.PublicSite.Web.Core/Moipone.PublicSite.Web.Core.csproj", "src/Moipone.PublicSite.Web.Core/"]
COPY ["src/Moipone.PublicSite.Application/Moipone.PublicSite.Application.csproj", "src/Moipone.PublicSite.Application/"]
COPY ["src/Moipone.PublicSite.Core/Moipone.PublicSite.Core.csproj", "src/Moipone.PublicSite.Core/"]
COPY ["src/Moipone.PublicSite.EntityFrameworkCore/Moipone.PublicSite.EntityFrameworkCore.csproj", "src/Moipone.PublicSite.EntityFrameworkCore/"]
WORKDIR "/src/src/Moipone.PublicSite.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/Moipone.PublicSite.Web.Host", "src/Moipone.PublicSite.Web.Host"]
COPY ["src/Moipone.PublicSite.Web.Core", "src/Moipone.PublicSite.Web.Core"]
COPY ["src/Moipone.PublicSite.Application", "src/Moipone.PublicSite.Application"]
COPY ["src/Moipone.PublicSite.Core", "src/Moipone.PublicSite.Core"]
COPY ["src/Moipone.PublicSite.EntityFrameworkCore", "src/Moipone.PublicSite.EntityFrameworkCore"]
WORKDIR "/src/src/Moipone.PublicSite.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "Moipone.PublicSite.Web.Host.dll"]
