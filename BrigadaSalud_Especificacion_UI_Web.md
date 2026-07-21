# BrigadaSalud — Especificación de Interfaz Web

Sistema web (panel del Coordinador) para la gestión de brigadas médicas comunitarias. Este documento describe el sistema de diseño y todas las pantallas que debe cubrir la interfaz, desde el login hasta cada módulo del sidebar.

---

## 1. Sistema de diseño

### 1.1 Paleta de colores

**Primarios**

| Color | Hex | Uso |
|---|---|---|
| Azul Principal | `#1565C0` | Marca, botón primario, enlaces activos, sidebar seleccionado |
| Verde Salud | `#43A047` | Acciones positivas, botón secundario, estado "Atendido" |
| Celeste | `#42A5F5` | Acentos, información, gráficos secundarios |

**Neutros**

| Color | Hex | Uso |
|---|---|---|
| Blanco | `#FFFFFF` | Fondo de tarjetas y paneles |
| Fondo | `#F8FAFC` | Fondo general de la app |
| Borde | `#E2E8F0` | Bordes de inputs, tarjetas, tablas |
| Gris Claro | `#CBD5E1` | Elementos deshabilitados, iconos secundarios |
| Texto Secundario | `#607D8B` | Subtítulos, metadatos, placeholders |
| Texto Principal | `#263238` | Texto de cuerpo y títulos |

**Estados**

| Color | Hex | Uso |
|---|---|---|
| Éxito | `#22C55E` | Confirmaciones, turno atendido, sincronización correcta |
| Error | `#EF4444` | Validaciones fallidas, campos obligatorios, desconexión |
| Advertencia | `#F59E0B` | Turnos pendientes, alertas de conectividad |
| Información | `#3B82F6` | Notificaciones, mensajes informativos |

### 1.2 Tipografía (Inter)

| Estilo | Tamaño / peso | Uso |
|---|---|---|
| H1 | 36px, Bold | Título principal de página |
| H2 | 30px, SemiBold | Subtítulo de sección |
| H3 | 24px, SemiBold | Título de tarjeta o bloque |
| H4 | 20px, Medium | Título de tarjeta pequeña |
| Texto | 16px, Regular | Texto normal |
| Pequeño | 14px, Regular | Texto secundario |
| Caption | 12px, Regular | Notas, etiquetas, marcas de tiempo |

### 1.3 Iconografía

Material Symbols Rounded. Set base: `inicio`, `brigadas`, `pacientes`, `médicos`, `calendario`, `ubicación`, `qr`, `notificación`, `reportes`, `comunidades`, `ajustes`, `ayuda`, `teléfono`, `más`.

### 1.4 Componentes base

- **Botones**: Primario (azul, fondo sólido), Secundario (verde, fondo sólido), Outline (borde azul, fondo transparente), Ghost (solo texto), Icon Button (circular, ícono), FAB (circular flotante, verde, para "Nueva campaña"). Estados: Normal, Hover, Pressed, Disabled (gris claro).
- **Inputs**: Normal, Activo (borde azul), Error (borde rojo + mensaje debajo), con ícono (ej. selector de fecha), Buscar (con lupa), Password (con toggle de visibilidad), Dropdown, TextArea.
- **Chips**: de especialidad (Medicina General, Odontología, Pediatría, Ginecología, Nutrición — cada una con su color de acento) y de estado (Pendiente, Confirmado, Atendido, Cancelado, En espera).
- **Tarjetas (Cards)**: Brigada (con badge de estado "Programada/En curso/Finalizada"), Médico (foto, especialidad, disponibilidad), Paciente (nombre, turno, especialidad), Estadística (número + variación %), Noticia (imagen, título, fecha).
- **Calendario**: vista mensual con marcadores de color por estado de brigada (programada, en curso, finalizada).
- **Avatar**: tres tamaños (32px, 48px, 80px) para listas, tarjetas y perfiles respectivamente.
- **Tabla**: con columnas Paciente, Turno, Especialidad, Estado (chip), Hora, y paginación al pie.

### 1.5 Componentes especiales

