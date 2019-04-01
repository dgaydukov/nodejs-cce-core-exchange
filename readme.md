# Node.js CCE core exchange

## Content
* [Description](#description)
* [Installation](#installation)
* [Built With](#built-with)
* [Project Structure](#project-structure)
* [API](#api)
* [Running tests](#running-tests)
* [Authors](#authors)

### Description

This project is a core of any exchange. It consists of 2 subprojects (please note, that in real world exchange, this 2 should be different projects).
* Balance service - is microservice that stores and handles all balanaces. After every successful trade affected balances are recalculated.
* Mtching engine - is microservice where orders executed against one another. The algorithm is pretty simple. 


### Installation

You can install this project with the following commands:
```shell
# clone the repository
git clone https://github.com/dgaydukov/nodejs-cce-core-exchange.git

# go to repo
cd nodejs-cce-core-exchange

# install
npm i

# run the project
npm start
```


### Built With

* [Node.js v10](https://nodejs.org/fr/blog/release/v10.0.0/)




### Project Structure
```
api - directory with all endpoints to communicate with microservice
balance-service - microservice to store and recalculate users' balances (when orders has been matched)
matching-engine - microservice to match orders against each other
test - directory with tests
helpers.ts - list of additional functions that are used across the project
index.ts - application entrypoint
```

### API

All API calls are under `./src/app/api` folder. For the demonstration purpose all endpoints made as simple HTTP REST service. In real-world application, this is not a good approach, in terms of speed and availability. So in real exchange you would better to use `websocket` or any message broker, like `kafka`.

### Running tests
To run tests, type in consoel `npm test`. This will run all tests under ./test folder. If you want to run specific file, try `npm run test:main`. Change filename in `package.json`.


### Authors

* **Gaydukov Dmitiry** - *Take a look* - [How to become a Senior Javascript Developer](https://github.com/dgaydukov/how-to-become-a-senior-js-developer)


### Plan
```
1. Create balance instance
2. Create matching engine instance with balance instance as constructor paramets
3. populate balance with api
4. api for fetching single balances and matched orders (and general number of orders)
5. api for setting and cancelling orders

But at first simple method in balances to create orders, just to check algorithm
```