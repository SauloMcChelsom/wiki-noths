# WikiNoths

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Comando para analisar e corrigir um arquivo específico

`npx eslint --fix caminho/para/seu/arquivo.ts`.
### Explicação:
###### `--fix`: Aplica as correções automáticas.
###### `caminho/para/seu/arquivo.ts`: Caminho do arquivo que você deseja analisar.

###### Isso vai analisar apenas o arquivo especificado e aplicar as correções de linting e formatação definidas nas regras do ESLint e Prettier.


### Rodar o comando para corrigir o código automaticamente:
`npx eslint --fix .`

### Limpar o cache do ESLint e rodar novamente
`eslint --cache --cache-location node_modules/.cache/eslint --fix`

### Integrar com o VS Code
`
{
  "editor.formatOnSave": true,
  "eslint.validate": [
    "javascript",
    "typescript",
    "html",
    "typescriptreact"
  ],
  "eslint.alwaysShowStatus": true,
  "eslint.autoFixOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
