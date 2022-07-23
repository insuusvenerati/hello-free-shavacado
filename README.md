[![CI](https://github.com/insuusvenerati/hello-free-shavacado/actions/workflows/workflow.yml/badge.svg?branch=develop)](https://github.com/insuusvenerati/hello-free-shavacado/actions/workflows/workflow.yml)
![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=hello-free-shavacado)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Install dependencies:

- node version 14
- yarn
- `brew install supabase/tap/supabase`

### Clone the project

```bash
git clone https://github.com/insuusvenerati/hello-free-shavacado
```

### Setup authentication

**Sign up for Clerk** at https://clerk.dev/

**Create a new app using passwordless authentication (or whatever providers you want)**

![App Creation](https://i.imgur.com/cAbHeQC.png)

**Create a Supabase JWT Template in Clerk**

Go to your Clerk dashboard, and navigate to JWT Templates. Press "New Template" then select the "Supabase" template to get started.

![alt](https://clerk.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe1ql88v4%2Fproduction%2F98d5c709ac607d2709dd94c11aa0763684860dc1-1832x1527.png%3Ffit%3Dmax%26auto%3Dformat&w=1080&q=75)

This will populate a template with most of what you need. You will still need to:

Use Signing algorithm: HS256

Copy your Supabase JWT Secret into "Signing key"

> Note: Locally, when using the supabase cli, the signing key is `super-secret-jwt-token-with-at-least-32-characters-long`. Hopefully this value will be configurable
> in future versions of the supabase cli.

---

### Start supabase services

```bash
yarn s:start
```

### Run locally

Finally, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO

- Integrate NestJS backend
- Production instructions
- Docker deployment
- Kubernetes deployment
