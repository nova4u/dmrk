# dmrk.dev

This is a monorepo of personal, open-source and non-commercial projects, made for fun in order to learn something new, build out a portfolio and educate myself. This projects are utilising monorepo to create small web apps.

### See it live

`apps/web`: [dmrk.dev](https://dmrk.dev)           |  `apps/code` : [code.dmrk.dev](https://code.dmrk.dev)
:-------------------------:|:-------------------------:
![dmrk-dev](https://user-images.githubusercontent.com/70252381/193447844-1dd65604-83e6-4983-b298-390773e85d0e.png)  |  ![codedmrk-dev](https://user-images.githubusercontent.com/70252381/193447843-4170bfa0-f6f5-4418-a365-982bcc60293b.png)




### Apps and Packages

- `apps/code`: [Next.js](https://nextjs.org) Code Screenshot Generator, just drop your code in, hit Export and choose ur prefered export method. Have many ideas on what can be improved. Hopefully I'll have enough time to keep improving it.
- `apps/web`: [Next.js](https://nextjs.org) personal portfolio. Still work in progress, had to urgently release, lacks many things, will keep updating it.
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

#### `apps/web`

1. Separate pages for each project, with detailed case studies and all the work thas has been done, what tools were used, what kind of problems were faced, just a full description of the project.
2. `Uses` page with the list of tools, technologies and devices I use for creating :)
3. Maybe blog section ? Sometimes I feel like I need some place, where I can drop everything that is on my mind (only code-releated, hopefully)

Those are the main priorities atm, hopefully I'd have some time in the future to do everything that's planned.

#### `apps/{unknown}`

Basically, minimal app to generate PDF invoices to freelancer or others who might need it,
the overall idea is to start with adjustable template, where you fill out the fields and it generates the pdf invoice file.
