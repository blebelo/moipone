using Microsoft.EntityFrameworkCore;

namespace WebAPI.Data
{
    public class StudentContext : DbContext
    {
        public StudentContext (DbContextOptions<StudentContext> options)
            : base(options)
        {
        }

        public DbSet<Domain.Entities.Student> Student { get; set; } = default!;
    }
}
