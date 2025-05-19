# Usa una imagen oficial de Node.js como base
FROM node:18

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para la instalación de dependencias
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias
RUN pnpm install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Expone el puerto correcto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["pnpm", "start"]
