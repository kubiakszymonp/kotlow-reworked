# Sanktuarium Kotłów - Parafia Website

Aplikacja internetowa parafii w Kotłowie zbudowana w Next.js i Strapi 5.

## 🏗️ Architektura

- **Frontend**: Next.js 14 z TypeScript i Tailwind CSS
- **Backend**: Strapi 5 (Headless CMS)
- **Reverse Proxy**: Nginx z SSL
- **Containerization**: Docker & Docker Compose

## 🚀 Szybki start

### Wymagania

- Docker
- Docker Compose
- Certyfikaty SSL (cert.pem i key.pem)

### Instalacja

1. **Sklonuj repozytorium**
   ```bash
   git clone <repository-url>
   cd kotlow
   ```

2. **Skonfiguruj certyfikaty SSL**
   ```bash
   mkdir certs
   # Umieść cert.pem i key.pem w folderze certs/
   ```

3. **Skonfiguruj zmienne środowiskowe**
   ```bash
   cp backend/env.example backend/.env
   # Edytuj backend/.env z odpowiednimi wartościami
   ```

4. **Uruchom aplikację**
   ```bash
   docker-compose up -d
   ```

## 📁 Struktura projektu

```
kotlow/
├── frontend/                 # Next.js aplikacja
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/                  # Strapi CMS
│   ├── src/
│   ├── Dockerfile
│   └── .env
├── nginx.conf               # Konfiguracja Nginx
├── docker-compose.yml       # Docker Compose
└── README.md
```

## 🌐 Dostęp do aplikacji

- **Strona główna**: https://sanktuariumkotlow.pl
- **Panel admina**: https://admin.sanktuariumkotlow.pl
- **API**: https://sanktuariumkotlow.pl/api

## 🔧 Konfiguracja

### Nginx

Nginx działa jako reverse proxy i obsługuje:
- Przekierowanie HTTP → HTTPS
- Routing do Next.js (frontend)
- Routing do Strapi (/admin, /api)
- SSL/TLS
- Security headers

### Strapi

Strapi jest skonfigurowany z:
- SQLite database
- File uploads
- Admin panel
- REST API
- CORS dla domeny sanktuariumkotlow.pl

### Next.js

Next.js jest skonfigurowany z:
- Standalone output dla Docker
- TypeScript
- Tailwind CSS
- SCSS modules
- SEO optimization

## 🛠️ Komendy

```bash
# Uruchom wszystkie serwisy
docker-compose up -d

# Zatrzymaj wszystkie serwisy
docker-compose down

# Przebuduj i uruchom
docker-compose up -d --build

# Zobacz logi
docker-compose logs -f

# Zobacz logi konkretnego serwisu
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f nginx
```

## 🔒 Bezpieczeństwo

- Wszystkie połączenia są szyfrowane SSL/TLS
- Security headers w Nginx
- Non-root users w kontenerach
- CORS skonfigurowany dla domeny
- JWT secrets w zmiennych środowiskowych

## 📝 Zmienne środowiskowe

### Backend (.env)

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
JWT_SECRET=your-jwt-secret-here
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=./data.db
CORS_ORIGIN=https://sanktuariumkotlow.pl,https://www.sanktuariumkotlow.pl
ADMIN_PATH=/admin
ADMIN_EMAIL=admin@sanktuariumkotlow.pl
ADMIN_PASSWORD=your-admin-password-here
```

## 🚀 Deployment

1. **Przygotuj serwer**
   - Zainstaluj Docker i Docker Compose
   - Skonfiguruj certyfikaty SSL
   - Skonfiguruj DNS (A record na IP serwera)

2. **Wdróż aplikację**
   ```bash
   git clone <repository>
   cd kotlow
   # Skonfiguruj .env i certyfikaty
   docker-compose up -d
   ```

3. **Sprawdź działanie**
   - https://sanktuariumkotlow.pl
   - https://admin.sanktuariumkotlow.pl

## 🔧 Troubleshooting

### Problem z certyfikatami
```bash
# Sprawdź czy certyfikaty są w folderze certs/
ls -la certs/
```

### Problem z uprawnieniami
```bash
# Sprawdź uprawnienia do plików
chmod 600 certs/*
```

### Problem z portami
```bash
# Sprawdź czy porty są wolne
netstat -tulpn | grep :80
netstat -tulpn | grep :443
```

## 📞 Kontakt

Parafia Rzymsko-katolicka w Kotłowie
- Telefon: 573 791 098
- Email: admin@sanktuariumkotlow.pl 