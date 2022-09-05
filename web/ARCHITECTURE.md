# Intrvwr Application with Next JS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000] with your browser to see the result.

## Architecture

- Architecture overview:
  - The name of each directory is the name of the component / page itself
  - Each directory contains an `index.tsx` which is the entry point to the component named after the directory
  - Each directory contains a `components` file for small components the page uses

```sh
> $ tree -L 1

# =========== Main project files ===========
.
├── pages # Views and front-facing logic for the app
├── public # public assets
├── src # Main code
├── styles # Global styles

## =========== Pages ===========
| _app.tsx # Entry point
├── Auth # auth page ('/auth')
│   ├── login # login component of the auth page
│   ├── signup # Signup component of the auth page
└── index.tsx # Home Page ('/')

## =========== Src ===========
└── Context # React Context Api
└── Common # common components and styles
└── Modules # Individual modules
└── Services # Communicating with backend

## =========== Context ===========
└── AuthContext.tss # Store user in auth context
└── index.tsx # Contain all custom hooks from context

## =========== Services ===========
└── AuthService.ts # Communicating with backend with regards to authentication

## =========== Modules ===========
└── AuthModule # Authentication Module

# =========== Configurations ===========

├── package.json # Project config
├── tsconfig.json # Type script config
├── next.config.js # Styled components config
└── yarn.lock # contains exact versions to ensure builds are consistent across project

```
