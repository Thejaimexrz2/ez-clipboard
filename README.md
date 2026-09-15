# Ez Clipboard
## Introducción

Ez Clipboard es un portapeles en línea, gratuito y sin anuncios. Diseñado para compartir de manera rápida y sin complicaciones textos amplios entre dos o más usuarios.


## Funcionamiento

El usuario podrá ingresar un texto a la página, este se guardara en la base de datos dandole un código al usuario para que otra persona lo ingrese y pueda recuperar el contenido. 

Para un funcionamiento ligero para el host, los textos se eliminan despues de 1 hora de ingresados a la base de datos para dar espacios a otros elementos.

## Características
- **Fácilidad y conveniencia de uso**
- **Libre de recolección de datos**
- **Guardado de textos hasta 1 hora**

## Tecnologías
### React 18 - Frontend
### Flask API - Comunicación página - base de datos
### SQLite - Motor de base de datos

## Instalación
- Copiar el repositorio de github
```bash
git clone https://github.com/Thejaimexrz2/ez-clipboard.git
```

- Crear entorno virtual de python (3.14.7+) en carpeta backend
```bash
python -m venv .venv
```

- Instalar dependencias

```bash
pip install flask flask-cors
```
