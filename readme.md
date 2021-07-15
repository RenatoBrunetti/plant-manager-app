![plantmanager](https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-logo-github.png)

# PlantManager

How about giving a few attention to your plants today? 🪴<br>
Now you can do this easily with **PlantManager**.<br>

<br>

[![LinkedIn][linkedin-shield]][linkedin-url]
[![MIT License][license-shield]][license-url]

## Table of Contents

- [About the Project](#about-the-project)
  - [Screens](#screens)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Build and Start](#buildandstart)
- [License](#license)
- [Contact](#contact)

## Abouth the Project

**PlantManager** is a mobile application built with **React Native**, **Expo** and **Typescript**.

### Screens

|||
|:---:|:---:|
|Splash<br><img src="https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-01-github.jpg" width="300px">|Main<br><img src="https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-02-github.jpg" width="300px">|
|Identification<br><img src="https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-03-github.jpg" width="300px">|Loading animation<br><img src="https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-044-github.jpg" width="300px">|
|Select plants<br><img src="https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-05-github.jpg" width="300px">|Save plants<br><img src="https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-06-github.jpg" width="300px">|
|Save plants<br><img src="https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-06-github.jpg" width="300px">|My plants<br><img src="https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-07-github.jpg" width="300px">|
|Delete plant<br><img src="https://renatobrunetti.com.br/public/.github/plantmanager/plantmanager-08-github.jpg" width="300px">||

### Built With

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)

## Getting Started
### Prerequisites

- Node.js
- Yarn

### Installation

1. Clone the repo

```sh
git clone https://github.com/RenatoBrunetti/plantmanager.git
```

2. Install Packages

```sh
yarn
```

## Build and Start

1- Create an environment file (**.env**) in the root folder:
```sh
# Put your ip number here
API_IP=000.000.00.00
# You can use the default port 3333
API_PORT=3333
```

2- Start **json-server**
```sh
# Put the same ip number and port here
json-server ./src/services/server.json --host 000.000.00.00 --port 3333
```

3- Start Project
```sh
yarn start
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Author: Renato Brunetti<br>
E-mail: [development@renatobrunetti.com.br](mailto:development@renatobrunetti.com.br)<br>
Social: [LinkedIn](https://linkedin.com/in/RenatoCarapiaBrunetti/)

<!-- MARKDOWN LINKS & IMAGES -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/RenatoBrunetti/MoveIt/blob/master/license.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/RenatoCarapiaBrunetti/
