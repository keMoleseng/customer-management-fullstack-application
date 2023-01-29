// DbContext for the database
using Microsoft.EntityFrameworkCore;

public class CustomerDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
    public CustomerDbContext(DbContextOptions<CustomerDbContext> options)
        : base(options)
    {
    }

}