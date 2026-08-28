$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = 'C:/Users/Tri/Desktop/wedding-invitation'
$hero = [System.Drawing.Image]::FromFile("$root/images/hero.jpg")
$out = Join-Path $root 'og-preview'
New-Item -ItemType Directory -Force -Path $out | Out-Null
$W = 1200; $H = 630

$cream    = [System.Drawing.Color]::FromArgb(253,250,243)
$brown    = [System.Drawing.Color]::FromArgb(84,64,52)
$brownSoft= [System.Drawing.Color]::FromArgb(150,120,100)
$gold     = [System.Drawing.Color]::FromArgb(179,138,82)
$white    = [System.Drawing.Color]::White
$goldLine = [System.Drawing.Color]::FromArgb(200,176,128)

$fScript = New-Object System.Drawing.Font('Georgia',34,[System.Drawing.FontStyle]::Bold)
$fSerifD = New-Object System.Drawing.Font('Georgia',50,[System.Drawing.FontStyle]::Bold)
$fSmall  = New-Object System.Drawing.Font('Segoe UI',20,[System.Drawing.FontStyle]::Regular)
$fDate   = New-Object System.Drawing.Font('Segoe UI',24,[System.Drawing.FontStyle]::Bold)

$sfL = New-Object System.Drawing.StringFormat
$sfL.Alignment = 'center'; $sfL.LineAlignment = 'center'
$sfR = New-Object System.Drawing.StringFormat
$sfR.Alignment = 'center'; $sfR.LineAlignment = 'center'

# Tiếng Việt qua unicode escape
$tT1 = [char]0x54+[char]0x68+[char]0x69+[char]0x1EC7+[char]0x70+' '+[char]0x4D+[char]0x1EDD+[char]0x69+' '+[char]0x43+[char]0x1B0+[char]0x1EDB+[char]0x69   # Thiệp Mời Cưới
$tBT = [char]0x42+[char]0x1EA3+[char]0x6F+' '+[char]0x54+[char]0x72+[char]0xE2+[char]0x6E   # Bảo Trân
$tMT = [char]0x4D+[char]0x69+[char]0x6E+[char]0x68+' '+[char]0x54+[char]0x72+[char]0xED   # Minh Trí
$tDate = '19.09.2026 ' + [char]0xB7 + ' 09:00'

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

# ---- MẪU 1 TINH CHỈNH ----
$b = New-Object System.Drawing.Bitmap($W,$H); $g = [System.Drawing.Graphics]::FromImage($b)
$g.Clear($cream)
$g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Khung viền vàng mảnh
$pen = New-Object System.Drawing.Pen($goldLine); $pen.Width = 2
$g.DrawRectangle($pen,22,22,$W-44,$H-44)

# Ảnh hero - khối trái, bo phần top, giữ đầu
$imgX=70; $imgY=55; $imgW=430; $imgH=518
# clip theo hình tròn nhẹ ở cạnh (bo góc)
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddArc($imgX,$imgY,30,30,180,90); $path.AddArc($imgX+$imgW-30,$imgY,30,30,270,90)
$path.AddArc($imgX+$imgW-30,$imgY+$imgH-30,30,30,0,90); $path.AddArc($imgX,$imgY+$imgH-30,30,30,90,90); $path.CloseFigure()
$g.SetClip($path)
DrawCover $g $hero $imgX $imgY $imgW $imgH
$g.ResetClip()

# Cột text phải
$textX = 570; $textW = 560

# Dòng "Thiệp Mời Cưới" - script nhỏ, có gạch nhỏ mờ hai bên
$g.DrawString($tT1, $fScript, (New-Object System.Drawing.SolidBrush($gold)), (New-Object System.Drawing.RectangleF($textX,90,$textW,55)), $sfR)

# Gạch trang trí ngắn giữa
$linePen = New-Object System.Drawing.Pen($goldLine); $linePen.Width = 1
$g.DrawLine($linePen, 620, 175, 620+560-100, 175)

# "Bảo Trân" lớn
DrawText $g $tBT $fSerifD $brown $textX 195 $textW 85
# "Minh Trí" lớn
DrawText $g $tMT $fSerifD $brown $textX 295 $textW 85

# Gạch thứ 2
$g.DrawLine($linePen, 620, 405, 620+560-4-100, 405)

# Ngày giờ
DrawText $g $tDate $fDate $brownSoft $textX 430 $textW 60

SaveJ $b 'mau1-final.jpg' 95
$hero.Dispose()
Write-Output 'DONE'
