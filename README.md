# DgWallet

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 11.2.6.

## Servidor de desarrollo
Antes de iniciar el servidor de desarrollo se deben instalar las librerías con `npm install` <br>
Ejecute `ng serve` para un servidor de desarrollo. Vaya a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambia alguno de los archivos de origen.


## Build

Ejecute `ng build --prod --base-href = https://domaing.com` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`. Utilice la marca `--prod` para una compilación de producción.

## Configuración 

En la ruta `dg-wallet/src/environments/` encontrará las variables del entorno tanto para el modo de producción y de pruebas. En caso de requerirlo modificar las variables.

### UrlNodo
Nodo del blockchain
### domaing `http://localhost:4200/`
url del dominio que se esta utilizando


En la ruta `dg-wallet/src/app/services/currency.service.ts` modificar la linea 16 con la ruta del archivo PHP
<!--Faltó por cargar-->
`http://localhost/monedas/` a la nueva ruta para la conversión de monedas.

## API utilizadas
`https://api.ethvm.com/` para obtener los tokens <br>
`https://www.etherchain.org/api` para obtener el precio del Gas

## Librerias
bootstrap": 5.0 <br>
crypto-js": ^4.0.0 <br>
d3: ^6.7.0 <br>
file-saver: ^2.0.5 <br>
moment: ^2.29.1 <br>
qrcode: ^1.4.4<br>
web3: ^1.3.6 <br>
ngx-progressbar": ^6.1.1 <br>
Su funcionamiento se describe en el PDF adjunto

## Servidor Blockchain de pruebas
`https://www.trufflesuite.com/ganache`
