// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  UrlNodo: "HTTP://127.0.0.1:7545",
  PassAES: "1",
  Storage: {
    passCrypt: "p",
    KeyAccountCrypt: "d",
    PrivateKey: "k",
    AddresCrypt: "a"
  },
  domaing: "http://localhost:4200/",
  EtherScan: {
    Api_Key: "PSGFK1SJH3KRNPR7XR38RZRKUXZFBD3WKV"
  },
  chain: 'ropsten'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
