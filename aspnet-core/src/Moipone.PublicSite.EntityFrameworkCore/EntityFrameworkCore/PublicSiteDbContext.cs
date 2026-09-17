using Abp.Zero.EntityFrameworkCore;
using Moipone.PublicSite.Authorization.Roles;
using Moipone.PublicSite.Authorization.Users;
using Moipone.PublicSite.MultiTenancy;
using Microsoft.EntityFrameworkCore;
using Moipone.PublicSite.Domain.Students;
using Moipone.PublicSite.Domain.Addresses;
using Moipone.PublicSite.Domain.ShortCourses;
using Moipone.PublicSite.Domain.CourseApplications;
using Moipone.PublicSite.Domain.Employees;
using Moipone.PublicSite.Domain.Contacts;
using Moipone.PublicSite.Domain.Visitors;
using Moipone.PublicSite.Domain.Visits;

namespace Moipone.PublicSite.EntityFrameworkCore;

public class PublicSiteDbContext : AbpZeroDbContext<Tenant, Role, User, PublicSiteDbContext>
{
    #region Domain Entities
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<ShortCourse> ShortCourses { get; set; }
    public DbSet<CourseApplication> CourseApplications { get; set; }
    public DbSet<Employee> Employees{ get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<Visitor> Visitors { get; set; }
    public DbSet<Visit> Visits{ get; set; }
    #endregion

    public PublicSiteDbContext(DbContextOptions<PublicSiteDbContext> options)
        : base(options)
    {
    }
}
