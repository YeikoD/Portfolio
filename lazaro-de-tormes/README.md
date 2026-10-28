# El buldero — presentación

Presentación web del **Tratado V de *Lazarillo de Tormes***, construida a partir de
`assets/GUIA Narracion y presentacion.mk` y de las tomas de `assets/`.

## Cómo abrirla

Haz doble clic en `index.html` (Chrome o Edge recomendados). No hace falta instalar
nada ni levantar un servidor: los vídeos se cargan desde la carpeta `assets/`.

## Controles

| Tecla / acción | Efecto |
| --- | --- |
| `→`, `↓`, `Espacio`, `Av Pág` | Avanzar |
| `←`, `↑`, `Re Pág` | Retroceder |
| `Inicio` / `Fin` | Ir al principio / final |
| `F` | Pantalla completa |
| Deslizar en móvil | Cambiar de diapositiva |

También puedes usar las flechas de la esquina inferior derecha y los puntos del
índice.

## Estructura

La presentación alterna **texto narrativo → toma a pantalla completa**:

1. Portada.
2. Texto de la toma 1 → vídeo de la toma 1.
3. Texto de las tomas 2-1 y 2-2 → vídeo 2-1 → vídeo 2-2.
4. Texto de la toma 3 → vídeo de la toma 3.
5. Textos y vídeos de las tomas 4-1, 4-2 y 4-3.
6. Texto de la toma 5 → imagen de la toma 5 (`assets/toma_5.jpg`).
7. Textos y vídeos de las tomas 6-1, 6-2, 7-1 y 7-2.
8. Cierre.

Cada vídeo se reproduce completo y, **al terminar, la presentación avanza sola**
a la diapositiva siguiente.

## Notas

- Los vídeos se reproducen con sonido. Si el navegador bloquea el audio al abrir
  un enlace directo a una toma, basta con pulsar cualquier tecla o hacer clic para
  activarlo.
- La toma 5 no tiene archivo de vídeo: se cierra con la imagen `assets/toma_5.jpg`.
- El texto y el orden de las tomas siguen la guía. Si quieres ajustar algo, edita
  directamente `index.html`.
