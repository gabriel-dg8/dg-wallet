import { environment } from "src/environments/environment";
declare const bootstrap;

export const menu = {
    brand: {
        title: "Wallet DG",
        icon: "assets/dg-wallet.svg",
        path: "/"
    },
    items: [
        {
            title: "Home",
            path: "/",
            icon: "",
            func: null
        },
        {
            title: "Blocks",
            path: "/blocks",
            icon: "",
            func: null
        },
        {
            title: "New Account",
            path: "#",
            icon: "",
            func: function () {
                var NewAccountModal = new bootstrap.Modal(document.getElementById('NewAccountModal'), {
                    keyboard: false
                });
                NewAccountModal.show();
            }
        },
        {
            title: "Login",
            path: "#",
            icon: "",
            func: function () {
                var loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
                    keyboard: false
                });
                loginModal.show();
            }
        }
    ]
}

export const menuSign = {
    brand: {
        title: "Wallet DG",
        icon: "assets/dg-wallet.svg",
        path: "/dg/dashboard"
    },
    items: [
        {
            title: "Blocks",
            path: "dg/blocks",
            icon: "",
            func: null
        },
        {
            title: "Tokens",
            path: "dg/tokens",
            icon: "",
            func: null
        },
        {
            title: "My Transactions",
            path: "dg/my-transaccions",
            icon: "",
            func: null
        },
        {
            title: "Send Transaction",
            path: "dg/send-transaccion",
            icon: "",
            func: null
        },
        {
            title: "SignOut",
            path: "#",
            icon: "",
            func: function () {
                localStorage.clear();
                if (window.location.pathname.includes("dg")) {
                    window.location.href = environment.domaing;
                }
            }
        }
    ]
}