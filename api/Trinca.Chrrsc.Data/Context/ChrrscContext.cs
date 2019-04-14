using Microsoft.EntityFrameworkCore;
using Trinca.Chrrsc.Data.Entity;

namespace Trinca.Chrrsc.Data.Context
{
    public class ChrrscContext : DbContext
    {
        public DbSet<Barbecue> Barbecue { get; set; }

        public DbSet<Friend> Friend { get; set; }

        public DbSet<Party> Party { get; set; }

        public DbSet<Settings> Settings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=ec2-54-235-178-189.compute-1.amazonaws.com;SSL Mode=Require;Trust Server Certificate=True;Database=delv26vtv9d324;Username=bjxzqrejnlsxrq;Password=f6c9e557ddd2e3144778e037ef07c9df6ac31140eaa93fa49fc6993c3fdfa63d;");
        }
    }
}
