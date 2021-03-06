// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // for using web server
  BASE_URL: "https://fernflowers.com/api/",
  RESOURCE_URL: "https://fernflowers.com/",

  //BASE_URL: "https://api.vaccs.io/api/",
  //   BASE_URL: "http://localhost:5000/api/",
  // BASE_URL: "http://13.233.255.96:5002/api/",
  // BASE_URL: "http://localhost:4309/api/"

  // for local testing
  // BASE_URL: "http://localhost:5000/api/",
  // RESOURCE_URL: "http://localhost:5000/",

  IS_LOGGED_IN: "IsLoggedIn"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
