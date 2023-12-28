---
title: "Functional Options"
date: 2023-12-28T10:12:42+03:00
slug: function-options
categories:
    - go
    - exploratory
---


Narrative

- Why is the pattern useful?
    - Ensures backward compatibility, no change in public API
- When is it useful
    - Creating config options
- What are the alternatives
    - Constructor overloading
    - Config Object
- How is it implemented ?
    - Use uptrace for demonstration

In this article I will be exploring how [uptrace-go](github.com/uptrace/uptrace-go) uses functional options to provide a flexible configuration mechanism. There are other less flexible techniques for providing configuration like using a config struct or positional arguments which I won't cover but are good to know. 

[uptrace-go](github.com/uptrace/uptrace-go) is instantiated by invoking `ConfigureOpenTelemetry` which as we can see from the snippet below expects an `Option` list as input.


{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/uptrace.go#L24-L24" >}}

It then creates a `conf` object.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/uptrace.go#L30-L30" >}}

An `Option` is an interface implementing the `apply` method. Therefore, any type implementing `Option` is a valid argument to `ConfigureOpenTelemetry`.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L92-L94" >}}

And `ConfigureOpenTelemetry` can be invoked as shown below, with `uptrace.WithDSN(...)` returning an `Option`.

```go
uptrace.ConfigureOpenTelemetry(
    ...
    uptrace.WithDSN("http://xyz.com")
    ...
)
```

Taking a closer look at `WithDSN` we see a few surprising things. It calls a function `option` and passes an anonymous function to it. This is surprising because it is what you would expect during a function definition and not in an invocation. I will explain why this works later but in the mean time notice the `conf` object getting updated.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L106-L110" >}}

Well, you see `option` is a user defined type.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L96-L96" >}}

And since in Go we can add methods to user defined types we add `apply` to the `option` type. This allows functions to implement interfaces. `fn` will take the value of whatever function passed to `option` when instantiated

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L98-L100" >}}


