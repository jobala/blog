---
title: Slow Is Smooth, Smooth Is Fast
date: 2024-09-01T12:11:09+03:00
---

Hello world

Move fast and break things was popularized by Facebook and many startups followed suit to their own detriment because when you break things you have to fix them. The piper always has to get paid and when you don't have Facebook's resources at your disposal, the cost of fixing broken things is an existential threat. Which is why at Quill Dev Tools we focus on building things right the first time even though the progress feels slow because we believe slow is smooth and smooth is fast.

With that said, moving fast is indeed a virtue and the best teams I have been in shipped quickly and frequently. However, I have also seen teams unable to ship new features because they spend all their time responding to customer complaints and fixing bugs. "Fast" should be integrated over time and to be able to ship things faster in the future you need to spend more time in the present building the right way.

Off the shelves solutions help you focus on building your product but they come at a cost and lead to vendor lock in. [Sometimes you're better off renting a bare metal server instead of the cloud](https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0). Building with constrained resources means that it is not enough that the solution works but that it is cost effective. In fact, I have seen companies go out of business because of expensive features.

Our process at Quill Dev Tools is designed to make us build the right thing, the right way and cheaply. Customers are the center of our strategy and instead of playing tricks on the customer to increase engagement we focus on being useful to them. We begin with the customer and their needs to make sure that we are building the right thing.

Design documents are central to our development workflow, they help us build the right thing the right way. It is also easier to discover and fix issues when no code has been written. Once a design document is ready and all the feedback has come in, my co-founder and I meet to discuss any unresolved questions and make sure that we are all on the same page.

Our code review process is quite thorough and we avoid doing YOLO reviews as much as we can. The pull request author has to write step by step instructions on how to manually test their change set and the reviewer is obliged to follow through the testing instructions. We also check for logic bugs during the PR review. All pull requests are accompanied by an extensive test suite and we go out of our way to make sure tests are effective and accurate, it takes time but saves us more time in the future.

When we get things wrong as it happens from time to time, we refactor our codebase to the ideal state and our test suite gives us confidence to refactor mercilessly. If the tests pass, the system is shippable. Our general attitude towards refactoring is "do it now" because tomorrow has its own troubles.

In software engineering, mistakes compound and so does the cost of fixing them. And at Quill Dev Tools we try to minimize our engineering costs as much as we can

