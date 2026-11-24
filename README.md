# Web — Abog. Leslie Rivera

Landing page profesional para la abogada Leslie Rivera (ICAP 6996).
HTML + CSS + JavaScript puro, sin dependencias ni build.

## Estructura
```
leslie-rivera-abogada/
├── index.html                  # Página principal (SEO + datos estructurados)
├── politica-de-privacidad.html # Ley 29733 de Protección de Datos Personales
├── 404.html                    # Página de error
├── robots.txt / sitemap.xml    # Indexación en Google
├── site.webmanifest            # Ícono al "agregar a pantalla de inicio"
├── vercel.json                 # URLs limpias, caché y cabeceras de seguridad
├── favicon.ico
├── css/styles.css              # Estilos (variables de color al inicio)
├── js/main.js                  # Menú, animaciones, formulario → WhatsApp, medición
└── assets/
    ├── favicon.svg, apple-touch-icon.png, icon-192/512.png
    └── img/
        ├── leslie-rivera.jpg / .webp  # Foto (reemplazar por una en alta calidad)
        └── og-image.jpg               # Imagen al compartir en WhatsApp/Facebook (1200×630)
```

## ⚠️ Antes de publicar: dominio
Todas las URLs absolutas usan **`https://leslieriveraabogada.com`**.
Si el dominio final es otro, búscalo y reemplázalo en: `index.html`, `politica-de-privacidad.html`,
`robots.txt` y `sitemap.xml` (en VS Code: Ctrl+Shift+H).

## SEO incluido
- Título y descripción con palabras clave locales ("abogada en Piura", penal, laboral, familia…).
- Etiqueta canonical, hreflang, geo-región PE-PIU y robots.
- Open Graph + Twitter Card con imagen 1200×630 (vista previa al compartir el enlace).
- Datos estructurados JSON-LD: `LegalService/Attorney`, `Person` (colegiatura ICAP),
  `FAQPage` (preguntas que pueden salir directo en Google), `WebSite` y catálogo de servicios.
- Sitemap, robots.txt, 404, HTML semántico (un H1, H2 por sección) y textos alternativos.
- Rendimiento: imagen WebP con preload, fuentes con `display=swap`, caché en Vercel.

## Pasos recomendados después de publicar
1. **Google Search Console** → agregar el dominio, pegar el código de verificación en la
   meta `google-site-verification` de `index.html` y enviar `sitemap.xml`.
2. **Perfil de Empresa de Google (Google Maps)** → es lo que más pesa para aparecer en
   búsquedas como "abogada en Piura". Usar el mismo nombre, teléfono y web que en la página.
3. **Google Analytics 4** (opcional) → al pegar el código `gtag`, los clics en WhatsApp,
   llamadas y el formulario se registran solos como eventos (`contact_click`, `form_whatsapp`).
4. Pedir **reseñas reales** a clientes en el perfil de Google.
5. Si se tiene **dirección de oficina y horario**, agregarlos a la sección de contacto y al
   JSON-LD (`streetAddress`, `openingHours`) para mejorar el SEO local.

## Personalizar
- **Foto:** reemplazar `assets/img/leslie-rivera.jpg` y `.webp` por una foto original
  (vertical, mínimo 800 px de ancho). La actual tiene baja resolución.
- **Colores:** variables en `:root` al inicio de `css/styles.css`.
- **WhatsApp:** número en `js/main.js` (`WHATSAPP`) y en los enlaces `wa.me` de `index.html`.

## Cómo verla
Abrir la carpeta en VS Code → extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*.

## Publicar
Subir la carpeta a Vercel (recomendado, usa `vercel.json`), Netlify o GitHub Pages.

Desarrollado por MAFC SOFTWARE EIRL.
