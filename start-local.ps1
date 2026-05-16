$ErrorActionPreference = "Stop"

# 简易离线本地静态服务器（无需 Python/Node），用于避免浏览器 file:// 场景下的贴图像素读取限制
$port = 8733
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

function Get-MimeType([string]$path) {
  switch -Regex ($path.ToLower()) {
    "\.html$" { return "text/html; charset=utf-8" }
    "\.js$"   { return "text/javascript; charset=utf-8" }
    "\.css$"  { return "text/css; charset=utf-8" }
    "\.png$"  { return "image/png" }
    "\.jpg$"  { return "image/jpeg" }
    "\.jpeg$" { return "image/jpeg" }
    "\.gif$"  { return "image/gif" }
    "\.svg$"  { return "image/svg+xml" }
    "\.json$" { return "application/json; charset=utf-8" }
    "\.mp3$"  { return "audio/mpeg" }
    "\.wav$"  { return "audio/wav" }
    default   { return "application/octet-stream" }
  }
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://127.0.0.1:$port/"
$listener.Prefixes.Add($prefix)
$listener.Start()

Start-Process "$prefix"
Write-Host "Mood Earth 本地离线服务器已启动：$prefix"
Write-Host "请保持此窗口打开；关闭窗口即可停止。"

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  try {
    $req = $ctx.Request
    $res = $ctx.Response
    $path = $req.Url.AbsolutePath.TrimStart("/")
    if ([string]::IsNullOrWhiteSpace($path)) { $path = "index.html" }

    # 防止目录穿越
    $full = [System.IO.Path]::GetFullPath((Join-Path $root $path))
    if (-not $full.StartsWith([System.IO.Path]::GetFullPath($root))) {
      $res.StatusCode = 403
      $res.Close()
      continue
    }

    if (-not (Test-Path $full -PathType Leaf)) {
      $res.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
      $res.ContentType = "text/plain; charset=utf-8"
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
      $res.Close()
      continue
    }

    $bytes = [System.IO.File]::ReadAllBytes($full)
    $res.StatusCode = 200
    $res.ContentType = (Get-MimeType $full)
    $res.AddHeader("Cache-Control", "no-store")
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
    $res.Close()
  } catch {
    try { $ctx.Response.StatusCode = 500; $ctx.Response.Close() } catch {}
  }
}

