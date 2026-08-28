$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = 'C:/Users/Tri/Desktop/wedding-invitation'
$hero = [System.Drawing.Image]::FromFile("$root/images/hero.jpg")
$out = Join-Path $root 'og-preview'
New-Item -ItemType Directory -Force -Path $out | Out-Null
$W = 1200; $H = 630

$cream    = [System.Drawing.Color]::FromArgb(253,250,243)
$brown    = [System.Drawing.Color]::FromArgb(84,64,52)
$goldLine = [System.Drawing.Color]::FromArgb(200,176,128)

$fScript = New-Object System.Drawing.Font('Georgia',34,[System.Drawing.FontStyle]::Bold)
$fSerifD = New-Object System.Drawing.Font('Georgia',50,[System.Drawing.FontStyle]::Bold)

$sfR = New-Object System.Drawing.StringFormat
$sfR.Alignment = 'center'; $sfR.LineAlignment = 'center'

# Tiếng Việt qua unicode escape
$tT1 = [char]0x54+[char]0x68+[char]0x69+[char]0x1EC7+[char]0x70+' '+[char]0x4D+[char]0x1EDD+[char]0x69+' '+[char]0x43+[char]0x1B0+[char]0x1EDB+[char]0x69
$tBT = [char]0x42+[char]0x1EA3+[char]0x6F+' '+[char]0x54+[char]0x72+[char]0xE2+[char]0x6E
$tMT = [char]0x4D+[char]0x69+[char]0x6E+[char]0x68+' '+[char]0x54+[char]0x72+[char]0xED

function DrawText($g,$t,$f,$c,$x,$y,$px,$py){
  $br = New-Object System.Drawing.SolidBrush($c)
  $r = New-Object System.Drawing.RectangleF($x,$y,$px,$py)
  $g.DrawString($t,$f,$br,$r,$sfR)
  $br.Dispose()
}
function DrawCover($g,$img,$dx,$dy,$dw,$dh){
  $s = [Math]::Max($dw/$img.Width,$dh/$img.Height)
  $w = [Math]::Floor($img.Width*$s); $h = [Math]::Floor($img.Height*$s)
  $x = [Math]::Floor($dx-($w-$dw)/2); $y = [Math]::Floor($dy-($h-$dh)/2)
  $g.DrawImage($img,$x,$y,$w,$h)
}
function SaveJ($bmp,$name,$q){
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]$q)
  $bmp.Save((Join-Path $out $name),$enc,$ep); $bmp.Dispose()
  Write-Output ('OK '+$name)
}

# ---- MẪU 1 FINAL: bỏ thời gian, bo góc ảnh 30px, viền vàng mảnh, text căn giữa thoáng ----
$b = New-Object System.Drawing.Bitmap($W,$H); $g = [System.Drawing.Graphics]::FromImage($b)
$g.Clear($cream)
$g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$pen = New-Object System.Drawing.Pen($goldLine); $pen.Width = 2
$g.DrawRectangle($pen,22,22,$W-44,$H-44)

$imgX=70; $imgY=55; $imgW=430; $imgH=518
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
[void]$path.AddArc($imgX,$imgY,30,30,180,90)
[void]$path.AddArc($imgX+$imgW-30,$imgY,30,30,270,90)
[void]$path.AddArc($imgX+$imgW-30,$imgY+$imgH-30,30,30,0,90)
[void]$path.AddArc($imgX,$imgY+$imgH-30,30,30,90,90); [void]$path.CloseFigure()
$g.SetClip($path)
DrawCover $g $hero $imgX $imgY $imgW $imgH
$g.ResetClip()

$textX = 570; $textW = 560
$g.DrawString($tT1, $fScript, (New-Object System.Drawing.SolidBrush($goldLine)), (New-Object System.Drawing.RectangleF($textX,90,$textW,55)), $sfR)
$linePen = New-Object System.Drawing.Pen($goldLine); $linePen.Width = 1
$g.DrawLine($linePen, 620, 175, 620+560-100, 175)

DrawText $g $tBT $fSerifD $brown $textX 230 $textW 90
DrawText $g $tMT $fSerifD $brown $textX 345 $textW 90

SaveJ $b 'mau1-final.jpg' 95
$hero.Dispose()
Write-Output 'DONE'