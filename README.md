# Social Auth with Refresh Tokens - NestJS + Next.js

## Architecture

Ce projet implémente un système d'authentification complet avec :
- **Backend NestJS** (port 3000) : API avec auth locale + Google OAuth
- **Frontend Next.js** (port 3001) : Interface utilisateur avec Server Components

## Structure du projet

```
├── src/                    # Backend NestJS
├── frontend/               # Frontend Next.js
├── docker-compose.yaml     # MongoDB + services
└── README.md              # Ce fichier
```

## 🚀 Démarrage rapide

### 1. Backend (NestJS)
```bash
# Installer les dépendances
pnpm install

# Démarrer MongoDB
docker-compose up -d

# Variables d'environnement requises (.env)
JWT_ACCESS_TOKEN_SECRET=your_access_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
JWT_ACCESS_TOKEN_EXPIRATION_MS=3600000
JWT_REFRESH_TOKEN_EXPIRATION_MS=604800000
GOOGLE_AUTH_CLIENT_ID=your_google_client_id
GOOGLE_AUTH_CLIENT_SECRET=your_google_client_secret
GOOGLE_AUTH_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Démarrer le serveur
pnpm run start:dev
```

### 2. Frontend (Next.js)
```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur (port 3001)
npm run dev
```

## 🔐 Fonctionnalités d'authentification

### Endpoints Backend
- `POST /auth/login` - Connexion locale
- `POST /auth/refresh` - Renouvellement des tokens
- `GET /auth/google` - Initier l'auth Google
- `GET /auth/google/callback` - Callback Google
- `GET /users` - Route protégée (exemple)

### Pages Frontend
- `/auth/login` - Formulaire de connexion
- `/` - Page d'accueil (affiche utilisateurs)
- Redirection automatique après auth Google

### Sécurité implémentée
- ✅ Cookies HttpOnly pour les tokens
- ✅ Refresh tokens hashés en base
- ✅ Guards JWT pour routes protégées
- ✅ Validation côté client et serveur
- ✅ Support production (cookies secure)

## Tests

```bash
# Tests unitaires
pnpm run test

# Tests e2e
pnpm run test:e2e

# Couverture de tests
pnpm run test:cov
```
