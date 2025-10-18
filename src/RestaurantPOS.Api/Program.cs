using Microsoft.EntityFrameworkCore;
using RestaurantPOS.Infrastructure;
using RestaurantPOS.Application.Interfaces;
using RestaurantPOS.Infrastructure.Services;

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

// Add SignalR for real‑time updates (tables, orders, etc.).
builder.Services.AddSignalR();

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

// Map SignalR hubs.  These hubs provide real‑time updates for tables and orders.
app.MapHub<RestaurantPOS.Api.Hubs.TableHub>("/hubs/table");
app.MapHub<RestaurantPOS.Api.Hubs.OrderHub>("/hubs/order");

app.Run();