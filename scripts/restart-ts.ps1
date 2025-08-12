# TypeScript Server Performance Helper
# Run this script when TypeScript server becomes slow

Write-Host "🔄 Restarting TypeScript Server..." -ForegroundColor Yellow

# Clean TypeScript build cache
if (Test-Path "tsconfig.tsbuildinfo") {
    Remove-Item "tsconfig.tsbuildinfo" -Force
    Write-Host "✅ Cleaned TypeScript build info" -ForegroundColor Green
}

# Clean Next.js cache
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "✅ Cleaned Next.js cache" -ForegroundColor Green
}

# Clean node_modules cache
if (Test-Path "node_modules\.cache") {
    Remove-Item "node_modules\.cache" -Recurse -Force
    Write-Host "✅ Cleaned node_modules cache" -ForegroundColor Green
}

Write-Host "🚀 TypeScript server restart complete!" -ForegroundColor Green
Write-Host "📝 Now restart your VS Code TypeScript server with Ctrl+Shift+P > 'TypeScript: Restart TS Server'" -ForegroundColor Cyan
