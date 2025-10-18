using Microsoft.EntityFrameworkCore;
using RestaurantPOS.Infrastructure;
using RestaurantPOS.Application.Interfaces;
using RestaurantPOS.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using RestaurantPOS.Core.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure EF Core with SQL Server.  The connection string should be defined in appsettings.json
// or provided via environment variables.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register application services.  Additional services can be added here.
builder.Services.AddScoped<ITableService, TableService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<IDeliveryService, DeliveryService>();

// Add SignalR for real‑time updates (tables, orders, etc.).
builder.Services.AddSignalR();

// Configure Identity and authentication.  This registers the Identity framework with the
// ApplicationUser entity and a default role type using int as the primary key.
builder.Services.AddIdentity<ApplicationUser, IdentityRole<int>>(options =>
{
    // Password strength settings can be adjusted here.
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Configure JWT authentication.  In a real system you would store the key securely and
// set up issuer and audience validation.  This example uses minimal validation for brevity.
var jwtKey = builder.Configuration["Jwt:Key"] ?? "ReplaceWithASecureKey";
var key = Encoding.UTF8.GetBytes(jwtKey);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable authentication.  Authentication must come before authorisation.
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

// Map SignalR hubs.  These hubs provide real‑time updates for tables and orders.
app.MapHub<RestaurantPOS.Api.Hubs.TableHub>("/hubs/table");
app.MapHub<RestaurantPOS.Api.Hubs.OrderHub>("/hubs/order");

app.Run();