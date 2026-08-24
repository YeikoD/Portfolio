# Portafolio Personal

Portafolio web profesional diseñado para showcase de proyectos de desarrollo de software, con enfoque en sistemas de gestión livianos, interfaces de usuario intuitivas y automatización de procesos.

![Portafolio Preview](https://via.placeholder.com/800x400/0d0e12/00ffcc?text=Anderson+Correa+Portfolio)

## 🌟 Características

- **Diseño Tech-Modern**: Tema oscuro con acentos cyan para estética profesional
- **Efectos Visuales Avanzados**: Glow effects, parallax, typing animations y transiciones suaves
- **Proyecto Estrella Destacado**: Sección especial para el proyecto más importante (LogSys)
- **Demo Integrada**: Videos demostrativos de proyectos con reproductores HTML5
- **Enlace Directo a GitHub**: Acceso rápido a repositorios y proyectos
- **Animaciones Interactivas**: Efectos hover, smooth scroll y parallax en mapa
- **Optimizado para Performance**: CSS containment, intersection observer, throttling
- **Totalmente Responsivo**: Adaptable desde monitores antiguos 4:3 hasta modernos ultrawide
- **SEO Optimizado**: Meta tags completos, Open Graph y Twitter cards
- **Accesibilidad**: Atributos ARIA, navegación por teclado y contraste WCAG

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica, accesibilidad y SEO
- **CSS3**: Variables CSS, Flexbox, animaciones, media queries, backdrop-filter
- **JavaScript (Vanilla)**: Interactividad, animaciones, performance optimization
- **Font Awesome 6.4**: Iconos vectoriales optimizados
- **Google Fonts**: JetBrains Mono (código) y Space Grotesk (contenido)

## 📁 Estructura del Proyecto

```
Portfolio/
├── index.html          # Página principal
├── styles.css          # Estilos y diseño (940+ líneas)
├── script.js           # Funcionalidad JavaScript (334 líneas)
├── README.md           # Documentación
├── .gitignore          # Archivos ignorados por Git
├── CNAME               # Configuración de dominio personalizado
└── assets/             # Imágenes y recursos
    ├── logos/          # Logos y favicons
    ├── screenshots/    # Capturas de proyectos
    ├── videos/         # Videos demostrativos
    └── Uruguay_departments_blank.svg  # Mapa SVG
```

## 🛠️ Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Personalizar el contenido**:
   - Editar `index.html` para cambiar tu información personal
   - Actualizar enlaces a GitHub y redes sociales
   - Reemplazar imágenes con tus capturas reales
   - Agregar videos demostrativos de tus proyectos

3. **Personalizar estilos**:
   - Modificar `styles.css` para ajustar colores y diseño
   - Las variables CSS al principio facilitan la personalización:
   ```css
   :root {
       --primary-color: #0d0e12;
       --secondary-color: #12131a;
       --accent-color: #00ffcc;
       --accent-glow: rgba(0, 255, 204, 0.15);
   }
   ```

4. **Ejecutar localmente**:
   ```bash
   # Usando Python
   python -m http.server 8000
   
   # O usando Node.js
   npx http-server
   ```

5. **Abrir en el navegador**:
   ```
   http://localhost:8000
   ```

## 🎯 Secciones del Portafolio

### 1. Hero Section
- **Presentación dinámica**: Efecto typing con múltiples frases
- **Mapa de Uruguay**: SVG interactivo con parallax y glowing effects
- **Glow effect**: Seguimiento del mouse con física suave
- **Call-to-action**: Botones para ver proyectos y contacto

### 2. Proyectos
- **LogSys (Proyecto Estrella)**: Sistema de gestión de inventario y personal
  - ASP.NET Core, React, Tauri 2, SQLite
  - Video demostrativo integrado
  - Características detalladas y tecnologías
- **DALTON Visualizer**: Simulador 3D de química en Unity
  - Unity, C#, modelos atómicos históricos
  - Video demostrativo interactivo
  - Features educativas

### 3. Contacto
- **GitHub**: Enlace directo al perfil de GitHub

## 📱 Responsive Design

El portafolio está optimizado para todas las resoluciones:
- 🖥️ **Ultrawide (>1600px)**: Tamaño original del mapa
- 💻 **Desktop moderno (1366-1600px)**: 80% del tamaño original
- 💻 **Laptop estándar (1024-1366px)**: 70% del tamaño original
- 💻 **Laptop antigua (800-1024px)**: 60% del tamaño original
- 📱 **Tablet (600-800px)**: 55% del tamaño original
- 📱 **Móvil grande (480-600px)**: 50% del tamaño original
- 📱 **Móvil (<480px)**: 40% del tamaño original

## 🎨 Características de Diseño

- **Tipografía Tech**: JetBrains Mono para código, Space Grotesk para contenido
- **Tema Oscuro Profesional**: Fondo #0d0e12 con acentos #00ffcc
- **Efectos Visuales**:
  - Glow effects con seguimiento de mouse
  - Parallax en mapa de Uruguay
  - Animaciones typing en hero y logo
  - Transiciones suaves en hover
  - Pulsing nodes en el mapa
- **Performance**:
  - CSS containment para mejor rendimiento
  - Intersection Observer para animaciones
  - Throttling y debouncing en eventos scroll
  - will-change y backface-visibility optimizaciones
- **Accesibilidad**:
  - Atributos ARIA completos
  - Navegación por teclado
  - Contraste WCAG AA compliant
  - Etiquetas aria-label descriptivas

## 🚀 Despliegue

### GitHub Pages
1. Sube el código a tu repositorio
2. Ve a Settings > Pages
3. Selecciona la rama main
4. Tu portafolio estará disponible en `https://tu-usuario.github.io/tu-repositorio`

### Netlify
1. Arrastra la carpeta del proyecto a Netlify
2. Configura el dominio personalizado si lo deseas
3. Listo para compartir

### Vercel
```bash
vercel deploy
```

## 📞 Contacto

Personaliza esta sección con tus propios enlaces de contacto:
- GitHub: [tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@ejemplo.com

## 🎨 Personalización Avanzada

### Animaciones en JavaScript
El archivo `script.js` incluye:
- **Typing effects**: Para hero section y logo
- **Parallax glow**: Seguimiento de mouse con física
- **Mobile menu**: Toggle animado con ARIA
- **Smooth scroll**: Navegación fluida
- **Intersection Observer**: Animaciones al scroll
- **Performance utilities**: Throttle y debounce

Personaliza las frases del typing effect y los colores en las variables CSS según tu preferencia.

### Variables CSS Personalizables
```css
:root {
    --primary-color: #0d0e12;      /* Color principal */
    --secondary-color: #12131a;    /* Color secundario */
    --accent-color: #00ffcc;       /* Color de acento */
    --accent-glow: rgba(0, 255, 204, 0.15);
    --dark-bg: #0a0b10;            /* Fondo oscuro */
    --text-primary: #e2e8f0;       /* Texto principal */
    --text-secondary: #94a3b8;     /* Texto secundario */
}
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo como base para tu propio portafolio.

## 🙏 Agradecimientos

- Diseño inspirado en estética tech/cyberpunk moderna
- Iconos de Font Awesome 6.4
- Fuentes de Google Fonts (JetBrains Mono, Space Grotesk)
- Optimizaciones de performance basadas en mejores prácticas web

---

**Creado con ❤️ para destacar tu trabajo como desarrollador**
