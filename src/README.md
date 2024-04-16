# Thread Color Palette Generator API

## About
This thread color palette generator api allows users to create an account, generate color palettes based on DMC color codes, as well as save and delete color palettes to their account. 

## Live Link
https://color-palette-tau.vercel.app/


## Technologies Used
* Javascript
* Node.js
* Express
* PostgreSQL
* RESTful API

## Screenshots

![ home screen](./src/img/thread-palette-generator.jpg)

![ palette results screen](./src/img/search-results.png)

![ saved palettes screen](./src/img/saved-palettes.png)

## Base URL
https://color-generator-tool.onrender.com/


## Response
* JSON

## Authentication
* Requires JWT token

Each request must include  `content-type: application/json` and `Authorization: Bearer [token]`

## Create New User
* POST /api/users
* Request Body must include: username, first_name, user_password 

## Log In
* POST /api/auth/login
* Request Body must include username, user_password

## Palettes

### GET color palettes
* /color-palette to request a color palette
* required color scheme query: `mode=[triad, quad, monochrome, complement]`
* required count query: `count=[number]`
* required colorCode query: `colorCode=[DMC color code]`

### GET all DMC thread colors
* /thread-colors to request an array of all DMC colors
* /thread-colors/:id to get a specific color by DMC color code

## User's Saved Palettes

### GET saved palettes
* /saved-palettes to get all saved palettes
* /api/projects/:id to get a palette by id

### DELETE user's saved palette
* /saved_palettes/:id

### POST save a stitch to user
* /api/saved_stitches/
* Request Body must include palette_name, colors (array of color ids)

