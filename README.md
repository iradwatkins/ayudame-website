# Ayudame - Sitio Web Coming Soon

## 🌐 Descripción
Página "Coming Soon" para Ayudame.com.do - Una plataforma de ayuda mutua y colaboración comunitaria en República Dominicana.

## 🎨 Características
- Diseño inspirado en los colores de República Dominicana
- Contador regresivo hasta el lanzamiento (27 de Noviembre, 2025)
- Bilingüe (Español/Inglés) con Español por defecto
- Formulario de registro para notificaciones
- Animaciones de partículas flotantes
- Totalmente responsivo
- Enlaces a redes sociales

## 📁 Estructura del Proyecto
```
ayudame-website/
├── index.html       # Página principal
├── css/
│   └── styles.css   # Estilos y animaciones
├── js/
│   ├── countdown.js # Contador regresivo
│   ├── particles.js # Animación de partículas
│   └── language.js  # Cambio de idioma
├── images/
│   └── favicon.svg  # Ícono del sitio
└── deploy.sh        # Script de despliegue
```

## 🚀 Instalación Local

1. Clonar o descargar los archivos
2. Abrir `index.html` en el navegador
3. O servir con un servidor local:
   ```bash
   python3 -m http.server 8080
   # Visitar http://localhost:8080
   ```

## 🌍 Despliegue a Producción

1. Actualizar las credenciales del VPS en `deploy.sh`:
   - `VPS_HOST`: IP del servidor
   - `VPS_PASS`: Contraseña del servidor

2. Ejecutar el script de despliegue:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. Configurar DNS para apuntar ayudame.com.do a la IP del VPS

4. Instalar certificado SSL:
   ```bash
   certbot --nginx -d ayudame.com.do -d www.ayudame.com.do
   ```

## 🎯 Plan Gratuito
Este es un sitio web de plan gratuito - sin costo para el cliente.

## 📧 Correos Registrados
Los correos se almacenan temporalmente en localStorage. En producción, deberían enviarse a un servidor.

## 🇩🇴 Hecho con amor en República Dominicana