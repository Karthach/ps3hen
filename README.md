# PS3HEN Auto-Instalador Avanzado

Este repositorio aloja un host optimizado para la instalación de PS3 HEN (Homebrew Enabler) directamente desde el navegador de la PlayStation 3.

## Características
- Dashboard Moderno: Interfaz oscura y minimalista compatible con el navegador antiguo de PS3.
- Detección Automática: Identifica la versión de firmware y resolución de la consola.
- Estabilidad Mejorada: Ejecución manual del exploit mediante botón para evitar bloqueos (freezes) de memoria.
- Soporte de Versiones: Compatible con firmwares HFW desde 4.88 hasta 4.93.

## Estructura del Proyecto
- index.html: Dashboard principal y detector de sistema.
- /[versión]/: Carpetas específicas por firmware (ej: 4.93/) que contienen:
  - index.html: Lógica ROP y lanzador del exploit.
  - HEN.P3T: Payload de HEN empaquetado como archivo de tema.
- /hen/: Librerías JavaScript base para el proceso de explotación.

## Instrucciones de Uso
1. Sube estos archivos a un servidor web (GitHub Pages, VPS, etc.).
2. En tu PS3, abre el navegador y navega a la URL de tu host.
3. El dashboard detectará tu versión. Pulsa en "Instalar HEN".
4. En la siguiente página, pulsa "Ejecutar Exploit" y espera a que el proceso termine.
5. Sigue las instrucciones en pantalla para reiniciar la consola o instalar el archivo .p3t.

## Requisitos
- Tener instalado un Firmware Híbrido (HFW) correspondiente a la versión que intentas instalar.
- Conexión a internet estable en la consola.

## Créditos
Este proyecto se basa en la investigación y herramientas de la comunidad de PS3Xploit:
- **Team PS3Xploit:** esc0rtd3w, Joonie, habib, W.
- **Contribuciones Clave:** xerpi (exploit de memoria), mysis (vsh/lv2), aldostools, zecoxao.
- **Traducciones:** López Tutoriales.
