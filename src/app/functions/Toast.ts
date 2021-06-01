/**
 * Mensajes tipo Toast
 */
export class Toast {

    /**
     * Muestra un mensaje de tipo toast al usuario
     * @param text texto a mostrar
     */
    static show(text: string) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.textContent = text;
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    /**
     * Muestra un mensaje de tipo toast al usuario notificando un evento correcto
     * @param text texto a mostrar
     */
    static sucess(text: string) {
        var x = document.getElementById("snackbar");
        x.className = "show sucess";
        x.textContent = text;
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    /**
     * Muestra un mensaje de tipo toast al usuario notificando un evento erroneo
     * @param text texto a mostrar
     */
    static error(text: string) {
        var x = document.getElementById("snackbar");
        x.className = "show error";
        x.textContent = text;
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
}