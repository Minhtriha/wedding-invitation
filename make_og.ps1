$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = 'C:/Users/Tri/Desktop/wedding-invitation'
$hero = [System.Drawing.Image]::FromFile("$root/images/hero.jpg")
$out = Join-Path $root 'og-preview'
New-Item -ItemType Directory -Force -Path $out | Out-Null
$W = 1200; $H = 630

$cream    = [System.Drawing.Color]::FromArgb(253,250,243)
$creamDark= [System.Drawing.Color]::FromArgb(240,230,210)
$brown    = [System.Drawing.Color]::FromArgb(90,70,60)
$gold     = [System.Drawing.Color]::FromArgb(186,150,90)
$white    = [System.Drawing.Color]::White

$fScript = New-Object System.Drawing.Font('Georgia',40,[System.Drawing.FontStyle]::Bold)
$fSerif  = New-Object System.Drawing.Font('Georgia',52,[System.Drawing.FontStyle]::Bold)
$fSmall  = New-Object System.Drawing.Font('Segoe UI',22)

$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = 'center'; $sf.LineAlignment = 'center'

# Biến hoá tiếng Việt an toàn (tránh lỗi encoding)
$tT1   = [char]0x54 + [char]0x68 + [char]0x69 + [char]0x1EC7 + [char]0x70 + ' ' + [char]0x4D + [char]0x1EDD + [char]0x69 + ' ' + [char]0x43 + [char]0x1B0 + [char]0x1EDB + [char]0x69   # Thiệp Mời Cưới
$tBT   = [char]0x42 + [char]0x1EA3 + [char]0x6F + ' ' + [char]0x54 + [char]0x72 + [char]0xE2 + [char]0x6E   # Bảo Trân
$tMT   = [char]0x4D + [char]0x69 + [char]0x6E + [char]0x68 + ' ' + [char]0x54 + [char]0x72 + [char]0xED   # Minh Trí
$tDate = '19.09.2026 ' + [char]0xB7 + ' 09:00'

function DrawText($g,$t,$f,$c,$x,$y,$px,$py){
  $br = New-Object System.Drawing.SolidBrush($c)
  $r = New-Object System.Drawing.RectangleF($x,$y,$px,$py)
  $g.DrawString($t,$f,$br,$r,$sf)
  $br.Dispose()
}
function DrawCover($g,$img,$dx,$dy,$dw,$dh){
  $s = [Math]::Max($dw/$img.Width,$dh/$img.Height)
  $w = [Math]::Floor($img.Width*$s); $h = [Math]::Floor($img.Height*$s)
  $x = [Math]::Floor($dx-($w-$dw)/2); $y = [Math]::Floor($dy-($h-$dh)/2)
  $g.DrawImage($img,$x,$y,$w,$h)
}
function SaveJ($bmp,$name){
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]92)
  $bmp.Save((Join-Path $out $name),$enc,$ep); $bmp.Dispose()
  Write-Output ('OK '+$name)
}

# ---- MẪU 1 ----
$b1 = New-Object System.Drawing.Bitmap($W,$H); $g1 = [System.Drawing.Graphics]::FromImage($b1)
$g1.Clear($cream)
$pen = New-Object System.Drawing.Pen($gold); $g1.DrawRectangle($pen,20,20,$W-40,$H-40)
DrawCover $g1 $hero 90 60 500 500
DrawText $g1 $tT1 $fScript $brown 650 120 480 60
DrawText $g1 $tBT $fSerif $brown 650 200 480 90
DrawText $g1 '&' $fScript $gold 650 290 480 60
DrawText $g1 $tMT $fSerif $brown 650 340 480 90
DrawText $g1 $tDate $fSmall $gold 650 470 480 50
SaveJ $b1 'mau1-classic.jpg'

# ---- MẪU 2 ----
$b2 = New-Object System.Drawing.Bitmap($W,$H); $g2 = [System.Drawing.Graphics]::FromImage($b2)
DrawCover $g2 $hero 0 0 $W $H
$ov = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150,0,0,0)); $g2.FillRectangle($ov,0,0,$W,$H)
DrawText $g2 $tT1 $fScript $white 0 90 $W 70
DrawText $g2 $tBT $fSerif $cream 0 190 $W 110
DrawText $g2 '&' $fScript $gold 0 300 $W 60
DrawText $g2 $tMT $fSerif $cream 0 350 $W 110
DrawText $g2 $tDate $fSmall $cream 0 480 $W 60
SaveJ $b2 'mau2-fullbleed.jpg'

# ---- MẪU 3 ----
$b3 = New-Object System.Drawing.Bitmap($W,$H); $g3 = [System.Drawing.Graphics]::FromImage($b3)
$g3.Clear($creamDark)
$g3.FillRectangle((New-Object System.Drawing.SolidBrush($white)),40,40,$W-80,$H-80)
DrawCover $g3 $hero 100 100 420 420
DrawText $g3 $tT1 $fScript $gold 100 60 ($W-200) 50
DrawText $g3 $tBT $fSerif $brown 590 190 520 100
DrawText $g3 $tMT $fSerif $brown 590 300 520 100
DrawText $g3 $tDate $fSmall $gold 590 440 520 50
SaveJ $b3 'mau3-framed.jpg'

# ---- MẪU 4 ----
$b4 = New-Object System.Drawing.Bitmap($W,$H); $g4 = [System.Drawing.Graphics]::FromImage($b4)
DrawCover $g4 $hero 0 0 $W $H
$padY = [int]($H-260)
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Rectangle(0,$padY,$W,260)),[System.Drawing.Color]::FromArgb(0,0,0,0),[System.Drawing.Color]::FromArgb(230,0,0,0),[System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$g4.FillRectangle($grad,0,$padY,$W,260)
DrawText $g4 $tT1 $fScript $cream 0 340 $W 60
DrawText $g4 ($tBT + ' & ' + $tMT) $fSerif $white 0 410 $W 100
DrawText $g4 $tDate $fSmall $cream 0 540 $W 50
SaveJ $b4 'mau4-gradient.jpg'

# ---- MẪU 5 ----
$b5 = New-Object System.Drawing.Bitmap($W,$H); $g5 = [System.Drawing.Graphics]::FromImage($b5)
$g5.Clear($white)
$g5.DrawImage($hero,40,40,300,450)
$g5.FillRectangle((New-Object System.Drawing.SolidBrush($gold)),0,90,6,240)
DrawText $g5 $tT1 $fScript $gold 380 120 760 70
DrawText $g5 $tBT $fSerif $brown 380 220 760 90
DrawText $g5 '&' $fScript $gold 380 310 760 50
DrawText $g5 $tMT $fSerif $brown 380 360 760 90
DrawText $g5 $tDate $fSmall $gold 380 480 760 50
SaveJ $b5 'mau5-clean.jpg'

$hero.Dispose()
Write-Output 'DONE'
