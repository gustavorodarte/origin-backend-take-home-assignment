# Origin Backend Take-Home Assignment

## Description

 Application that calculate insurance risk profile by given user information. Made with Node.Js with Express framework inspired in Clean Architecture and DDD principles.

## Overview

This project is comprised of the following languages and libraries:

- [Node v14.2+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Structure](https://www.npmjs.com/package/structure)
- [HTTP Status](https://www.npmjs.com/package/http-status)
- [winston](https://www.npmjs.com/package/winston)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Express Status Monitor](https://www.npmjs.com/package/express-status-monitor)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Jest](https://jestjs.io/)
- [Ramda](https://ramdajs.com/)
- [ESLint](https://www.npmjs.com/package/eslint)

Auxiliary libraries were omitted but can be found in the [package.json](https://github.com/gustavorodarte/origin-backend-take-home-assignment/blob/master/package.json) file.

## Running

* Install the dependencies with: docker-compose run --rm app bash -c "npm i"
* Start a container with: `docker-compose up -d app`
* The app will be running on http://0.0.0.0:3003

## Using the APP

* Just make a POST request to http://0.0.0.0:3003/api/risk-profile

## Testing

* Running test suite with: `docker-compose run --rm specs`


## Linting

* Running lint with: `docker-compose run --rm lint`