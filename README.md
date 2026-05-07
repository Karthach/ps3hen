# PS3HEN Host (v1.2.1)

Host para instalar PS3 HEN (Homebrew Enabler) desde el navegador de la PlayStation 3. Soporta versiones de firmware 4.88 a 4.93.

## Características

- Interfaz con pestañas para el instalador y aplicaciones.
- Detección de versión de firmware y estado de HEN.
- Soporte offline mediante AppCache.
- Reintento automático si falla el exploit.
- Motor ROP centralizado (rop_core.js).
- Catálogo de aplicaciones básicas:
  - MultiMAN (MOD): Gestor de archivos.
  - Webman Mod: Control de ventilador y carga de juegos.
  - IrisMan: Gestor de archivos con soporte NTFS.
  - Apollo Save Tool: Gestión de partidas.
  - ManaGunZ: Gestor de backups.
  - PKGi PS3: Descarga de contenido.

## Estructura

- `index.html`: Página principal.
- `offline.appcache`: Archivo para uso sin conexión.
- `/[versión]/`: Archivos específicos para cada firmware.
- `/hen/`: Lógica central (rop_core.min.js) y estilos (style.min.css).

## Uso

1. Abre el navegador en la PS3 y entra a la URL.
2. Espera a que cargue la caché para modo offline.
3. Pulsa "Instalar HEN".
4. Si el exploit falla, la página se recargará sola hasta funcionar.
5. Sigue las instrucciones para instalar el archivo .P3T.

## Requisitos

- Firmware Híbrido (HFW) 4.88 - 4.93.
- Limpiar cookies y caché del navegador si hay errores persistentes.

## Créditos

- Team PS3Xploit (esc0rtd3w, Joonie, habib, W).
- Desarrolladores: deank, aldostools, bucanero, Zarh.
- Investigación: xerpi, mysis.
- Traducciones: López Tutoriales.
