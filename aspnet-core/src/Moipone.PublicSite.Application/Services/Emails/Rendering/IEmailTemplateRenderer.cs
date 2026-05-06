using System.Threading.Tasks;

namespace Moipone.PublicSite.Services.Emails.Rendering
{
    public interface IEmailTemplateRenderer
    {
        Task<string> RenderAsync<TModel>(string templateName, TModel model);
    }
}
