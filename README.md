# Learn To Speak

## Created by Catnippers Social Club

### Developoment Team

Frontend Lead Developer / Project Manager / QA Lead: Tomasz Buga (kontakt@tomaszbuga.pl)

### Links

GitBook: https://learn2speak.gitbook.io/learn-to-speak/

GitHub: https://github.com/catnippers

LinkedIn: https://www.linkedin.com/company/79745129

Live Demo: https://learn2speak.app

## Tech Stack

`TypeScript` - Programming Language

`Vue 3` - Progressive JavaScript (and TypeScript) Framework

`Equal UI` - UI Component Library

`Vitest` - UnitTesting Framework

## Getting started
### Prerequisites

`NodeJS` (https://nodejs.org/en/)

### Clone the project repository and install node_modules
Launch `Terminal.app` and navigate (using `cd` command) to directory, where you'd like to store your copy of the source code

Use the `git clone https://github.com/catnippers/learn-2-speak.git` command to clone the repository to your local directory

Use the `npm install` command to install required dependencies in the `node_modules`

Use the `npm run dev` command to run Learn To Speak in development mode (App should be available at http://localhost:3000)

# Development Notes

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Run Tests with Coverage with [Vitest](https://vitest.dev/)

```sh
npm run coverage
```

## Tests

`Vitest` is used as a framework for unit tests.

`Icons` are tested by comparing them to the [snapshot](https://vitest.dev/guide/snapshot.html) - kind of baseline
to compare the actual state of the component with.

***TODO:***

We need to figure out a nice way to perform end-to-end testing with audio examples (recordings should be done by both native and non-native speakers)