- **Tarjeta de turno / código**: identificador de turno (ej. `MG-024`) con especialidad y conteo de personas registradas. El código QR es una representación visual opcional del turno para impresión o pantalla pública (tablero de turnos); el registro del paciente en el sistema siempre se hace por cédula y nombres, no depende de que el paciente escanee nada.
- **Estado de conexión**: indicador Online (verde, "Sincronizado") / Offline (rojo, "N pendientes") — visible de forma persistente en la interfaz para reflejar el funcionamiento sin conexión de la app de campo.
- **Progreso**: barra de sincronización con porcentaje, usada al reconectar después de trabajar offline.
- **Alertas**: banner de advertencia (ej. "Hoy cambios sin guardar").
- **Toast**: confirmación flotante temporal (ej. "Registro guardado correctamente").
- **Modal**: confirmación de acción crítica (ej. "¿Deseas sincronizar los datos ahora?") con botones Cancelar / Confirmar.

### 1.6 Navegación

- **Sidebar (Web)**: Dashboard, Brigadas, Pacientes, Médicos, Brigadistas, Comunidades, Reportes, Noticias, Configuración, Cerrar sesión.
- **Top Bar (Web/Móvil)**: logo, buscador, notificaciones (con contador), avatar de usuario.
- **Bottom Navigation (Android, vista de campo)**: Inicio, Brigadas, QR/Turno, Notificaciones, Perfil.

---

## 2. Flujo de acceso

### 2.1 Login
Formulario centrado con logo BrigadaSalud, input de usuario/correo, input de contraseña (con toggle), botón primario "Iniciar sesión", enlace "¿Olvidaste tu contraseña?", y mensaje de error (rojo) si las credenciales son inválidas.

### 2.2 Recuperar contraseña
Input de correo, botón primario "Enviar enlace de recuperación", toast de confirmación de envío.

### 2.3 Selección de rol (si aplica)
Si una misma persona tiene más de un rol (ej. coordinador y médico), pantalla simple de selección antes de entrar al dashboard correspondiente.

---

## 3. Módulos del sistema web

### 3.1 Dashboard
Pantalla de inicio tras el login. Tarjetas de Estadística (pacientes registrados, brigadas activas, variación %), lista de próximas Brigadas (cards), gráfico simple de atenciones por especialidad, y bloque de Noticias recientes.

### 3.2 Brigadas
Listado de campañas en formato tarjeta o tabla, con chip de estado (Programada, En curso, Finalizada). Botón FAB "Nueva campaña" abre formulario: nombre, fecha, ubicación, especialidades ofrecidas (chips seleccionables), cupos por especialidad. Vista de detalle de brigada con calendario de fecha y botón "Ver detalles".

### 3.3 Pacientes
Tabla con buscador (por cédula o nombre), columnas Paciente / Turno / Especialidad / Estado / Hora, chips de estado por fila, paginación. Ficha de detalle de paciente al hacer clic en una fila (datos generales + historial de atenciones).

### 3.4 Médicos
Listado en tarjetas: foto/avatar, nombre, especialidad (chip), estado de disponibilidad, botón "Ver perfil". Formulario de alta/edición de médico con datos generales, especialidad y credencial profesional (CMP).

### 3.5 Brigadistas
Listado de voluntarios asignados a cada brigada, con rol dentro del equipo (registro, apoyo logístico) y estado de asistencia.

### 3.6 Comunidades
Catálogo de barrios/sectores atendidos, con mapa o listado, número de brigadas realizadas por sector e histórico de atenciones — insumo para el Panel de Reportes.

### 3.7 Reportes
Tarjetas de Estadística (total atendidos, especialidad más demandada, brigadas del período) y tabla o gráfico exportable por brigada, sector o especialidad, con filtro de fechas.

### 3.8 Noticias
Listado de comunicados o campañas próximas en formato tarjeta (imagen, título, fecha, resumen), con botón "Leer más". Formulario de publicación para el coordinador.

### 3.9 Configuración
Datos de la cuenta del coordinador, gestión de especialidades disponibles en el sistema, preferencias de notificación, y estado de sincronización general (online/offline, pendientes).

---

## 4. Consideraciones de accesibilidad

- Contraste mínimo AA entre texto principal (`#263238`) y fondo (`#F8FAFC` / `#FFFFFF`).
- Todos los botones de ícono llevan etiqueta accesible (no solo el ícono).
- Los estados de color (chips, alertas) se acompañan siempre de texto, no dependen solo del color.
- El indicador Online/Offline es visible en todo momento, sin necesidad de acción del usuario para consultarlo.
