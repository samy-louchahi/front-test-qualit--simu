# Étape 1 : Construction de l'application React
FROM node:18-alpine AS builder
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Construire l'application (génère le dossier build)
RUN npm run build

# Étape 2 : Image de production avec Nginx pour servir les fichiers statiques
FROM nginx:stable-alpine
# Copier les fichiers générés par la build dans le dossier par défaut de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoute (80 par défaut)
EXPOSE 80

# Lancer Nginx en mode non détaché
CMD ["nginx", "-g", "daemon off;"]
