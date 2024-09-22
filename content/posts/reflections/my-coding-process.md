---
title: "My Coding Process"
date: 2024-09-18T12:24:39+03:00
---

Performing consistently at a high level is what separates the wheat from chaff in any industry and motivation is an unreliable servant, ebbing and flowing over time. However, having systems in place and the discipline to follow through helps you do your best all the time. I have had many battle scars and this article is a crystallization of my process and I would love to learn about yours.
## Before Development

I have put the cart before the horse numerous times, jumping to writing code without a good grasp of the problem I am solving often to my own detriment. A problem well understood is a problem half solved, therefore, I have learnt to take my time and seek clarity from stakeholders and documentation. 

For some problems, speaking to people is not enough and the problem only clicks after sketching it out. I am sketching loosely here and I don't mean to draw it out but instead to understand the problem's general form. In such cases, I opt to prototype a solution so as to get more insight and develop intuition.


For example, while working on Quill Dev Tool's, network traffic inspection I prototyped the solution by answering the following questions.

1. How do I intercept traffic from an emulator
2. How do I intercept traffic for a particular app
3. How do I get the response and request body from a request

Answers to these questions were working solutions. Ie I cobbled up some commands to intercept traffic from the emulator. You don't have to write code for a prototype and sometimes a bash script is enough.

By the time I am done with prototyping the solution begins to appear and the dots start connecting. I then write a design document to bring everything together and describe my solution, tradeoffs and assumptions. The design document also specifies how the problem is broken down.

## During Development

Writing tests is critical and gives you peace of mind when refactoring, so I make sure to write my tests alongside my code. From time to time, I will realize that some parts are better off refactored and because I trust my test suite, I refactor confidently.

At Quill Dev Tools we use open telemetry to observe our system once deployed and normally during development we know what metrics we care about based on the lessons we learnt during prototyping. So I make sure that we have our metrics in.

Documenting a module's public API is the other important thing to do during development and if you don't do it now you won't do it later. We use OpenAPI to document our endpoints and we have seen great benefits. In fact, we have never had a meeting to discuss what is returned from an endpoint or the expected payload. The OpenAPI documentation is automatically generated when a pull request is merged.

## After Development

When done with development, I try to get as many eyes as I can on my pull request so this means chasing folks for reviews. As the PR author it is my responsibility to make sure that I get a thorough review from as many people as possible. Once all feedback is addressed, it is time to ship it!

How you ship depends on the type of system you're working on. If you're building SDKs you will cut a release but for backend systems you want to do a rolling update. Regardless of how you're shipping it is important to keep an eye for alerts and customer complaints in case your changes break production.

