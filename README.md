# 🚀 TypeScript Node Starter

- [🚀 TypeScript Node Starter](#-typescript-node-starter)
  - [Pre-reqs](#pre-reqs)
  - [TypeScript + Node](#typescript--node)
  - [Project Structure](#project-structure)
  - [Building the project](#building-the-project)
    - [Configuring TypeScript compilation](#configuring-typescript-compilation)
    - [Running the build](#running-the-build)
  - [Type Definition (`.d.ts`) Files](#type-definition-dts-files)
    - [Installing `.d.ts` files from DefinitelyTyped](#installing-dts-files-from-definitelytyped)
    - [What if a library isn't on DefinitelyTyped?](#what-if-a-library-isnt-on-definitelytyped)
      - [Setting up TypeScript to look for `.d.ts` files in another folder](#setting-up-typescript-to-look-for-dts-files-in-another-folder)
  - [Debugging](#debugging)
    - [Source maps](#source-maps)
      - [Configuring source maps](#configuring-source-maps)
  - [Testing](#testing)
    - [Running tests](#running-tests)
    - [Watching tests](#watching-tests)
    - [Writing tests](#writing-tests)
  - [ESLint](#eslint)
    - [ESLint rules](#eslint-rules)
- [Dependencies](#dependencies)

## Pre-reqs

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/)
- Install [Docker](https://www.docker.com/products/docker-desktop)
- Install [Docker Compose](https://docs.docker.com/compose/install/)
- Copy `.env.example` to `.env`, checkout the file to check the defaults values

## TypeScript + Node

## Project Structure

The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_ and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` and `views` folders remain top level as expected.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name                                   | Description                                                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **.vscode**                            | Contains VS Code specific settings                                                                         |
| **dist**                               | Contains the distributable (or output) from your TypeScript build. This is the code you ship               |
| **node_modules**                       | Contains all your npm dependencies                                                                         |
| **src**                                | Contains your source code that will be compiled to the dist dir                                            |
| **src/modules/**                       | Application module each module should respect Single Responsability Principle                              |
| **src/modules/`__name__`/controllers** | Controllers define functions that respond to various http requests                                         |
| **src/modules/`__name__`/models/**     | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB               |
| **src/modules/`__name__`/types**       | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](#type-definition-dts-files) |
| **src**/index.ts                       | Entry point to your express app                                                                            |
| **`src\/__test__/\*.ts`**              | Contains your tests. Separate from source because there is a different build process.                      |
| **backups**                            | Store services backup (ex. mongodb.dump)                                                                   |
| .env.example                           | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos.              |
| jest.config.js                         | Used to configure Jest running tests written in TypeScript                                                 |
| package.json                           | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) |
| tsconfig.json                          | Config settings for compiling server code written in TypeScript                                            |
| .eslintrc                              | Config settings for ESLint code style checking                                                             |
| .eslintignore                          | Config settings for paths to exclude from linting                                                          |

## Building the project

It is rare for JavaScript projects not to have some kind of build pipeline these days, however Node projects typically have the least amount of build configuration.
Because of this I've tried to keep the build as simple as possible.
If you're concerned about compile time, the main watch task takes ~2s to refresh.

### Configuring TypeScript compilation

TypeScript uses the file `tsconfig.json` to adjust project compile options.
Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled.

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */
    "resolveJsonModule": true,
    "target": "ES6",
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    "sourceMap": true /* Generates corresponding '.map' file. */,
    "outDir": "dist" /* Redirect output structure to the directory. */,
    "rootDir": "./src" /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */,
    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. */,

    /* Module Resolution Options */
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,

    /* Advanced Options */
    "skipLibCheck": true /* Skip type checking of declaration files. */,
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  }
}
```

### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:

| Npm Script | Description                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------- |
| `watch`    | Runs all watch tasks (TypeScript, Sass, Node). Use this if you're not touching static assets. |
| `test`     | Runs tests using Jest test runner                                                             |
| `jest`     | Runs tests in watch mode                                                                      |
| `debug`    | Performs a full build and then serves the app in watch mode                                   |

## Type Definition (`.d.ts`) Files

TypeScript uses `.d.ts` files to provide types for JavaScript libraries that were not written in TypeScript.
This is great because once you have a `.d.ts` file, TypeScript can type check that library and provide you better help in your editor.
The TypeScript community actively shares all of the most up-to-date `.d.ts` files for popular libraries on a GitHub repository called [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types).
Making sure that your `.d.ts` files are setup correctly is super important because once they're in place, you get an incredible amount of high quality type checking (and thus bug catching, IntelliSense, and other editor tools) for free.

> **Note!** Because we're using `"noImplicitAny": true`, we are required to have a `.d.ts` file for **every** library we use. While you could set `noImplicitAny` to `false` to silence errors about missing `.d.ts` files, it is a best practice to have a `.d.ts` file for every library. (Even if the `.d.ts` file is [basically empty!](#writing-a-dts-file))

### Installing `.d.ts` files from DefinitelyTyped

For the most part, you'll find `.d.ts` files for the libraries you are using on DefinitelyTyped.
These `.d.ts` files can be easily installed into your project by using the npm scope `@types`.
For example, if we want the `.d.ts` file for jQuery, we can do so with `npm install --save-dev @types/jquery`.

> **Note!** Be sure to add `--save-dev` (or `-D`) to your `npm install`. `.d.ts` files are project dependencies, but only used at compile time and thus should be dev dependencies.

In this template, all the `.d.ts` files have already been added to `devDependencies` in `package.json`, so you will get everything you need after running your first `npm install`.
Once `.d.ts` files have been installed using npm, you should see them in your `node_modules/@types` folder.
The compiler will always look in this folder for `.d.ts` files when resolving JavaScript libraries.

### What if a library isn't on DefinitelyTyped?

If you try to install a `.d.ts` file from `@types` and it isn't found, or you check DefinitelyTyped and cannot find a specific library, you will want to create your own `.d.ts file`.
In the `src` folder of this project, you'll find the `types` folder which holds the `.d.ts` files that aren't on DefinitelyTyped (or weren't as of the time of this writing).

#### Setting up TypeScript to look for `.d.ts` files in another folder

The compiler knows to look in `node_modules/@types` by default, but to help the compiler find our own `.d.ts` files we have to configure path mapping in our `tsconfig.json`.
Path mapping can get pretty confusing, but the basic idea is that the TypeScript compiler will look in specific places, in a specific order when resolving modules, and we have the ability to tell the compiler exactly how to do it.
In the `tsconfig.json` for this project you'll see the following:

```json
"baseUrl": ".",
"paths": {
    "*": [
        "node_modules/*",
        "src/types/*"
    ]
}
```

This tells the TypeScript compiler that in addition to looking in `node_modules/@types` for every import (`*`) also look in our own `.d.ts` file location `<baseUrl>` + `src/types/*`.
So when we write something like:

```ts
import * as flash from 'express-flash';
```

First the compiler will look for a `d.ts` file in `node_modules/@types` and then when it doesn't find one look in `src/types` and find our file `express-flash.d.ts`.

## Debugging

Debugging TypeScript is exactly like debugging JavaScript with one caveat, you need source maps.

### Source maps

Source maps allow you to drop break points in your TypeScript source code and have that break point be hit by the JavaScript that is being executed at runtime.

> **Note!** - Source maps aren't specific to TypeScript.
> Anytime JavaScript is transformed (transpiled, compiled, optimized, minified, etc) you need source maps so that the code that is executed at runtime can be _mapped_ back to the source that generated it.

The best part of source maps is when configured correctly, you don't even know they exist! So let's take a look at how we do that in this project.

#### Configuring source maps

First you need to make sure your `tsconfig.json` has source map generation enabled:

```json
"compilerOptions" {
    "sourceMap": true
}
```

With this option enabled, next to every `.js` file that the TypeScript compiler outputs there will be a `.map.js` file as well.
This `.map.js` file provides the information necessary to map back to the source `.ts` file while debugging.

> **Note!** - It is also possible to generate "inline" source maps using `"inlineSourceMap": true`.
> This is more common when writing client side code because some bundlers need inline source maps to preserve the mapping through the bundle.
> Because we are writing Node.js code, we don't have to worry about this.


## Testing

For this project, I chose [Jest](https://facebook.github.io/jest/) as our test framework.
Basically we are telling Jest that we want it to consume all files that match the pattern **`src\/__test__/\*.ts`** (all `.test.ts` files in the `__test__` folder), but we want to preprocess the `.ts` files first.
This preprocess step is very flexible, but in our case, we just want to compile our TypeScript to JavaScript using our `tsconfig.json`.
This all happens in memory when you run the tests, so there are no output `.js` test files for you to manage.

### Running tests

Simply run `npm run test`.
Note this will also generate a coverage report.

### Watching tests

Simply run `npm run jest`.
Note this will also generate a coverage report.

### Writing tests

Writing tests for web apps has entire books dedicated to it and best practices are strongly influenced by personal style, so I'm deliberately avoiding discussing how or when to write tests in this guide.
However, if prescriptive guidance on testing is something that you're interested in, [let me know](https://www.surveymonkey.com/r/LN2CV82), I'll do some homework and get back to you.

## ESLint

ESLint is a code linter which mainly helps catch quickly minor code quality and style issues.

### ESLint rules

Like most linters, ESLint has a wide set of configurable rules as well as support for custom rule sets.
All rules are configured through `.eslintrc.yaml` configuration file.
In this project, we are using a fairly basic set of rules with no additional custom rules.

# Dependencies

Dependencies are managed through `package.json`.
