---
title: From Javascript To Typescript
date: 2022-10-30
categories:
  - engineering
  - developer-experience
slug: js-to-ts
keywords:
  - typescript
  - developer-experience
---

The advantages of Typescript over Javascript are obvious and little convincing is required to persuade a team to migrate
from Javascript to Typescript. For historical reasons [netlify/build](github.com/netlify/build) was in Javascript and we
decided to migrate it to Typescript in an effort to improve developer experience.

[netlify/build](github.com/netlify/build) is an opensource monorepo and receives frequent contributions. This
constrained us from performing a big bang migration which has the risk of large merge conflicts. The migration had to be
transparent, making it possible for devs to add changes without noticing that the underlying tooling was changing.

A package.json file has an `exports` property which is a package's main entry point. Initially the property was
`exports: 'src/index.js'` because were publishing directly from the **src** directory but Typescript usually outputs
build files in different directory normally called lib or dist. We used lib in our case. So we used the build script to
simply **copy files** from src to lib, `build: cp -R src/ lib/` and changed the exports propetry to
`exports: lib/index.js`. Doing this means devs could keep contributing to the repo without noticing that we are now
publishing from a different directory.

Next we needed to support both Javascript and Typescript files so that devs could add new Typescript files and
optionally migrate Javascript files to Typescript. We wanted people to be productive and avoided imposing a migration
tax in their workflow. We used the `allowJS: true` compiler option to allow the building of js files and added
`"include": ["src/**/*.ts", "src/**/*.js"]` in our tsconfig.json.

With most of the infrastructure in place we started migrating small parts of the repo to Typescript without inconvening
everyone else with merge conflicts. Since we couldn't migrate all packages in the monorepo ourselves we decided to use a
github-action to nudge devs who added changes to a Javascript file to convert the file to Typescript.
