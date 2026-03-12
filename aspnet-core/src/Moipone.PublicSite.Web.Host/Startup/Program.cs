using Abp.AspNetCore.Dependency;
using Abp.Dependency;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Sentry;
using Sentry.AspNetCore;

namespace Moipone.PublicSite.Web.Host.Startup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        internal static IHostBuilder CreateHostBuilder(string[] args) =>
            Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();

                    // Sentry
                    webBuilder.UseSentry((context, options) =>
                    {
                        options.Dsn = context.Configuration["Sentry:Dsn"];
                        options.Environment = context.HostingEnvironment.EnvironmentName;
                        options.TracesSampleRate = context.Configuration.GetValue<double?>("Sentry:TracesSampleRate") ?? 0.1;
                        options.Debug = context.HostingEnvironment.IsDevelopment();
                    });
                })
                .UseCastleWindsor(IocManager.Instance.IocContainer);
    }
}
