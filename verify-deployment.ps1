# Deployment Verification Script
# Run this before deploying to catch common issues

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Pre-Deployment Verification" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$errors = 0
$warnings = 0

# Check 1: Node modules installed
Write-Host "Checking node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✓ node_modules found" -ForegroundColor Green
} else {
    Write-Host "✗ node_modules not found. Run: npm install" -ForegroundColor Red
    $errors++
}

# Check 2: Environment file exists
Write-Host "`nChecking environment variables..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file found" -ForegroundColor Green
    
    # Check for required variables
    $envContent = Get-Content ".env" -Raw
    $requiredVars = @(
        "VITE_FIREBASE_API_KEY",
        "VITE_FIREBASE_AUTH_DOMAIN",
        "VITE_FIREBASE_PROJECT_ID",
        "VITE_FIREBASE_STORAGE_BUCKET",
        "VITE_FIREBASE_MESSAGING_SENDER_ID",
        "VITE_FIREBASE_APP_ID",
        "VITE_GROQ_API_KEY"
    )
    
    foreach ($var in $requiredVars) {
        if ($envContent -match $var) {
            Write-Host "  ✓ $var found" -ForegroundColor Green
        } else {
            Write-Host "  ✗ $var missing" -ForegroundColor Red
            $errors++
        }
    }
} else {
    Write-Host "✗ .env file not found" -ForegroundColor Red
    Write-Host "  Create one from .env.example" -ForegroundColor Yellow
    $warnings++
}

# Check 3: Git status
Write-Host "`nChecking Git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain 2>$null
if ($LASTEXITCODE -eq 0) {
    if ([string]::IsNullOrWhiteSpace($gitStatus)) {
        Write-Host "✓ All changes committed" -ForegroundColor Green
    } else {
        Write-Host "⚠ Uncommitted changes:" -ForegroundColor Yellow
        git status -s
        $warnings++
    }
} else {
    Write-Host "⚠ Not a git repository" -ForegroundColor Yellow
    $warnings++
}

# Check 4: Required files
Write-Host "`nChecking required files..." -ForegroundColor Yellow
$requiredFiles = @(
    "package.json",
    "vite.config.js",
    "vercel.json",
    "src/config/firebase.js",
    "src/services/chatService.js"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✓ $file exists" -ForegroundColor Green
    } else {
        Write-Host "✗ $file missing" -ForegroundColor Red
        $errors++
    }
}

# Check 5: Public folder structure
Write-Host "`nChecking public folder..." -ForegroundColor Yellow
$publicFolders = @(
    "public/featured/card",
    "public/featured/moving",
    "public/memories/about-pransin",
    "public/memories/boyish",
    "public/memories/media",
    "public/memories/gallery"
)

foreach ($folder in $publicFolders) {
    if (Test-Path $folder) {
        $count = (Get-ChildItem $folder -File).Count
        Write-Host "✓ $folder ($count files)" -ForegroundColor Green
    } else {
        Write-Host "✗ $folder missing" -ForegroundColor Red
        $errors++
    }
}

# Check 6: Try to build
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Testing Build" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Running: npm run build`n" -ForegroundColor Yellow
$buildOutput = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build successful!" -ForegroundColor Green
} else {
    Write-Host "✗ Build failed!" -ForegroundColor Red
    Write-Host $buildOutput -ForegroundColor Red
    $errors++
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Summary" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✓ All checks passed! Ready to deploy." -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Push to GitHub: git push origin main" -ForegroundColor White
    Write-Host "2. Go to Vercel Dashboard" -ForegroundColor White
    Write-Host "3. Import your project" -ForegroundColor White
    Write-Host "4. Add environment variables" -ForegroundColor White
    Write-Host "5. Deploy!" -ForegroundColor White
} elseif ($errors -eq 0) {
    Write-Host "⚠ $warnings warning(s) found" -ForegroundColor Yellow
    Write-Host "Review warnings above before deploying" -ForegroundColor Yellow
} else {
    Write-Host "✗ $errors error(s) and $warnings warning(s) found" -ForegroundColor Red
    Write-Host "Fix errors above before deploying" -ForegroundColor Red
}

Write-Host "`nFor detailed deployment guide, see:" -ForegroundColor Cyan
Write-Host "VERCEL_DEPLOYMENT_GUIDE.md`n" -ForegroundColor White
