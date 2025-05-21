# Project "Form Generator"
[![Actions Status](https://github.com/Teihden/typescript-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Teihden/typescript-project-81/actions/workflows/hexlet-check.yml)
[![CI](https://github.com/Teihden/typescript-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/Teihden/typescript-project-81/actions/workflows/ci.yml)
[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=Teihden_typescript-project-81)

## About
**"Form Generator"** is a library. It takes care of error handling and other tasks for which you usually need to write a lot of template code.

## Usage

You should have Node.js installed before proceeding. Only test JS against v21 and on macOS.

```shell
# Clone the repo
git clone https://github.com/Teihden/typescript-project-81
cd typescript-project-81

# Runs the linter to check frontend code for errors.
make lint

# Performs installation of project dependencies from package.json
make install

# Starts the nodemon
make start

# Cleans the frontend build directory (frontend/build) and runs the build process
make build

# Runs test with Vitest
make test

# Runs test-coverage
make test-covergae
```
