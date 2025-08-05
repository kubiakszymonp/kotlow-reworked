#!/bin/bash

echo "🚀 Uruchamianie Sanktuarium Kotłów..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker nie jest uruchomiony!"
    exit 1
fi

# Check if certificates exist
if [ ! -f "certs/cert.pem" ] || [ ! -f "certs/key.pem" ]; then
    echo "⚠️  Certyfikaty SSL nie znalezione w folderze certs/"
    echo "   Utwórz folder certs/ i umieść tam cert.pem i key.pem"
    exit 1
fi

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Plik backend/.env nie istnieje!"
    echo "   Skopiuj backend/env.example do backend/.env i skonfiguruj"
    exit 1
fi

echo "✅ Sprawdzanie wymagań zakończone"
echo ""

# Build and start services
echo "🔨 Budowanie i uruchamianie serwisów..."
docker-compose up -d --build

echo ""
echo "✅ Aplikacja uruchomiona!"
echo ""
echo "🌐 Dostępne adresy:"
echo "   - Strona główna: https://sanktuariumkotlow.pl"
echo "   - Panel admina: https://admin.sanktuariumkotlow.pl"
echo ""
echo "📊 Sprawdź status: docker-compose ps"
echo "📋 Zobacz logi: docker-compose logs -f" 