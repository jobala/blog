---
title: Go Concurrency 101
date: 2023-03-11
categories:
  - go
slug: go-concurrency-101
keywords:
  - golang
  - go
  - concurrency
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
a message `1` and closes the `telephoneLine`. It is idiomatic for the goroutine that writes to a channel to close it
when done.

```Go
func neighbour(telephoneLine chan<- int) {
  telephoneLine <- 1
  close(telephoneLine)
}
```

We receive the message by reading from `telephoneLine`.

```Go
msg := <- telephoneLine

// prints 1
fmt.Println(msg)
```

## Select

Goroutines deadlock when not accessed in the same order. Assuming we have two telephone lines `line1` and `line2` and in
a goroutine we first write to `line1` then read from `line2`.

```Go
line1 := make(chan int)
line2 := make(chan int)

go func() {
  line1 <- 1
  msg <- line2
}
```

Then if we write to `line2` and read from `line1` in another goroutine the program deadlocks and panics.

```Go
line2 <- 2
msg := <- line1
```

However, with the **select** keyword this won't happen because it executes whatever case that can proceed.

```Go
select {
  case line2 <- 2:
  case msg := <- line1:
}
```
