---
title: Migrating Netlify-Build To Typescript
date: 2022-10-30
categories:
  - engineering
  - developer-experience
slug: typescript-migration
keywords:
  - typescript
  - developer-experience
---

[This PR](https://github.com/netlify/build/pull/4413) was one of the first things I worked on when I started at Netlify
and it was followed closely by [another PR](https://github.com/netlify/build/pull/4454) that fixed a null check bug
introduced by the former. The bug was the straw that broke the donkey's back and we decided to migrate
[netlify/build](https://github.com/netlify/build) to Typescript.

The repo itself is popular and receives changes frequently so we can't do a big bang migration where folks leave it a
Javascript repo and find it a Typescript repo. The migration had to be incremental and support the existence of both
Javascript and Typescript files.

The first thing we did was add a build script that simply copied the contents of the src directory to a lib directory
`build: cp -R src/ lib/` and export files from it. So the exports property in package.json changed from
`exports: 'src/index.js'` to `exports: 'lib/index.js'`. Doing this allowed us to verify that changing the `exports`
directory didn't introduce bugs to the packages.

The next natural step was to improve the build script to actually build using the Typescript so the build script became
`build: tsc` and we used the `allowJS: true` compiler option in our tsconfig to allow the building of both Javascript
and Typescript files. That should have worked but we had a peculiar setup dependened on the presence of some yaml files.
So we added a prebuild script that copied them over to the lib directory.

We also came across a curious case of our tests failing because of mismatched snapshots which was caused by our fixture
setup code looking for a tsconfig up the directory tree. It wasn't clear why this was happening and it was not an
important problem to solve so we used a dummy tsconfig file in the fixtures directory so that the project's tsconfig
doesn't leak to the fixture setup.

With most of infrastructure in place we started migrating small parts of the repo to Typescript without inconvening
everyone else with merge conflicts. We were not so lucky with migrating our tests to Typescript because we were using
ava which doesn't support Typescript out of the box and using tsnode/esm loader caused our tests to timeout during
CI/CD. Using tsnode's transipileOnly option worked for some cases but we decided to dump Ava and use Vitest for our
testing.
