---
title: Go
date: 2022-01-30
categories:
  - Go
slug: go
keywords: go
---

Recently I was asked to work on MicrosoftGraph's [Go SDK](https://github.com/microsoftgraph/msgraph-sdk-go-core) after working on Python projects for a long time with a stint on [MGT](https://github.com/microsoftgraph/microsoft-graph-toolkit) which is written in Typescript. This article is about what I like about Go as a (former?) Python programmer.

### Formatting

I like that there's only one formatter in Go whereas in Python there are a number. This is probably not a big deal but most of technical decisions in a team are made by consensus and there are three hard things in computer science; naming variables, cache invalidation and consensus among developers.

### Building Executables

While working on **msgraph-cli** I had to create an executable for Windows, Linux and MacOS and it was a terribly painful experience because it is done differently on all those platforms. I had to learn Wix for Windows, Homebrew for MacOS and Debian packaging for Linux. It's a lot less painful in Go.

### No Classes

Lack of classes is Go's greatest feature after its concurrency primitives. It took me time to get my head around not having classes but once it clicked it made so much sense. It makes me think a little more and perhaps differently about programming, which makes it a language worth learning by Alan Perlis' standards.

### Implicit Interfaces

Python uses abstract classes to implement interfaces, you create an abstract class that is inherited by the class that implements the interface and used as a type for an argument or the return value. In Go you create the interface and any object that has methods specified by the interface implements the interface.

### Gets Out Of Your Way

The other thing I like about Go is how it gets out of your way. When starting a Python project I have to set up and activate a virtual environment as best practise and all hell breaks loose when you `pip install` outside the virtual environment. With Go all I need to do is initialize a module and start cranking.

This is a work in progress and will write more as I learn and discover new things.
