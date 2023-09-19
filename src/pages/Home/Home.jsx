import './Home.scss';
import TopNav from '../../components/TopNav/TopNav';
import HomeTabs from '../../feature/users/components/HomeTabs/HomeTabs';
import RegisterForm from '../../feature/users/components/RegisterForm/RegisterForm';

const HomePage = () => (
  <div className="homepage">
    <TopNav />
    <div className="homepage__main-container">
      <section className="homepage__hero">
        <div className="homepage__hero-bg" />
        <div className="homepage__hero-left">
          <h3>Menos tiempo para inventario y más tiempo para libros</h3>
          <figure className="homepage__hero-figure">
            <img src="/hero.png" alt="" className="homepage__hero-image" />
          </figure>
        </div>
        <div className="homepage_hero-right">
          <HomeTabs />
        </div>
      </section>
      <div className="homepage__info-sections">
        <section>
          <picture>
            <img src="/piled-books.svg" alt="pila de libros" />
          </picture>
          <div>
            <h2>¿Por qué elegir Caikei?</h2>
            <article>
              <h3>Registro Integral</h3>
              Registra tu editorial, tu catálogo completo de
              libros y tus acuerdos comerciales con librerías en un solo lugar,
              proporcionando una visión completa de tus operaciones.
            </article>
            <article>
              <h3>Cuatro Tipos de Movimientos</h3>
              Desde el ingreso de nuevos ejemplares
              hasta la liquidación de libros vendidos, Caikei cubre todos los
              aspectos de la gestión de inventarios con sus cuatro tipos de
              movimientos intuitivos.
            </article>
            <article>
              <h3>Automatización Eficaz</h3>
              Reduce la carga de trabajo manual gracias a
              nuestra plataforma que automatiza procesos, lo que te permite ahorrar
              tiempo valioso.
            </article>
            <article>
              <h3>Documentos Descargables</h3>
              Accede fácilmente a documentos que respaldan
              cada movimiento, manteniendo un registro claro y organizado.
            </article>
          </div>
        </section>
        <section>
          <picture>
            <img src="/saving.svg" alt="alcancía" />
          </picture>
          <div>
            <h2>Precios Razonables</h2>
            En Caikei, creemos en ofrecer una solución de calidad a un precio justo,
            adaptado al tamaño de tu catálogo. Nunca pagarás de más por las características
            que necesitas
          </div>

        </section>
        <section>
          <picture>
            <img src="/smart.svg" alt="personas construyendo página web" />
          </picture>
          <div>
            <h2>Diseño Amigable</h2>
            Nuestra interfaz amigable y eficiente garantiza una experiencia de usuario
            sin complicaciones, sin importar tu nivel de experiencia.
          </div>
        </section>
        <section>
          <picture>
            <img src="/writing.svg" alt="bombilla con lápiz" />
          </picture>
          <div>
            <h2>¿Quién se beneficia de Caikei?</h2>
            Caikei está diseñado pensando en las editoriales, en especial en las editoriales
            independientes que desean una solución confiable y asequible para la gestión
            de sus libros.
          </div>
        </section>
        <section>
          <picture>
            <img src="/pile-2.svg" alt="pila de libros" />
          </picture>
          <div>
            <h2>
              Nuestro Compromiso: &ldquo;Menos tiempo para inventario y más
              tiempo para libros&rdquo;
            </h2>
            En Caikei, nuestro lema lo dice todo. Queremos liberarte de las tareas tediosas
            de la gestión
            de inventarios para que puedas concentrarte en lo que amas: los libros.
          </div>
        </section>
        <section>
          <div className="homepage__last-form">
            <RegisterForm />
          </div>

          <div>
            <h2>
              ¿Listo para simplificar la gestión de tus inventarios editoriales?
            </h2>
            Únete a la comunidad de editoriales que confían en Caikei para llevar un
            control preciso de sus libros y dedicar más tiempo a su pasión. ¡Comienza hoy mismo!
          </div>
        </section>
      </div>
      <i className="homepage__last-message">¡Descubre el futuro de la gestión de inventarios editoriales con Caikei!</i>
    </div>
  </div>
);

export default HomePage;
