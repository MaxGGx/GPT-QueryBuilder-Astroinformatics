# Astroinf-Chat-API
 Desarrollo de API para proyecto de Astroinformática, basado en Django usando ChatGPT
### Instrucciones para el manejo de API:
- Se requiere tener a mano una key para el uso de la API de chat GPT, acceder al siguiente [link](https://platform.openai.com/account/api-keys) para obtener la clave y poder comenzar a utilizar la API
- Una vez se tiene la key, crear una variable de entorno ".env" llamada "OPENAI_API_KEY" y colocar el archivo a la altura de "API/chatAPI/api"
- Crear un entorno virtual de python para luego instalar las librerias requeridas de acuerdo al "requirements.txt"
- Ejecutar el manage.py con el siguiente comando `py manage.py runserver`
- La API iniciará y si todo esta bien, la consola mostrará la api key ingresada dentro de la variable de entorno.
- Acceder a "localhost:8000/inicio" y verificar que aprezca "OK"
- Comenzar a utilizar la API

### Instrucciones para frontend:

- Se requiere tener instalado nodeJS v18+, junto a yarn para el manejo de paquetes
- A la altura de la carpeta Frontend, ejecutar `yarn install` para instalar las librerias
- Luego ejecutar `yarn start` para inicializar el proyecto

### Consultas

- Para el manejo de la API o el Front, preguntar a Vito, si no sabe, preguntar a Iñaki

