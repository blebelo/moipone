using Moipone.PublicSite.Services.Emails.Rendering;
using RazorLight;
using System.Dynamic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

public class EmailTemplateRenderer : IEmailTemplateRenderer
{
    private readonly IRazorLightEngine _engine;
    private readonly string _emailStyles;

    public EmailTemplateRenderer()
    {
        var templatesRoot = Path.Combine(
            Path.GetDirectoryName(typeof(EmailTemplateRenderer).Assembly.Location),
            "Emails", "Templates"
        );

        var stylesPath = Path.Combine(templatesRoot, "moipone-email.css");

        _engine = new RazorLightEngineBuilder()
            .UseFileSystemProject(templatesRoot)
            .UseMemoryCachingProvider()
            .Build();

        _emailStyles = File.Exists(stylesPath)
            ? File.ReadAllText(stylesPath)
            : string.Empty;
    }

    public async Task<string> RenderAsync<TModel>(string templateName, TModel model)
    {
        dynamic viewBag = new ExpandoObject();
        viewBag.EmailStyles = _emailStyles;

        // templateName resolves to Templates/<templateName>.cshtml
        return await _engine.CompileRenderAsync(templateName, model, viewBag);
    }
}
