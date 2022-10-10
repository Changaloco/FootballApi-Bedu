<img src="https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/bedulogo/original.png?1596745896" align="right" height="100" width="100" hspace="10">

# FootballApi - Bedu


Proyecto de Backend Fundamentals.

### Tablero Trello

* En el siguiente enlace se muestra nuestro tablero de trello en donde se encuentran las actividades de cada integrante [Trello](https://trello.com/invite/b/ixMKuQEV/caa8e7cc3974c95788b57418c18c1c2a/footballapi)

### *Integrantes*


* Emanuel Alamilla [![Web](https://img.shields.io/badge/GitHub-Changaloco-14a1f0?style=for-the-badge&logo=github&logoColor=white&labelColor=101010)](https://github.com/Changaloco)<br>

* Gonzalo Olvera[![Web](https://img.shields.io/badge/GitHub-olvera93-14a1f0?style=for-the-badge&logo=github&logoColor=white&labelColor=101010)](https://github.com/olvera93)<br>


### 🔧 Tecnologías usadas

* Node

* JavaScript

* Postgress

* Express

* Swagger 

* JWT


## 🗒 Historias de usuario

### HU-1: 
![HU1](https://user-images.githubusercontent.com/42697554/194795828-2f7dc424-afd0-41e6-ae91-01a403e31eca.jpeg)

### HU-2: 
![HU2](https://user-images.githubusercontent.com/42697554/194795883-a7b29c86-ad15-41b4-854d-88e8a5437d45.jpeg)

### HU-3: 
![HU3](https://user-images.githubusercontent.com/42697554/194795899-c6d603c2-6dfc-4a9d-933e-6dec5cc3c18d.jpeg)

### HU-4:
![HU4](https://user-images.githubusercontent.com/42697554/194795915-ea569bed-5a5d-4079-b157-5faf431e75aa.jpeg)

### HU-5: 
![HU5](https://user-images.githubusercontent.com/42697554/194795928-4ea72835-ec99-4171-b073-e69ed16cd083.jpeg)


## 📕 Diagrama De Base de Datos:
![Diagrama](https://user-images.githubusercontent.com/42697554/194796207-c4a719a0-bd9d-404d-b476-86d2f1f32103.jpeg)


## 🛠️ Funcionalidad
  
FootballApi es una API. En donde nuestra api es para que los desarrolladores puedan hacer uso de ella, la api les mostrará acerca de los jugadores que hay en un equipo, al igual como todos los equipos que hay en liga, los torneos que hay y en que fechas comienzan y acaban, al igual sobre con quienes se van a enfrentar.

En la api también podrán agregar, editar o hasta eliminar ya seá algún jugador que no pueda asistir o quizás se haya cambiado de equipo, al igual que los torneos se pueden crear, editar o eliminar.  

## :notebook: Especificaciones

* Para su correcto funcionamiento, la API requiere uso de postman o insomnia para registrarse e iniciar sesión del usuario para el token.

* La API esta documentada con swagger y openAPI, lo cuál al momento de correr el proyecto se tiene que entrar a la siguiente liga: [Swagger](https://footballapi318.herokuapp.com/api-docs/)

* Cada endpoint tiene seguridad, lo que significa que no cualquier persona puede hacer uso de los mismos, se tendrá que registrar e iniciar sesión
para que les de un token y puedan usar los endpoints.


## Uso

* Se requiere el registro para el usdo de la API por medio de un nombre, surname, email, username, type ('admin') y de una contraseña, esto se debe de poner en postman o insomnia.
<img width="1323" alt="Captura de Pantalla 2022-10-09 a la(s) 12 29 28" src="https://user-images.githubusercontent.com/42697554/194770954-4651e940-3fa2-4133-a709-9636f4f217e4.png">

* Si el usuario quiere hacer uso de la API y ejecutar algún endpoint sin iniciar sesión le saldrá el siguiente mensaje: 
<img width="1398" alt="No autorizado" src="https://user-images.githubusercontent.com/42697554/194770680-60181fba-b3e4-4acf-b810-45f77ff710f6.png">
  
  lo cuál significa que no tiene actualización para ejecutar los endpoints.

* Una vez registrado, el usuario tendrá que iniciar sesión para que se le un token y ese mismo lo pueda ingresar a swagger como se muestra en la imagen.
<img width="1439" alt="Swagger" src="https://user-images.githubusercontent.com/42697554/194770589-9255efa0-dbdc-4836-9725-ab2288ea11af.png">


* Cuando se coloque el token de JWT el usuario podrá hacer ejecutar todos los endpoints de la API.
 
<img width="1439" alt="Autorizado" src="https://user-images.githubusercontent.com/42697554/194770848-bc4de072-d47c-4e84-b9df-f1bf2be863c8.png">
<img width="1398" alt="Get players" src="https://user-images.githubusercontent.com/42697554/194770867-072e72b8-f2a7-44ec-a9bf-a2043db67c82.png">


##  Alcance del proyecto:

Este proyecto no tiene el objetivo de convertirse en una aplicación totalmente funcional y comercializable, sino que tiene la finalidad de servir como herramienta de aplicación de los conocimientos adquiridos durante el módulo, probar distintas formas de resolver problemas, practicar y mejorar habilidades de programación. Por lo anterior, no es obligatorio crear una aplicación desde cero junto a su concepto y funcionalidades, sino que tomar de una ya existente todo lo anterior y así encontrar la forma de simular todas sus funcionalidades dentro de un código que se ejecute de forma similar.

El código a crear buscará desarrollar cada uno de los temas vistos en las sesiones que serán extraídos de las secciones de postwork y reto final, buscando la manera de aplicar lo que se explicó durante cada sesión.



<p><br /> &copy; Equipo 19 - Desarrollo Web - Santander - 2022
