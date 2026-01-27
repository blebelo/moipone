param(
    [Parameter(Mandatory = $true)]
    [string]$EntityName,

    [Parameter(Mandatory = $false)]
    [string]$Namespace = "Moipone.PublicSite"
)

# ------------------ Find Application Layer ------------------
function Find-ApplicationLayer {
    $root = Get-Location
    $srcPath = Join-Path $root "src"

    if (-not (Test-Path $srcPath)) {
        Write-Error "src folder not found. Run this from aspnet-core."
        exit 1
    }

    $appPath = Join-Path $srcPath "$Namespace.Application"

    if (-not (Test-Path $appPath)) {
        Write-Error "Application project not found: $Namespace.Application"
        exit 1
    }

    return $appPath
}

$ApplicationLayerPath = Find-ApplicationLayer
Write-Host "Found Application Layer: $ApplicationLayerPath" -ForegroundColor Green

# ------------------ Naming ------------------
$PluralEntityName = "$EntityName`s"
$EntityLower = $EntityName.Substring(0,1).ToLower() + $EntityName.Substring(1)

# ------------------ Folder Structure ------------------
$EntityFolder = Join-Path $ApplicationLayerPath $PluralEntityName
$DtoFolder = Join-Path $EntityFolder "Dto"

New-Item -ItemType Directory -Force -Path $EntityFolder | Out-Null
New-Item -ItemType Directory -Force -Path $DtoFolder | Out-Null

# ------------------ Interface ------------------
$InterfaceContent = @"
using Abp.Application.Services;
using $Namespace.$PluralEntityName.Dto;
using System;

namespace $Namespace.$PluralEntityName
{
    public interface I${EntityName}AppService
        : IAsyncCrudAppService<${EntityName}Dto, Guid>
    {
    }
}
"@

Set-Content -Path (Join-Path $EntityFolder "I${EntityName}AppService.cs") -Value $InterfaceContent

# ------------------ App Service ------------------
$ServiceContent = @"
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using $Namespace.Domain.$PluralEntityName;
using $Namespace.$PluralEntityName.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace $Namespace.$PluralEntityName
{
    public class ${EntityName}AppService
        : AsyncCrudAppService<$EntityName, ${EntityName}Dto, Guid, PagedAndSortedResultRequestDto, ${EntityName}Dto, ${EntityName}Dto>,
          I${EntityName}AppService
    {
        private readonly IRepository<$EntityName, Guid> _${EntityLower}Repository;

        public ${EntityName}AppService(IRepository<$EntityName, Guid> ${EntityLower}Repository)
            : base(${EntityLower}Repository)
        {
            _${EntityLower}Repository = ${EntityLower}Repository;
        }

        public override async Task<${EntityName}Dto> CreateAsync(${EntityName}Dto input)
        {
            if (input == null)
            {
                throw new UserFriendlyException("$EntityName data cannot be null.");
            }

            var entity = ObjectMapper.Map<$EntityName>(input);
            var result = await _${EntityLower}Repository.InsertAsync(entity);

            return ObjectMapper.Map<${EntityName}Dto>(result);
        }

        public override async Task<PagedResultDto<${EntityName}Dto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = Repository.GetAll();
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            var items = await AsyncQueryableExecuter.ToListAsync(
                query.OrderBy(x => x.Id)
                     .Skip(input.SkipCount)
                     .Take(input.MaxResultCount)
            );

            return new PagedResultDto<${EntityName}Dto>(
                totalCount,
                ObjectMapper.Map<List<${EntityName}Dto>>(items)
            );
        }

        public override async Task<${EntityName}Dto> GetAsync(EntityDto<Guid> input)
        {
            if (input == null || input.Id == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid ID.");
            }

            var entity = await _${EntityLower}Repository.GetAsync(input.Id);
            return ObjectMapper.Map<${EntityName}Dto>(entity);
        }

        public override async Task<${EntityName}Dto> UpdateAsync(${EntityName}Dto input)
        {
            if (input == null || input.Id == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid ID.");
            }

            var entity = await _${EntityLower}Repository.GetAsync(input.Id);
            ObjectMapper.Map(input, entity);

            var updated = await _${EntityLower}Repository.UpdateAsync(entity);
            return ObjectMapper.Map<${EntityName}Dto>(updated);
        }

        public override async Task DeleteAsync(EntityDto<Guid> input)
        {
            if (input == null || input.Id == Guid.Empty)
            {
                throw new UserFriendlyException("Invalid ID.");
            }

            await _${EntityLower}Repository.DeleteAsync(input.Id);
        }
    }
}
"@

Set-Content -Path (Join-Path $EntityFolder "${EntityName}AppService.cs") -Value $ServiceContent

# ------------------ DTO ------------------
$DtoContent = @"
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using $Namespace.Domain.$PluralEntityName;
using System;

namespace $Namespace.$PluralEntityName.Dto
{
    [AutoMap(typeof($EntityName))]
    public class ${EntityName}Dto : EntityDto<Guid>
    {
    }
}
"@

Set-Content -Path (Join-Path $DtoFolder "${EntityName}Dto.cs") -Value $DtoContent

# ------------------ Done ------------------
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "ABP App Service Generated Successfully" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Entity: $EntityName" -ForegroundColor Yellow
Write-Host "Path:   $EntityFolder" -ForegroundColor Gray
