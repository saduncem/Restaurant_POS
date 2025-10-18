using Microsoft.EntityFrameworkCore;
using RestaurantPOS.Core.Entities;

namespace RestaurantPOS.Infrastructure
{
    /// <summary>
    /// EF Core database context for the Restaurant POS application.  Maps the core domain entities
    /// to tables in the SQL Server database.  Additional DbSet properties should be added here
    /// as new entities are introduced into the system.
    /// </summary>
    // Use IdentityDbContext to integrate ASP.NET Identity.  IdentityUser and IdentityRole use int keys.
    public class ApplicationDbContext : Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext<RestaurantPOS.Core.Entities.ApplicationUser, Microsoft.AspNetCore.Identity.IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Table> Tables => Set<Table>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<ApplicationUser> ApplicationUsers => Set<ApplicationUser>();

        // New entities added for menu, payment and reports
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Payment> Payments => Set<Payment>();
        public DbSet<Report> Reports => Set<Report>();

        // Delivery related entities
        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<DeliveryAddress> DeliveryAddresses => Set<DeliveryAddress>();
        public DbSet<DeliveryGuy> DeliveryGuys => Set<DeliveryGuy>();
        public DbSet<DeliveryOrder> DeliveryOrders => Set<DeliveryOrder>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure entity relationships and constraints here if needed.
            // For example: modelBuilder.Entity<Table>().HasMany(t => t.Orders).WithOne(o => o.Table);
        }
    }
}