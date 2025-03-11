## Setup de la librería para uso local
Clonamos el repo de la librería, levantamos una terminal en la ruta del proyecto e instalamos los paquetes y las dependencias:
> `npm i`


Luego ejecutamos los siguientes comandos para buildear un empaquetado del proyecto localmente y que nos permita editar el proyecto con livereload.
> `npm run build`

> `npm run watch`

Esto nos generará un archivo con una ruta parecida a la siguiente:
```
------------------------------------------------
Built Angular Package
 - from: /Users/jorgeherrera/Documents/BluecoreStuff/Repos/gb-components-library/projects/components-library
 - to:   /Users/jorgeherrera/Documents/BluecoreStuff/Repos/gb-components-library/dist/components-library
------------------------------------------------
Build at: 2025-03-10T20:51:30.523Z - Time: 954ms1
```

Copiamos la ruta:
> **to:** `/Users/../../dist/components-library`


## Instalación de la librería localmente
Luego de copiar la ruta, nos dirijimos a nuestro proyecto donde instalaremos la librería.

Utilizando la ruta copiada, ejecutamos el comando de instalación en la terminal:
> `npm i /Users/../../dist/components-library`

Una vez instalada, debemos poder ver el paquete listado con la ruta local en el archivo `package.json`.

> `Nota: Luego de instalar localmente, no subir los cambios del package.json al remoto.`


## Publicación de nuevas versiones al JFrog
La librería cuenta con un archivo de pipelines que se encarga de empaquetar la librería y publicar las nuevas versiones en el JFrog una vez se ejecuten todos los steps.

> `Nota: Falta configurar el pipeline para que publique la librería con una versión distinta dependiendo del ambiente de desarrollo. Ejemplo: QA, Development, Prod, Feature, etc.`


## Factores a considerar para instalar la librería
### Archivo npmrc
Este archivo se encarga de explicar a npm en cuáles registry debe encontrar los paquetes a instalar.

En nuestro caso en particular tenemos 2 registries:
- **npm registry público**
- **jfrog registry**

Nuestro archivo npmrc debe verse parecido a este:
```
registry=https://registry.npmjs.org/

//trialtoh1md.jfrog.io/artifactory/api/npm/jfrog-test-npm/:_authToken=<JFROG_TOKEN>
email=<JFROG_MAIL>
registry=https://trialtoh1md.jfrog.io/artifactory/api/npm/jfrog-test-npm/
always-auth=true
```

> **JFROG_TOKEN**: Este es el token de autenticación que se consigue desde Jfrog, se configura como una variable de entorno del repositorio para consolidar la seguridad del código.

> **JFROG_MAIL**: Al igual que el token, se configura como variable de entorno, es el correo que se utiliza para acceder al Jfrog.

> `Nota: Para instalar localmente se necesitan ambos valores, estos no deben ser agregados ni pusheados en el PR.` *Se sugiere agregar el token en algún vault para acceso de todos.*

### Archivo angular
El archivo de configuración `angular.json` del proyecto madre (donde se instala la librería) debe tener habilitada la opción de `preserveSymlinks` en el bloque de código de esta manera:
```
"projects": {
    "app": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "preserveSymlinks": true,
          },
        }
      }
    }
}
```

### Errores comúnes
> **Incompatibilidad de versiones de angular**

Cuando nos encontremos con errores de ejecución por parte de angular que especifique que el type de un componente no concuerda con el de la instalación, parecido a este:
```
Property '__@ɵINPUT_SIGNAL_BRAND_WRITE_TYPE@1552' does not exist on type 'InputSignal<boolean>'. Did you mean '__@ɵINPUT_SIGNAL_BRAND_WRITE_TYPE@1567'?ngtsc(2551)
```

Lo más probable es que la versión de angular instalada en el proyecto no sea la misma que la de la librería.

Para corregir esto debemos borrar el `node_modules` y el `package-lock.json`, y volver a instalar las dependencias de ambos.

---

> **Login requerido para acceder a registry**

Si nos encontramos con un error que nos indique que debemos iniciar sesión para instalar los paquetes, debemos revisar el archivo `npmrc` y asegurarnos de haber reemplazado el token de autenticación.

