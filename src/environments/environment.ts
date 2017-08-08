// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAFdvShCGJlUBC8bZXOq668_42uv6FAYew",
    authDomain: "de-streek-in.firebaseapp.com",
    databaseURL: "https://de-streek-in.firebaseio.com",
    projectId: "de-streek-in",
    storageBucket: "de-streek-in.appspot.com",
    messagingSenderId: "917159139583"
  }
};