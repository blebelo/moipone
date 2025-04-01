using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MoiponeWebAPI.Data;
using Microsoft.Extensions.Options;
using DotNetEnv;


// First load the environment variables
Env.Load();

// Get the connection string directly from environment
string connectionString = Environment.GetEnvironmentVariable("FourTwentyAPIContext");

var builder = WebApplication.CreateBuilder(args);

// Add the connection string to the configuration
builder.Configuration["ConnectionStrings:FourTwentyAPIContext"] = connectionString;

// Now configure the DbContext with the connection string
builder.Services.AddDbContext<MoiponeWebAPIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MoiponeWebAPIContext") ??
        throw new InvalidOperationException("Connection string 'MoiponeWebAPIContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
