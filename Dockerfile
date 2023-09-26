# image we want to start from
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
#location inside the Docker container
WORKDIR /app 

# copy .csproj and restore as distinct layers
# we copy sln and csproj from the file system inside the /app directory and we can execute dotnet restore inside the container
COPY "Reactivities.sln" "Reactivities.sln"
COPY "API/API.csproj" "API/API.csproj"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"

RUN dotnet restore "Reactivities.sln"

# copy everything else build
COPY . .
WORKDIR /app
# -c: configuration -o: output directory
RUN dotnet publish -c Release -o out 

# build a runtime image
# we want only the runtime so we don't need the sdk
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll" ]