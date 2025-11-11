# PowerShell script to import localStorage data to Vercel database
# Usage: .\import-data.ps1 -JsonFile "portfolio-data-2024-11-11.json" -SiteUrl "https://your-site.vercel.app"

param(
    [Parameter(Mandatory=$true)]
    [string]$JsonFile,
    
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl
)

# Check if file exists
if (-not (Test-Path $JsonFile)) {
    Write-Host "Error: File '$JsonFile' not found!" -ForegroundColor Red
    exit 1
}

# Read JSON file
Write-Host "Reading data from $JsonFile..." -ForegroundColor Cyan
$jsonContent = Get-Content -Path $JsonFile -Raw

# Send POST request
Write-Host "Uploading data to $SiteUrl/api/import-data..." -ForegroundColor Cyan

try {
    $headers = @{
        "Content-Type" = "application/json"
        "Accept" = "application/json"
    }
    
    $response = Invoke-RestMethod -Uri "$SiteUrl/api/import-data" `
        -Method Post `
        -Headers $headers `
        -Body $jsonContent `
        -Verbose
    
    Write-Host "`nSuccess! Data imported:" -ForegroundColor Green
    Write-Host "  Projects: $($response.results.projects)" -ForegroundColor White
    Write-Host "  Blogs: $($response.results.blogs)" -ForegroundColor White
    Write-Host "  Certifications: $($response.results.certifications)" -ForegroundColor White
    Write-Host "  Achievements: $($response.results.achievements)" -ForegroundColor White
    Write-Host "  Volunteering: $($response.results.volunteering)" -ForegroundColor White
    
} catch {
    Write-Host "`nError uploading data:" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Message: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Yellow
    }
    
    exit 1
}
