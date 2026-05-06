# PS3HEN Auto-Instalador Profesional (v1.2.0)

Este repositorio aloja un host de alto rendimiento y máxima estabilidad para la instalación de **PS3 HEN (Homebrew Enabler)** directamente desde el navegador de la PlayStation 3. Ha sido rediseñado con una arquitectura moderna y resiliente para garantizar el éxito de la instalación incluso en condiciones de memoria crítica.

## 🚀 Características Principales

- **Dashboard por Pestañas:** Interfaz organizada con secciones dedicadas para el **Instalador** y un catálogo de **Aplicaciones**.
- **Detección Dinámica de HEN:** El sistema detecta automáticamente si HEN ya está activo en tu consola y te ofrece la opción de "Reinstalar" si es necesario.
- **Modo Offline Total (AppCache):** Tras cargar la página una vez con internet, el host completo se guarda en la memoria interna de la PS3. Puedes habilitar HEN en el futuro **sin conexión a internet**.
- **Auto-Reintento Inteligente:** Si el exploit falla debido a la fragmentación de la memoria RAM (común en PS3), la página se **recarga automáticamente hasta 3 veces** para buscar un hueco de memoria limpio, eliminando la necesidad de intervención manual.
- **Arquitectura Unificada (ROP Core):** Lógica de explotación centralizada en un motor único (`rop_core.js`). Esto garantiza una ejecución idéntica y depurada en todas las versiones de firmware.
- **Optimización Extrema de RAM:** Todo el código JavaScript y CSS está minificado para reducir el consumo de recursos, aumentando drásticamente la tasa de éxito del ROP chain.
- **Catálogo de Homebrew Imprescindible:** Acceso directo a las versiones oficiales y más estables de herramientas vitales:
  - **MultiMAN (MOD):** Gestor de archivos y backups.
  - **Webman Mod:** Control de ventilador y carga rápida.
  - **IrisMan:** Soporte avanzado para NTFS.
  - **Apollo Save Tool:** Gestión de partidas guardadas.
  - **ManaGunZ:** Alternativa potente de backup manager.
  - **PKGi PS3:** Descarga de contenido directamente en la consola.

## 📁 Estructura del Proyecto

- `index.html`: Dashboard principal con sistema de pestañas y detección de sistema.
- `offline.appcache`: Manifiesto para el soporte de uso sin internet.
- `/[versión]/`: Lógica ROP específica y payloads para cada firmware (4.88 - 4.93).
- `/hen/`: 
  - `rop_core.min.js`: El motor central de explotación (unificado y minificado).
  - `style.min.css`: Estilos visuales optimizados para el navegador NetFront.

## 🛠️ Instrucciones de Uso

1. **Acceso:** Abre el navegador de tu PS3 y escribe la URL de tu host.
2. **Sincronización:** Espera unos segundos a que la PS3 guarde la página para el modo offline (verás el indicador de carga del navegador).
3. **Instalación:** El dashboard detectará tu versión. Pulsa en **"Instalar HEN"**.
4. **Ejecución:** En la página del exploit, pulsa **"Ejecutar Exploit"**. Si falla, no toques nada; el sistema reintentará solo.
5. **Finalización:** Una vez descargado el archivo `.P3T`, sigue las instrucciones en pantalla para aplicarlo desde el menú de Temas o el Administrador de PKG.

## 📋 Requisitos

- Consola con **Firmware Híbrido (HFW)** instalado (versiones 4.88 a 4.93 soportadas).
- Se recomienda limpiar las Cookies y la Caché del navegador antes del primer uso para una tasa de éxito del 100%.

## 🤝 Créditos y Agradecimientos

Este proyecto es una evolución basada en el trabajo incansable de los pioneros de la escena PS3:
- **Team PS3Xploit:** esc0rtd3w, Joonie, habib, W.
- **Desarrolladores Clave:** deank (MultiMAN), aldostools (Webman Mod/IrisMan), bucanero (Apollo/PKGi), Zarh (ManaGunZ).
- **Investigación:** xerpi, mysis.
- **Traducciones y Soporte:** López Tutoriales.
