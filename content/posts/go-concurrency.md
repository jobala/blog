---
title: Concurrency In Go
date: 2023-03-11
categories:
  - go
slug: concurrnecy-in-go
keywords:
  - golang
  - go
  - concurrency
draft: true
---

## Goroutines

Goroutines enable concurrent behaviour in Go programs. To make a function concurrent -- non blocking -- simply place the
go keyword before the function invocation.

```Go
func helloWorld() {
  fmt.Println("Hello, World")
}

// invoke the function concurrently
go helloWorld()
```

## Channels

Goroutines use channels to communicate. The type of data a channel can transfer is determined at channel creation time.
The snippet below creates an integer channel `telephoneLine` and passes the channel to the `neighbour` goroutine.

```Go
telephoneLine := make(chan int)
go neighbour(telephoneLine)
```

Then the neighbour can communicate to us through the `telephoneLine` channel. In the code below, the neighbour sends us
a message `1` and closes the telephoneLine. It is idiomatic for the goroutine that writes to a channel to close it when
done.

```Go
func neighbour(telephoneLine chan<- int) {
  telephoneLine <- 1
  close(telephoneLine)
}
```

We receive the message by reading from the telephone line

```Go
msg := <- telephoneLine

// prints 1
fmt.Println(msg)
```

## Select
