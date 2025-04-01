using Google.Cloud.Storage.V1;


namespace MoiponeWebAPI.Services
{
    public class UploadService
    {
        private readonly StorageClient _storageClient;
        private readonly string _bucketName;

        public UploadService(string bucketName)
        {
            _storageClient = StorageClient.Create();
            _bucketName = bucketName;
        }

        public async Task<string> UploadFileAsync(
          IFormFile file,
          string studentId,
          DocumentType documentType)
        {
            /*
             * Validate FIle Name and throw exception if invalid
             */
            if (file == null || file.Length == 0)
            {
                throw new InvalidDataException("Invalid file");
            }

            /*
             * Generate unique name, upload file object to bucket and return link
             */
            string fileName = GenerateUniqueFileName(studentId, documentType, file);

            using (var stream = file.OpenReadStream())
            {
                var uploadOptions = new UploadObjectOptions
                {
                    PredefinedAcl = PredefinedObjectAcl.PublicRead
                };

                var uploadedObject = await _storageClient.UploadObjectAsync(
                    bucket: _bucketName,
                    objectName: fileName,
                    contentType: file.ContentType,
                    source: stream,
                    options: uploadOptions
                );

                return uploadedObject.MediaLink;
            }
        }

        private string GenerateUniqueFileName(
            string studentId,
            DocumentType documentType,
            IFormFile file)
        {
            /*
             * Generate a unique file name for the uploaded file
             */
            string fileExtension = Path.GetExtension(file.FileName);
            return $"students/{studentId}/{documentType}_{Guid.NewGuid()}{fileExtension}";
        }

    }
}
