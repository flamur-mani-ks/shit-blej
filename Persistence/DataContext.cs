using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<Value> Values { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<UserProduct> UserProducts { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 2, Name = "Value 102"},
                    new Value {Id = 3, Name = "Value 103"}
                );
            
             builder.Entity<UserProduct>(x => x.HasKey(up =>
                new { up.AppUserId, up.ProductId }));

            builder.Entity<UserProduct>()
                .HasOne(u => u.AppUser)
                .WithMany(p => p.UserProducts)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserProduct>()
                .HasOne(p => p.Product)
                .WithMany(u => u.UserProducts)
                .HasForeignKey(p => p.ProductId);
        }
    }
}
