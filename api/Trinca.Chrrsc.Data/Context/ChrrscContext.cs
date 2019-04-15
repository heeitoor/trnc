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

        public ChrrscContext(DbContextOptions<ChrrscContext> dbContextOptions) : base(dbContextOptions) { }
    }
}
