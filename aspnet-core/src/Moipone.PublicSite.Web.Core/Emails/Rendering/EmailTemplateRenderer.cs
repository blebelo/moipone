using Abp.Dependency;
using Moipone.PublicSite.Emails.Rendering;
using RazorLight;
using System.IO;
using System.Threading.Tasks;

public class RazorLightEmailTemplateRenderer : IEmailTemplateRenderer, ISingletonDependency
{
    private readonly IRazorLightEngine _engine;

    public RazorLightEmailTemplateRenderer()
    {
        var templatesRoot = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Emails", "Templates"
        );

        _engine = new RazorLightEngineBuilder()
            .UseFileSystemProject(templatesRoot)
            .UseMemoryCachingProvider()
            .Build();
    }

    public async Task<string> RenderAsync<TModel>(string templateName, TModel model)
    {
        // templateName = "Welcome" resolves to Templates/Welcome.cshtml
        return await _engine.CompileRenderAsync(templateName, model);
    }
}