## Proyecto Integrador DigitalBooking

Deploy: http://bucket-c7-grupo9-front.s3-website.us-east-2.amazonaws.com <br/>

---

- **Nombre del proyecto:** **WORK WORLD**
- **Resumen general del proyecto:** El proyecto consiste en el desarrollo de una aplicación completa para el alquiler de espacios de trabajo. En el mismo se aplicaron los conocimientos adquiridos durante la primera etapa de la carrera. En la aplicación, se pueden buscar y reservar diferentes tipos de lugares de trabajo, de acuerdo a la necesidad del cliente y se pueden crear nuevos a través del panel de administración. La página está diseñada para ser consumida por tres tipos diferentes de usuarios: usuario no registrado, usuario registrado y usuario registrado como administrador. Para realizar una reserva, se debe estar registrado e iniciar sesión. Se implementaron filtros para buscar espacios de trabajo dentro de una ciudad y por rango de fechas, como así también por categoría. En este proyecto se simuló un entorno de trabajo real donde se utilizaron metodologías ágiles y se debieron cumplir los plazos acordados para los sprints.

## Equipo

- **Agustín Espósito**

- **Anyi Mesa**

- **Jessica Parrilla**

- **Catalina Hernández**

- **Alejandra Vedoya**<br>

## Tecnologías utilizadas

**Desarrollo del proyecto:**

- IDEs: IntelliJ IDEA Community, Visual Studio Code.
- Sistemas de control de versiones: Git (GitLab)
- Simulación / Virtualización: Cuenta en Amazon Web Service (AWS).

**Tecnologías utilizadas para el desarrollo:**

- **Front end**

  - React
    - react-router-dom (manejo de rutas)
    - react-datepicker (calendario)
    - react-image-gallery (galeria)
    - react-fontawesome (íconos)
    - @mui/material @emotion/react @emotion/styled

  - CSS

- **Back end**

  - Java
    - Spring
    - Spring Boot
    - Spring Security
    - API Rest
  - JWT
  - Maven

- **Base de datos**

  - MySQL

- **Infraestructura**

  - AWS
    - Deploy en AWS utilizando pipelines desde GitLab CI/CD
    - Servicio RDS para alojar la base de datos MySQL
    - Amazon Elastic Compute Cloud (EC2) para alojar el backend (API)
    - Dos buckets S3 (Amazon Simple Storage Service). Uno para las imágenes y otro para el front end.

- **Testing**
 - Pruebas de humo
 - Pruebas de regresion
 - Pruebas de Funcionalidad
   - Pruebas de Integración
   - Pruebas de Rendimiento
   - Pruebas de Seguridad
   - Pruebas de Usabilidad
  - Selenium
  - Postman
# work_world
