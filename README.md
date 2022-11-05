# Commands

Comandos utilizados para inicializar o server:

```
mkdir server
cd server
npm init -y
// install all deps e devDeps
npx tsc --init
npx prisma init --datasource-provider SQLite

```

Comando utilizados para inicializar o front-end

```
npx create-next-app@latest --use-npm
cd web
```

--

Comandos utilizados para inicializar o Mobile

> Primeiro cria o mobile depois o back e o web

```
#Instalar Expo
npm install -g npm
npm install -g expo-cli
npx create-expo-app mobile
cd mobile
# verificar documentação e instalar o native no expo
# https://docs.nativebase.io/install-expo
```
