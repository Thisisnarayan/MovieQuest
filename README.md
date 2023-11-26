# MovieQuest

## Hosting URL: https://moviequest-ee0cd.web.app

## This webapp is created using angular 17 , firebase , TBDM apis

## firebase setup

- create a new firebase project 
- intall firebase-tools
- firebase login
- add secret key for jwt token - firebase functions:config:set secret.key="your_key"
- for local development get key inside function folder - firebase functions:config:get > .runtimeconfig.json
- for deployement - 1. ng build - 2. firebase deploy (this will deploy functions in firebase function and angular build in hosting)

- create enviroment.prod.ts file and add following keys
    - REST_API_SERVER (your firebase function api path)
    - api_key (your tmdb api key)
    - firebaseConfig (firebase config details)

    
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.4".

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.



