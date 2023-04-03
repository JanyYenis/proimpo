# PROIMPO

Prueba Técnica Jany Esteban Escobar - Desarrollador Junior.

## Caracteristicas

- Simple y fácil de entender.
- Estructura simple y limpia.
- URLs amigables (básico).
- PDO para acceso a la base de datos.
- Código PHP nativo.

## Requerimientos

- PHP 7.0 o posterior.
- MySQL.
- Recomendamos el aplicativo XAMPP que incluye tanto PHP y MySQL.

## Instalación usando XAMPP

- Paso 1: Descargue e instale el aplicativo XAMPP.
- Paso 2: Ingrese al siguiente enlace de github (https://github.com/JanyYenis/proimpo).
- Paso 3: Pulse el botón Code y descargue la carpeta .ZIP en la siguiente ruta de su PC (C:\xampp\htdocs).
- Paso 4: Abra el navegador e ingrese a la siguiente ruta (http://localhost/phpmyadmin/).
- Paso 5: Pulse el botón que se encuentra en la parte superior que dice Bases de Datos.
- Paso 6: En el campo Nombre de la base de datos escribimos (proimpo) y le damos en el botón de crear.
- Paso 7: Pulse el botón que se encuentra en la parte superior que dice Importar.
- Paso 8: Pulse el botón Seleccionar archivo, busque el archivo proimpo.sql que se encuentra en la base de la carpeta del proyecto, selecciónelo y pulse el botón continuar que se encuentra en la parte inferior.
- Paso 9: Abra otra pestaña en el navegador e ingrese a la siguiente ruta (http://localhost/proimpo/Home)

## Uso

- Paso 1: Regístrese (Se registrara con el cargo de Administrador).
- Paso 2: Login, debe ingresar con su Email y contraseña.
- Paso 3: Ingrese a la vista de Usuarios (Se mostrará el listado de los usuarios que tengan el cargo de Vendedores y   de Supervisores, la acción de Ventas se mostrara solo para los usuarios que tengan el cargo de Vendedores).
- Paso 4: Pulse el botón de Agregar Usuario (se abrirá una venta) lea la información e ingrese los datos
- Paso 5: Si el usuario ingresado tenía el cargo de Vendedor pulse el botón de ventas (se abrirá una venta) podrá ver el listado de las ventas de ese usuario, y también podrá agregar otra venta al pulsar el botón Agregar Venta
- Paso 6: Pulse el botón Calcular comisión y seleccione la opción Comisión Total, se mostrara una columna donde podrá ver la comisión que recibirá cada usuario.

## Seguridad

El script utiliza mod_rewrite y bloquea todo el acceso a todo lo que esté fuera de la carpeta `/public`. Para las solicitudes a la base de datos se utiliza PDO para evitar inyección SQL.