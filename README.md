# PS3 HEN — Panel y colección (Traducido y organizado)

Última actualización: 2026-01-21T18:44:12.077Z

Descripción
-----------
Proyecto que reúne instaladores y recursos para PS3 HEN (Homebrew ENabler). Esta copia organiza y facilita el acceso a los instaladores HEN, páginas por versión, y utilidades para usar directamente desde el navegador de la PS3.

Características principales
-------------------------
- Listado centralizado de HEN por versión (CEX/DEX y variantes D)
- Interfaz optimizada para el navegador PS3 (botones grandes, detección de firmware)
- RELEASES.json con checksums SHA256 para verificación
- Plantillas y documentación en español para contribuir y reportar problemas
- Workflows de CI para empaquetado (no publica automáticamente si no se desea)

Firmwares compatibles (resumen)
--------------------------------
- CEX OFW: 4.80, 4.81, 4.82
- DEX OFW: 4.82
- HFW (Hybrid Firmware): 4.83.1 → 4.92.1 (varias versiones CEX con HFW)

Instalación (resumen)
---------------------
1. Publica este repositorio o copia la carpeta `hen/` a un servidor accesible desde la PS3 (o usa GitHub Pages con /docs). 
2. Desde la PS3 abre el navegador e ingresa a la URL del instalador (p. ej. `https://<tuusuario>.github.io/<repo>/docs/` o `.../hen/index.html`).
3. Usa el botón "Detectar versión" si tu navegador lo soporta, y selecciona el instalador apropiado para tu FW.

Verificación antes de instalar
------------------------------
- Comprueba el checksum SHA256 del archivo descargado y compáralo con `RELEASES.json` o con el asset .sha256 en cada Release.
- Si se habilita firma GPG en el futuro, verificar la firma antes de ejecutar el instalador en la consola.

Uso desde la PS3
----------------
- Mejor experiencia: añadir la página a favoritos en el navegador de la PS3 y establecerla como página de inicio.
- Si la instalación falla: limpiar caché del navegador, cerrar y abrir de nuevo o seguir las instrucciones de la página de la versión.

Documentación y colaboración
----------------------------
- Consulta `CONTRIBUTING.md` para contribuir en español.
- Usa las plantillas en `.github/ISSUE_TEMPLATE/` para reportar bugs o solicitar mejoras.
- Para cuestiones de seguridad, sigue `SECURITY.md`.

Releases y binarios
-------------------
- Por política los binarios pesados deben publicarse en GitHub Releases (o usar Git LFS). Este repositorio incluye workflows de CI que pueden empaquetar `hen/` y generar checksums.

Licencia
--------
Consulta `LICENSE.txt` en la raíz del repositorio.

Contacto
--------
- Usa Issues para colaboración pública o contacta a los mantenedores según `SECURITY.md` para vulnerabilidades críticas.

Notas finales
------------
- Esta página está orientada a ofrecer una experiencia similar a https://github.com/PS3Xploit/PS3HEN pero localizada y organizada en español.
