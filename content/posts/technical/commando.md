---
title: Commando Cli Framework
date: 2022-09-03
categories:
  - cli
slug: commando
keywords:
  - cli
  - command-line
  - commando
---

I spent the better part of 2021 working msgraph-cli and I learnt a lot despite a change in strategy that meant me working on something else. [Commando](https://github.com/jobala/commando) is a crystallisation of the lessons I learnt.

## Declarative Command Grouping

Commando's approach to command grouping is heavily influenced by the fact that CLIs like SDKs are wrappers for HTTP APIs. Therefore, I wanted a one-to-one mapping between an api url and command group definition. This led me to a declarative api for grouping commands. So, if a user wants to create the following command grouping in [Commando](https://github.com/jobala/commando),

```sh
$cli parent child grand-child
```

They simply do the following

```go
cli.CommandGroup("parent first-child").
    WithCommand(commando.Command("grand-child", handler))
```

It is possible to add more grand-children to the first-child command group by chaining **WithCommand** calls.

```go
cli.CommandGroup("parent first-child").
    WithCommand(commando.Command("grand-child"), handlerFunc)).
    WithCommand(commando.Command("second-grand-child", handlerFunc))
```

And adding a second-child command group to parent is as simple as creating another command group.

```go
cli.CommandGroup("parent second-child").
    WithCommand(commando.Command("grand-child", handlerFunc))
```

## Command Arguments

[Commando](https://github.com/jobala/commando) aims to do as much as possible for the user and therefore it will infer a command's flags from its handler function. To do this reliably, [Commando](https://github.com/jobala/commando) depends on a convention where the handler function has a single struct argument whose fields will be used as flags for the command.

For example, for the command below

```sh
$cli parent child grand-child --name <name> --age <age>
```

The developer has to define the handler function as follows

```go
cli.CommandGroup("parent first-child").
    WithCommand(commando.Command("grand-child", handler))

type Args struct {
    Name string
    Age  int
}

func handlerFunc(args Args) {
    // do something with args and print result
}

```

## Contributing To Commando

At the time of this writing [Commando](https://github.com/jobala/commando) is a MVP and there's a lot to do before it is production ready. Play with it, create issues and if you feel inspired make a pull request.
