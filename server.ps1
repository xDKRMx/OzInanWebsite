# Simple PowerShell HTTP Server
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()

$currentDir = Get-Location
Write-Host "HTTP Server running at http://localhost:8080/"
Write-Host "Serving files from $currentDir"
Write-Host "Press Ctrl+C to stop the server"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        $localPath = $localPath.TrimStart('/')
        
        if ([string]::IsNullOrEmpty($localPath)) {
            $localPath = 'index.html'
        }
        
        $filePath = Join-Path $currentDir $localPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $contentType = 'text/plain'
            
            if ($filePath -match '\.html$') { $contentType = 'text/html' }
            elseif ($filePath -match '\.css$') { $contentType = 'text/css' }
            elseif ($filePath -match '\.js$') { $contentType = 'application/javascript' }
            elseif ($filePath -match '\.(jpg|jpeg)$') { $contentType = 'image/jpeg' }
            elseif ($filePath -match '\.png$') { $contentType = 'image/png' }
            elseif ($filePath -match '\.gif$') { $contentType = 'image/gif' }
            elseif ($filePath -match '\.svg$') { $contentType = 'image/svg+xml' }
            elseif ($filePath -match '\.mp4$') { $contentType = 'video/mp4' }
            
            $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $fileBytes.Length
            $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $response.StatusCode = 404
            $responseString = "<h1>404 - File Not Found</h1><p>The file $localPath was not found.</p>"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($responseString)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
}
