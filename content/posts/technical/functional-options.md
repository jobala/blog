---
title: "Functional Options"
date: 2023-12-28T10:12:42+03:00
slug: functional-options
categories:
  - go
  - technical
---

The functional options pattern is a mechanism for providing flexible configuration to a Go library and in this article I will be exploring how it is implemented in [uptrace-go](github.com/uptrace/uptrace-go). There are other less flexible techniques for achieving the same goal like config structs and positional arguments which I won't cover but are good to know.

As you can tell from the title, functions are central to the implementation of this pattern and in [uptrace-go](github.com/uptrace/uptrace-go) it all starts with the `option` function type. Any function that matches the signature `func(config *config)` is of type `option`.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L96-L96" >}}

And because in Go it is possible to add a method to any user defined type, we can add a method to `option`. This capability makes it possible for functions to implement interfaces. In the snippet below `apply` is added to `option`.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L98-L100" >}}

When `option` is instantiated the receiver `fn` takes the value of whatever function passed to option and when apply is called, it calls the instatiated function. We'll see this in action later in the `WithDSN` function.

The next part is defining an interface which all functional options passed to the constructor must implement. The `option` type already implements this interface because it has the `apply` method.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L92-L94" >}}

Next we will look at an example of a functional option that updates a field in the config object. The function returns an `Option` which is any type that implements the `apply` method.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L106-L110" >}}

The snippet below extracted from `WithDSN` creates an instance of the `option` type whose value is the function `func(conf *config) { ... }`. Which when called updates the `dsn` property of the `conf` object.

```go
  option(func(conf *config) {
		conf.dsn = dsn
	})
```

The `conf` object is created with a few basic properties.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L46-L49" >}}

And more properties are updated using the `option`'s `apply` method.

{{< gh "https://github.com/uptrace/uptrace-go/blob/40328f2437fe21511eb2f163a1ce63c8fe473f99/uptrace/config.go#L55-L57" >}}

Finally, the functional options are passed to the constructor as shown below.

```go
  uptrace.ConfigureOpenTelemetry(
    ...
    uptrace.WithDSN("http://dsn.com")
    ...
  )

```
