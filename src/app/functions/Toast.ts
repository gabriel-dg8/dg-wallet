export class Toast {
    static show(text: string) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.textContent = text;
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    static sucess(text: string) {
        var x = document.getElementById("snackbar");
        x.className = "show sucess";
        x.textContent = text;
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    static error(text: string) {
        var x = document.getElementById("snackbar");
        x.className = "show error";
        x.textContent = text;
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
}