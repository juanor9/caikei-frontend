import TopNav from '../../components/TopNav/TopNav';

const PrivacyPolicy = () => (
  <div className="library-page">
    <TopNav />
    <main className="library-page__main-container">
      <h2>Política de privacidad</h2>

      <p>Última actualización: 14 de marzo de 2023</p>

      <p>Tanuki SAS (&quot;nosotros&quot;, &quot;nos&quot; o &quot;nuestro&quot;)
        se compromete a proteger
        su privacidad. Esta política de privacidad describe cómo recopilamos, usamos y
        salvaguardamos la información personal que obtenemos a través de la aplicación
        Caikei
        (la &quot;aplicación&quot;).
      </p>
      <p>Al utilizar la aplicación, usted acepta la recopilación y el uso de su información personal
        según lo descrito en esta política de privacidad. Si no está de acuerdo con esta política de
        privacidad, no utilice la aplicación.
      </p>
      <h3>Información que recopilamos</h3>
      <p>Recopilamos información personal que usted proporciona voluntariamente a
        través de la aplicación,
        como su dirección de correo electrónico, nombre, y otros datos de contacto que usted
        nos proporcione al
        registrarse o al utilizar la aplicación.
      </p>
      <p>También podemos recopilar información sobre su uso de la aplicación,
        como el historial de interacciones,
        la frecuencia y duración de su uso para mejorar la funcionalidad de la plataforma.
      </p>
      <h3>Cómo utilizamos la información</h3>
      <p>Utilizamos la información personal que recopilamos para proporcionarle
        los servicios de la aplicación
        y para mejorar y personalizar su experiencia de usuario. También podemos
        utilizar su información personal
        para enviarle correos electrónicos administrativos y promocionales sobre nuestros productos
        y servicios, siempre y cuando usted
        nos haya dado su consentimiento explícito para esto último.
      </p>
      <p>
        La información de negocio (inventarios, ventas, etc.) y los datos de uso podrán ser utilizados para generar estadísticas generales agregadas. <strong>En todos los casos, los datos son sometidos a un proceso de anonimización previo para asegurar que ninguna información personal o de negocio individualmente identificable sea expuesta.</strong>
      </p>
      <h3>Intercambio de Información con Terceros</h3>
        <p>
          Nos comprometemos a no vender, alquilar o compartir su información personal con terceros con fines de marketing. La información personal solo se comparte en los siguientes casos estrictamente necesarios:
        </p>
      <ul>
        <li>
          <strong>Proveedores de Servicios Esenciales:</strong> Compartimos información con proveedores de servicios que son fundamentales para la operación de la aplicación, como nuestro proveedor de infraestructura en la nube (Google Cloud Platform) y servicios de correo electrónico transaccional. Estos proveedores están obligados contractualmente a proteger su información y solo pueden utilizarla para los fines específicos para los que fueron contratados.
        </li>
        <li>
          <strong>Cumplimiento Legal:</strong> Podremos divulgar su información si así lo requiere una ley, reglamento, orden judicial o solicitud gubernamental aplicable, siempre verificando la legitimidad de dicha solicitud.
        </li>
        <li>
          <strong>Protección contra Fraude y Abuso:</strong> Es posible que compartamos información si es necesario para investigar, prevenir o tomar medidas con respecto a actividades ilegales, sospecha de fraude o violaciones de nuestras políticas y términos de servicio.
        </li>
        <li>
          <strong>Transacciones Comerciales:</strong> En caso de una fusión, adquisición o venta de la totalidad o una parte de nuestros activos, su información personal podría ser transferida al nuevo propietario, bajo el compromiso de que se respeten los términos de esta Política de Privacidad.
        </li>
      </ul>
      <h3>Seguridad de la información</h3>

      <p>
        Nos tomamos muy en serio la seguridad de su información. Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Estas medidas incluyen:
      </p>
      <ul>
        <li><strong>Cifrado de datos en tránsito:</strong> Toda la comunicación entre su dispositivo y nuestros servidores se realiza a través del protocolo HTTPS, asegurando que los datos viajen cifrados.</li>
        <li><strong>Cifrado de datos en reposo:</strong> Los datos almacenados en nuestras bases de datos están protegidos con cifrado para prevenir el acceso no autorizado a la información sensible.</li>
        <li><strong>Control de Acceso Basado en Roles (RBAC):</strong> Implementamos un estricto sistema de control de acceso para asegurar que los usuarios solo puedan ver y modificar los datos a los que tienen autorización explícita, previniendo que una editorial pueda acceder a datos de otra.</li>
        <li><strong>Gestión segura de secretos:</strong> Las credenciales, claves de API y otros secretos de la aplicación se gestionan utilizando servicios especializados como Google Secret Manager, evitando su exposición en el código fuente.</li>
      </ul>
      <h3>Retención de la información</h3>
      <p>Mantenemos su información personal durante el tiempo que sea necesario para
        cumplir con los fines para
        los que fue recopilada, a menos que se requiera o permita por ley una retención más larga.
      </p>
      <h3>Enlaces a sitios web de terceros</h3>
      <p>La aplicación puede contener enlaces a sitios web de terceros. No somos
        responsables de las prácticas de
        privacidad o del contenido de estos sitios web de terceros. Le recomendamos
        que revise las políticas de
        privacidad de estos sitios web de terceros antes de proporcionar cualquier
        información personal.
      </p>
      <h3>Cambios a esta política de privacidad</h3>
      <p>Podemos actualizar esta política de privacidad periódicamente. Le notificaremos
        cualquier cambio publicando
        la nueva política de privacidad en la aplicación. Le recomendamos que revise
        esta política de privacidad
        periódicamente para estar al tanto de los cambios.
      </p>
      <h3>Contacto</h3>
      <p>Si tiene alguna pregunta sobre esta política de privacidad, puede contactarnos
        a través de la aplicación o
        enviándonos un correo electrónico a info@tanukilibros.com.
      </p>

    </main>
  </div>
);

export default PrivacyPolicy;