using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Moipone.PublicSite.EntityFrameworkCore;

public static class PublicSiteDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<PublicSiteDbContext> builder, string connectionString)
     {
        builder.UseNpgsql(connectionString);
    }

    public static void Configure(DbContextOptionsBuilder<PublicSiteDbContext> builder, DbConnection connection)
    {
        builder.UseNpgsql(connection);
    }
}
