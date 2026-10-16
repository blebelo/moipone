using System.Threading.Tasks;

namespace Moipone.PublicSite.Documents
{
    public interface IPdfGenerator
    { 
        Task<byte[]> GenerateAsync<TModel>(byte[] documentTemplate, TModel model);
    }

}
