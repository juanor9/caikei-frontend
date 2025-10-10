Impleméntalas# Arquitectura de Seguridad de Caikei

Este documento describe las directrices y mejores prácticas de seguridad que deben ser implementadas en la infraestructura y el backend de la aplicación Caikei. El objetivo es garantizar la confidencialidad, integridad y disponibilidad de los datos de los usuarios.

## 1. Control de Acceso Basado en Roles (RBAC)

**Objetivo:** Asegurar que los usuarios solo puedan acceder y modificar los datos que les pertenecen y para los cuales tienen autorización.

**Implementación Sugerida (Backend):**

1.  **Definición de Roles:**
    *   `owner`: Propietario de la cuenta de la editorial. Tiene todos los permisos sobre sus datos.
    *   `admin`: Usuario administrador con permisos para gestionar libros, inventarios y ventas de su editorial.
    *   `viewer`: Usuario con permisos de solo lectura sobre los datos de su editorial.

2.  **Asignación de Roles (usando Firebase Authentication Custom Claims):**
    *   Cuando un usuario es creado o se le asigna un rol, se deben establecer *Custom Claims* en su token de autenticación. Esto se hace desde un entorno de backend seguro (ej. Cloud Functions).

    ```javascript
    // Ejemplo de cómo asignar un rol a un usuario en una Cloud Function
    admin.auth().setCustomUserClaims(userId, { role: 'admin', editorialId: 'editorial-123' });
    ```

3.  **Validación en el Backend:**
    *   En cada solicitud a la API del backend, se debe verificar el token de autenticación del usuario, extraer los *Custom Claims* y validar los permisos.

    ```javascript
    // Ejemplo de middleware en un endpoint de Express.js
    async function-es-authorize(req, res, next) {
      const-idToken = req.headers.authorization.split('Bearer ')[1];
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const userRole = decodedToken.role;
        const userEditorial = decodedToken.editorialId;

        // Lógica de autorización
        if (req.params.editorialId !== userEditorial || userRole === 'viewer' && req.method !== 'GET') {
          return res.status(403).send('Acceso no autorizado.');
        }

        next();
      } catch (error) {
        res.status(401).send('Token no válido.');
      }
    }
    ```

## 2. Gestión de Secretos

**Objetivo:** Evitar la exposición de claves de API, credenciales de bases de datos y otros secretos en el código fuente o en variables de entorno no seguras.

**Herramienta Recomendada:** [Google Secret Manager](https://cloud.google.com/secret-manager)

**Implementación:**

1.  **Almacenar Secretos en Secret Manager:**
    *   Crea secretos en la consola de Google Cloud para cada credencial que necesite la aplicación (ej. `DB_PASSWORD`, `API_KEY_SENDGRID`).

2.  **Acceder a los Secretos en Tiempo de Ejecución:**
    *   Configura los permisos de IAM adecuados para que el servicio que ejecuta tu backend (ej. Cloud Run, App Engine) pueda acceder a los secretos.
    *   Utiliza la librería cliente de Secret Manager para obtener los valores de los secretos cuando la aplicación se inicia.

    ```python
    # Ejemplo de cómo acceder a un secreto en Python (usado en Cloud Functions o Cloud Run)
    from google.cloud import secretmanager

    def get_secret(secret_id, version_id="latest"):
        client = secretmanager.SecretManagerServiceClient()
        name = f"projects/{PROJECT_ID}/secrets/{secret_id}/versions/{version_id}"
        response = client.access_secret_version(request={"name": name})
        return response.payload.data.decode("UTF-8")

    db_password = get_secret("DB_PASSWORD")
    ```

## 3. Monitoreo y Alertas de Seguridad

**Objetivo:** Detectar y responder proactivamente a posibles amenazas de seguridad.

**Herramienta Recomendada:** [Google Cloud's Operations Suite (Logging y Monitoring)](https://cloud.google.com/products/operations)

**Acciones a Implementar:**

1.  **Habilitar Logs de Auditoría:**
    *   Asegúrate de que los logs de auditoría de Cloud (`Admin Activity`, `Data Access`) estén habilitados para todos los servicios de GCP en uso.

2.  **Crear Alertas Basadas en Logs:**
    *   Configura alertas que se disparen ante eventos de seguridad sospechosos. Ejemplos de alertas críticas:
        *   **Múltiples intentos de inicio de sesión fallidos:** Podría indicar un ataque de fuerza bruta.
        *   **Cambios en roles de IAM:** Alerta sobre cualquier modificación en los permisos de acceso.
        *   **Acceso a datos desde una ubicación inusual:** Detecta posibles accesos no autorizados.
        *   **Exportación masiva de datos:** Podría ser un signo de exfiltración de datos.

3.  **Configurar Notificaciones:**
    *   Dirige las alertas a un canal de comunicación adecuado (ej. Slack, PagerDuty, email) para asegurar una respuesta rápida del equipo.

## 4. Proceso de Anonimización de Datos

**Objetivo:** Proteger la privacidad de los usuarios al generar estadísticas generales.

**Implementación:**

*   Se debe crear un proceso ETL (Extract, Transform, Load), preferiblemente con una herramienta como **Cloud Dataflow** o una **Cloud Function** programada, que se ejecute periódicamente.
*   Este proceso debe leer los datos de producción, aplicar técnicas de anonimización (eliminación de PII, agregación, generalización) y cargar los datos resultantes en una tabla o base de datos separada, designada exclusivamente para análisis y estadísticas.