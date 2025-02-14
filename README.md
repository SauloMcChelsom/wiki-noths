# WikiNoths

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## 📌 Padrão de Nomeação de Branches
  ```text
  master              → Versão estável, pronta para produção.

  develop             → Branch principal de desenvolvimento.

  feature/task-1      → Para novas funcionalidades.

  bugfix/task-2       → Para correções de bugs fora da release.

  refactor/task-3     → Refatoração de código.

  fix/task-4          → Correção de bug.

  hotfix/task-5       → Para correções urgentes em produção.

  chore/task-6        → Alterações menores (configuração, documentação).

  staging             → Versão que será testada antes de ir para produção.

  release/v1-0-2      → Para preparar versões estáveis.

```
```

## **🛠  fluxo de branches do seu projeto **
                      +----------------------+
                      |      master          | <-- Versão estável (produção)
                      +----------------------+
                                ↑
                                |
                      +----------------------+
                      |      staging         | <-- Testes antes da produção
                      +----------------------+
                                ↑
                                |
                      +----------------------+
                      |      release/v1-0-2  | <-- Preparação da versão estável
                      +----------------------+
                                ↑
                                |
                      +----------------------+
                      |      develop         | <-- Desenvolvimento principal
                      +----------------------+
             ┌────────┴───────────┬──────────┬──────────┬──────────┐
             |                    |          |          |          |
 +------------------+   +-----------------+  +----------------+  +------------------+
 | feature/task-1   |   | bugfix/task-2   |  | refactor/task-3 |  | chore/task-6    |
 | Nova funcionalidade |  | Correção de bug  |  | Refatoração      |  | Alterações menores |
 +------------------+   +-----------------+  +----------------+  +------------------+
                                                                |
 +------------------+   +-----------------+
 | fix/task-4      |   | hotfix/task-5   |
 | Correção de bug |   | Correção urgente |
 +------------------+   +-----------------+

```

#### Explicação do Fluxo de Trabalho
```text
master → Branch principal e estável, usada para produção.

develop → Branch principal de desenvolvimento.

feature/task-1 → Para novas funcionalidades.

bugfix/task-2 → Correção de bugs encontrados antes de um release.

refactor/task-3 → Refatorações sem mudança de funcionalidade.

fix/task-4 → Correções normais de bugs.

hotfix/task-5 → Correções urgentes diretamente em produção.

chore/task-6 → Alterações menores como configurações ou documentação.

staging → Ambiente de homologação/teste antes de ir para master.

release/v1-0-2 → Preparação de uma versão estável antes de ir para staging e master.
```

## 📌 Padrão de Nomeação de commits
#### Exemplo de commit
```text
  feat: add login and signup pages
  fix: adjust padding on header
  refactor: extract header to a component
  chore: update angular version
```

#### Instalação do Cody

---
 - Abra o Visual Studio Code.
 - Clique no ícone de extensões no painel lateral esquerdo.
- Na barra de pesquisa, digite "Cody" e pressione Enter.
- Encontre a extensão "Cody: AI Code Assistant" desenvolvida pela Sourcegraph e clique em "Instalar".
---
#### Mensagem para Cody

---
to write only a commit title message to describe the changes made in all files for this diff using this pattern: `feat`, `fix`, `refactor`, `revert`, `style`, `test`, `i18n`, `initial`, `analytics`, `database`, `mock`, `build`, 'ci`, `chore` e `doc` The massage must be imperative and in lowercase.
---

#### Como pensar para criar um commit
---
- Deve ser imperativo
- Fala o que foi feito, e não o que você fez
- Se eu aplicar esse commit, esse commit vai fazer o que?
---


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
```json
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
```

#### Testar um arquivo específico no Angular com Jasmine e Karma
```sh
ng test --include=src/app/caminho/do/arquivo.spec.ts
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
