# NOTES

- Canvas is a native dep, that why its deployed as AWS Layer. Make sure to visit https://github.com/jwerre/node-canvas-lambda
- Build two addition layers
- ClaudiaJS cannot be used to deploy the app - else the OSX canvas lib would be deployed which would not work. Thats why I deployed manually
- remove the canvas dep when deploy
- should automate that part somehow...

