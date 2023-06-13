***

# Aplicación de búsquedas con Lenguaje Natural en Observatorios Virtuales

#### Documentación de Software

**Autores:**
- Iñaki Oyarzun Merino - UTFSM
- Vicente Álvarez - UTFSM

**Profesores:**
- Mauricio S. - UTFSM  
- Mauricio A. - UTFSM  
  
***

## Índice

***

1. [Descripción general del sistema](#1)
   1. [Ventajas](#1.1)
   2. [Desventajas](#1.2)
2. [Instalación](#2)
   1. [Requerimientos](#2.1)
   2. [Instalación de Componentes](#2.2)
   3. [Variables de entorno](#2.3)
   4. [Ejecución](#2.4)
3. [Componentes del sistema](#3)
   1. [Componente Frontend](#3.1)
   2. [API GPT](#3.2)
   3. [API PyVO](#3.3)
4. [Restricciones de uso](#4)
5. [Asistencia](#5)

***

## Contenidos

***

### 1- Descripción general del sistema <a name='1'></a>

Este sistema utiliza tres componentes basadas en dos APIs hechas en Django (Python) y un sistema de frontend desarrollado en React, la función final de este proyecto es presentar una propuesta de interacción para Astrónomos o potenciales usuarios en búsqueda de conocimiento o estudio acerca del Observatorio Virtual (OV), fundamentalmente el contenido de los registrys, asi como la comunicación y la ejecución de código.  
  
La característica principal de este sistema se halla en el uso de una comunicación por medio de Chat para el trabajo de entender y responder a las consultas presentadas por el usuario, este chat es realizado en base a Chat GPT-3.5 desarrollado por OpenAI mediante APIs. Las posibilidades del modelo utilizado facilitan la programación del mismo para indicar las tareas a realizar dentro del chat, junto con finalmente entregar una respuesta acorde a las consultas realizadas por parte del usuario.  
  
Como característica secundaria al sistema, se tiene la ejecución de código para la realización de consultas a partir del código en python proporcionado por GPT-3.5 durante el chat, utilizando PyVO para su desarrollo. Permitiendo evaluar en tiempo real el comportamiento de los resultados entregados por el modelo.  


### 1.1- Ventajas <a name='1.1'></a>

Como ventajas principales para el diseño del producto, se pueden destacar las siguientes:  
  
- **Estudio y análisis del sistema de OV para el aprendizaje**: Como ventaja a destacar de este sistema, se menciona la facilidad para los usuarios sobretodo orientados a estudiantes, para conocer y explorar información o datos sobre los sistemas astronómicos, entregando además la posibilidad a estudiantes con conocimientos en programación de poder probar y conocer sobre el entorno de programación que brinda el sistema.
- **Búsqueda y obtencion de recomendaciones para datos dentro del Registry**: Además de aportar a usuarios no experimentados en los conocimientos de los sistemas del observatorio virtual, el sistema permite recomendar o entregar sugerencias que puedan ayduar a conocer sobre registros que puedan considerar Astrónomos o usuarios finales para obtener la información que deseen o que no hayan tenido en cuenta para sus búsquedas. De esta forma, se facilita la posibilidad del usuario para filtrar lo que se desea y evitar un gasto en el tiempo requerido para realizar la consulta o estructurarla dentro del VO para analizar los resultados que este entregue.

### 1.2- Desventajas<a name='1.2'></a>

Dentro de las desventajas presentes en el producto diseñado, se tienen las siguientes:  
  
- **Dependencia de Sistemas externos para el uso del sistema**: Si bien el sistema al depender de una solución externa facilita el abaratamiento de costos y la rapidez de la producción del producto, no permite ser lo suficientemente eficiente al no tener un control de los datos que utiliza la solución externa, lo que se traduce en problemas que pueden ocurrir como el manejo de datos antiguos o código desactualizado que no puede modificarse.  
- **Datos desactualizados dentro del modelo utilizado**: Debido a que se hace uso del modelo GPT-3.5, este posee solamente los conocimientos disponibles en las redes hasta Septiembre de 2021. Lo cual, por consiguiente con la desventaja anterior, el sistema completo se hace dependiente de esta información, teniendo que utilizar las versiones antiguas para las librerias de Astropy y PyVO para realizar las evaluaciones y ejecución del código, al igual que se presenta un problema de actualización de los enlaces o conocimientos presentes sobre los links o recursos que hayan sido dados de baja o actualizados dentro del Registry. Impidiendo ser más precisos en este aspecto debido a posibles fallas que pueden estar presentes tanto en el código o en registros que ya puedan no existir o encontrarse deprecados.

### 2- Instalación<a name='2'></a>

El siguiente aspecto a continuación detalla los pasos para la instalación del sistema completo, incluyendo cada uno de los componentes al igual que la inicialización de las variables.

### 2.1- Requerimientos<a name='2.1'></a>

**Nota:** El sistema ha sido probado en Windows 10, se desconoce o aún no se ha evaluado su rendimiento o ejecución en otros sistemas operativos

- Tener instaladas las versiones de python 3.8 y 3.8+ de forma separada ambas con la librería virtualenv
- Node JS 18.16.0+ con yarn instalado
- API KEY de OpenAI para el uso de sus modelos 

### 2.2- Instalación de componentes<a name='2.2'></a>

Para la instalación de los componentes, se tiene un detalle de las carpetas asociadas a cada componente del sistema.  
  
- **API (Componente GPT-3.5):**
  1. Acceder a la carpeta *API/* y crear un entorno virtual utilizando virtualenv de python 3.8+
  2. Con el entorno virtual de python creado, ejecutar la instalación de las librerias requeridas:    
  `pip install -r 'requirements.txt'`
  3. Una vez se tienen las librerias instaladas, acceder a  *API/chatAPI/* y ejecutar la inicialización de Django y su base de datos:  
  `python3 manage.py migrate`

- **searchAPI (Componente ejecución de código):**
  1. Acceder a la carpeta *searchAPI/* y crear un entorno virtual utilizando virtualenv de python **3.8**
  2. Con el entorno virtual de python creado, ejecutar la instalación de las librerias requeridas:  
  `pip install -r 'requirements_py38.txt'`
  3. Una vez se tienen las librerias instaladas, acceder a  *searchAPI/execAPI/* y ejecutar la inicialización de Django y su base de datos:  
  `python3 manage.py migrate`

- **Frontend (React)**:
  1. Acceder a la carpeta *Frontend/* y en terminal ejecutar la instalación de paquetes con **yarn**:  
  `yarn install`

### 2.3- Variables de entorno<a name='2.3'></a>

Para el uso del sistema, se requiere que se implemente una API KEY que posibilite el acceso a la API de GPT-3.5, para su obtención, debe acceder al sitio de OpenAI y con su cuenta registrada puede acceder en su apartado de perfil. Para agregar la variable de entorno se debe hacer lo siguiente:

- Dentro de la carpeta *API/chatAPI/api/* crear un archivo llamado **.env** y agregar su API KEY de la siguiente forma:  
  `OPENAI_API_KEY= '<Llave de acceso generada>'`

- Guardar el archivo final

### 2.4- Ejecución<a name='2.4'></a>

ELa siguiente etapa entrega las instrucciones para ejecutar los componentes para comenzar a realizar uso del sistema:

- **Inicialización API (Componente GPT-3.5):**  
  1. Acceder a carpeta *API/chatAPI* con el entorno virtual preparado en la etapa de instalación y ejecutar el comnado para inicializar el sistema:  
  `python3 manage.py runserver`

- **searchAPI (Componente ejecución de código):**  
  1. Acceder a carpeta *searchAPI/execAPI* con el entorno virtual preparado en la etapa de instalación y ejecutar el comnado para inicializar el sistema:  
  `python3 manage.py runserver http://localhost:8001`

- **Frontend (React)**:
  1. Acceder a la carpeta *Frontend/* y en terminal ejecutar la inicialización con **yarn**:  
  `yarn start`

- **Acceso al sistema**
  1. Para el acceso utilizando su navegador de preferencia, basta con acceder al enlace:  
  `http://localhost:3000/`

### 3- Componentes del sistema<a name='3'></a>

Para entregar más detalles al respecto de los componentes, se indican unos comentarios al respecto de cada uno de ellos:

### 3.1- Componente de Frontend<a name='3.1'></a>

Este componente corresponde a un proyecto de NodeJS el cual hace uso de React para llevar a cabo el levantamiento de una interfaz que posibilite la interacción entre el usuario y el sistema completo, su funcionamiento básico se compone de dos vistas, las cuales una contiene la documentación realizada para el uso e instalación del sistema. Y la otra vista entrega la posibilidad de llevar a cabo el Chat correspondiente con las funciones de ejecución de código entregado por el sistema.  
  
Entre sus funciones comprende igualmente el uso de axios para llevar a cabo las consultas a los componentes de ejecución de código y de chat con el modelo GPT. En cuanto a diseño hace uso de la librería MUI para dar un estilo a cada componente.

### 3.2- API GPT<a name='3.2'></a>

Este componente corresponde a una API desarrollada en Django utilizando como librería principal la provista por OpenAI, la cual facilita el acceso, creación y realización del intercambio de mensajes con sus modelos disponibles. En este caso GPT-3.5.  
  
Su funcionamiento es a partir del uso de mensajes JSON que contienen el mensaje y opcionalmente un valor **id_chat** que identifica el chat realizado, de forma que se facilite la creación de historial para que el modelo pueda responder acorde a respuestas entregadas anteriormente.  
  
A partir de una consulta del tipo POST a la url http://localhost:8000/chat se puede realizar el envío para el mensaje al sistema de forma que pueda llevar a cabo el intercambio del mensaje con el modelo GPT-3.5 y de vuelta entregar la respuesta respectiva.  
  
Junto a ello, el componente lleva un registro de las consultas anteriormente realizadas por el sistema, permitiendo llevar a cabo una búsqueda en caso de ser necesaria, el historial de los mensajes antes enviados, siendo ordenados por fecha.

### 3.3- API PyVO<a name='3.3'></a>

Este componente corresponde a una API desarrollada en Django utilizando la version específica de Python 3.8 . Esto debido al requerimiento por parte de las librerias Astropy 4.x y PyVO 0.1.x que requieren de una versión más antigua de python para ser ejecutadas debido a la desventaja antes mencionada con los conocimientos que posee GPT-3.5 para generar código.

Su funcionamiento es semejante a la API desarrollada para llevar a cabo el chat, sin embargo, para ejecutar código, solo requiere de un JSON que contenga un mensaje que sea enviado por POST a la url http://localhost:8001/code. Dentro del mensaje, se debe agregar la respuesta obtenida dentro del chat por parte del modelo para luego ser detectado el bloque único de código entregado y ejecutarlo, para finalmente retornar la salida obtenida por el programa, el cual puede ser un error o el resultado de la ejecución.

### 4- Restricciones de uso<a name='4'></a>

Debido a que corresponde a un prototipo, su funcionamiento puede variar dependiendo del dispositivo que ejecute el sistema final, por ello, se recomienda no tener un límite en recursos que impidan la ejecución de los sistemas.  
  
Igualmente, para el uso de funcionalidades como el procesamiento de código debe ser a partir de un bloque de codigo entregado por el chat, que no contenga secciones intermedias con texto.  
  
Para apoyar esto, se implementa una funcionalidad a partir de un comando llamado "QUERY" que le indica al modelo GPT-3.5 la obtención del código para ser presentado.  
  
Junto a ello, se entrega el comando "EXAMPLE" el cual, al ser enviado por el chat, replica una consulta exitosa para probar la componente de ejecución de código, la cual obtiene una imagen del espectro visible de Júpiter. 

### 5. Asistencia<a name='5'></a>

Para mayor asistencia o comentarios al respecto de la ejecución, puede utilizar la herramienta de issues dentro del repositorio del proyecto en GitHub para realizar la notificación de algun inconveniente o brindar ayuda al respecto.
  

