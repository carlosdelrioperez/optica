# Manual de instalación

## Backend

### Requisitos previos
Debes tener instalados los siguientes componentes en tu sistema:
- Java Development Kit 21.0.2 o superior
- Maven
- Git
- Visual Studio Code

### Configuración proyecto
Abre una terminal donde quieras guardar el proyecto y ejecuta el siguiente comando para clonar el repositorio:

`git clone https://github.com/carlosdelrioperez/optica.git`

Configura una base de datos MySql en tu sistema con los datos que aparecen en el archivo backend/src/main/java/resources/application.properties:

```
spring.datasource.url=jdbc:mysql://localhost:3306/optica
spring.datasource.username=root
spring.datasource.password=root
```
La base de datos se tiene que llamar **optica**, el host debe ser **localhost**, el puerto **3306**, usuario **root** y constraseña **root**.

Compilamos el proyecto para descargar todas las dependencias con el siguiente comando:

`mvn clean install`

Y ejecutamos el proyecto con el siguiente comando:

`mvn spring-boot:run`

Con esto tendríamos el backend del proyecto corriendo y se habría populado la base de datos.

## Frontend

### Requisitos previos

Debes tener instalados los siguientes componentes en tu sistema:

- Node 20.10 o superior
- npm 10.2.3 o superior

### Configuración proyecto

Entramos en el directorio /frontend del proyecto e instalamos dependencias:

`npm install`

Una vez instaladas las dependencias podemos ejecutar el proyecto React:

`npm start`

Con esto tendríamos el frontend corriendo al mismo tiempo que el backend.
