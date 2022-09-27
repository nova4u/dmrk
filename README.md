# dmrk.dev

This is a monorepo of personal, open-source and non-commercial projects, made for fun in order to learn something new, build out a portfolio and educate myself. This projects are utilising monorepo to create small web apps.

### See it live
`apps/code` : [code.dmrk.dev](https://code.dmrk.dev)


### Apps and Packages

- `apps/code`:  [Next.js](https://nextjs.org) screenshot generator
- `packages/ui`: Component library that uses [Radix](https://radix-ui.com), [TailwindCSS](https://https://tailwindcss.com/) under the hood, the library is shared across apps (more apps are coming soon).
- `packages/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo
- `packages/config`: The package is used for configuration files, that are going to be shared, atm it contains `tailwind.config.js`

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).


### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```


### Roadmap
#### `apps/code`
There are many ideas, on how it's possible to improve the app, some of them are:
1. Theme selection menu (create multiple themes to choose from).
2. Storing preferences in localStorage.
3. Share the code and preferences through URL params.
4. Add keyboard shortcuts for fast image generations.


#### `apps/{unknown}`
Basically, minimal app to generate PDF invoices to freelancer or others who might need it,
the overall idea is to start with adjustable template, where you fill out the fields and it generates the pdf invoice file.

