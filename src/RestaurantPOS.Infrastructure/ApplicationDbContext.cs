using Microsoft.EntityFrameworkCore;
using RestaurantPOS.Core.Entities;

namespace RestaurantPOS.Infrastructure
{
    /// <summary>
    /// EF Core database context for the Restaurant POS application.  Maps the core domain entities
    /// to tables in the SQL Server database.  Additional DbSet properties should be added here
    /// as new entities are introduced into the system.
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Table> Tables => Set<Table>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        public DbSet<Employee> Employees => Set<Employee>();

        // New entities added for menu, payment and reports
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Payment> Payments => Set<Payment>();
        public DbSet<Report> Reports => Set<Report>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure entity relationships and constraints here if needed.
            // For example: modelBuilder.Entity<Table>().HasMany(t => t.Orders).WithOne(o => o.Table);
        }
    }
}