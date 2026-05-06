using System.Threading.Tasks;

namespace Moipone.PublicSite.Emails.Rendering
{
    public interface IEmailTemplateRenderer
    {
        Task<string> RenderAsync<TModel>(string templateName, TModel model);
    }
}
