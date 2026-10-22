# Script de deploy FTP para Kratux (Locaweb)
param(
    [string[]]$Files
)

$credentialsPath = Join-Path $PSScriptRoot ".ftp-credentials"
if (-not (Test-Path $credentialsPath)) {
    Write-Host "Arquivo .ftp-credentials nao encontrado!" -ForegroundColor Yellow
    Write-Host "Crie o arquivo .ftp-credentials na pasta com:" -ForegroundColor Cyan
    Write-Host "FTP_HOST=..."
    Write-Host "FTP_USER=..."
    Write-Host "FTP_PASS=..."
    Write-Host "FTP_REMOTE_DIR=public_html"
    exit 1
}

$envLines = Get-Content $credentialsPath
$creds = @{}
foreach ($line in $envLines) {
    if ($line -match "^\s*([A-Za-z0-9_]+)\s*=\s*['`"]?(.*?)['`"]?\s*$") {
        $creds[$matches[1]] = $matches[2]
    }
}

$env:FTP_HOST = $creds["FTP_HOST"]
$env:FTP_PORT = if ($creds["FTP_PORT"]) { $creds["FTP_PORT"] } else { "21" }
$env:FTP_USER = $creds["FTP_USER"]
$env:FTP_PASS = $creds["FTP_PASS"]
$env:FTP_DIR  = if ($creds["FTP_REMOTE_DIR"]) { $creds["FTP_REMOTE_DIR"] } else { "public_html" }
$env:DEPLOY_FILES = if ($Files) { $Files -join "," } else { "" }

python -c "
import os, ftplib

host = os.environ['FTP_HOST']
port = int(os.environ.get('FTP_PORT', 21))
user = os.environ['FTP_USER']
passwd = os.environ['FTP_PASS']
remote_dir = os.environ['FTP_DIR'].strip('/')
files_env = os.environ.get('DEPLOY_FILES', '')

local_base = os.path.join(r'$($PSScriptRoot -replace '\\', '\\')', 'site-producao-locaweb')

if files_env:
    files = [f.strip() for f in files_env.split(',') if f.strip()]
else:
    files = ['index.html']

print(f'Conectando a {host}:{port}...')

# Tenta FTPS primeiro, fallback para FTP normal
ftp = None
try:
    print('Tentando FTPS...')
    ftp = ftplib.FTP_TLS()
    ftp.connect(host, port, timeout=15)
    ftp.login(user, passwd)
    ftp.prot_p()
    print('[OK] Conectado via FTPS.')
except Exception as e:
    print(f'FTPS falhou ({e}), tentando FTP padrao...')
    ftp = ftplib.FTP()
    ftp.connect(host, port, timeout=15)
    ftp.login(user, passwd)
    print('[OK] Conectado via FTP padrao.')

# Navega até o diretório remoto
if remote_dir:
    try:
        ftp.cwd(remote_dir)
        print(f'Diretorio remoto alterado para: {remote_dir}')
    except Exception as e:
        print(f'Aviso ao acessar {remote_dir}: {e}. Tentando continuar na raiz...')

for f in files:
    lpath = os.path.join(local_base, f)
    if not os.path.exists(lpath):
        print(f'[AVISO] Arquivo local nao encontrado: {lpath}')
        continue
    print(f'Enviando {f}...')
    with open(lpath, 'rb') as fp:
        ftp.storbinary(f'STOR {f}', fp)
    print(f'[OK] {f} enviado com sucesso!')

ftp.quit()
print('Deploy finalizado com sucesso!')
"
