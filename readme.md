# Node.js CCE core exchange

## Content
* [Description](#description)
* [Installation](#installation)
* [Built With](#built-with)
* [Project Structure](#project-structure)
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
balance-service - microservice to store and recalculate users' balances (when orders has been matched)
matching-engine - microservice to match orders against each other
helpers.ts - list of additional functions that are used across the project
index.ts - application entrypoint
```


### Authors

* **Gaydukov Dmitiry** - *Take a look* - [How to become a Senior Javascript Developer](https://github.com/dgaydukov/how-to-become-a-senior-js-developer)
