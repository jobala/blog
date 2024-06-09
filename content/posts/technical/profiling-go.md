---
title: "Profiling In Go"
date: 2024-03-10T14:22:09+03:00
categories:
  - technical
  - go
---

It is possible to write slow programs despite increasingly powerful computers and profiling helps you identify slow sections of your program.

Assuming we have two functions that calculate the square of their index and adds the result to a slice, how do we know which is faster ?

```go
func CalculateSquares(n int) []int {
	squares := make([]int, n)
	for i := 1; i <= n; i++ {
		squares[i-1] = i * i
	}
	return squares
}
```

```go
func CalculateSquaresMath(n int) []int {
	squares := make([]int, n)
	for i := 1; i <= n; i++ {
		squares[i-1] = int(math.Pow(float64(i), 2))
	}
	return squares
}
```

We can use benchmarking to know which of the two is faster.

```go
func BenchmarkCalculateSquaresMain(b *testing.B) {
	for i := 0; i < b.N; i++ {
		CalculateSquares(10)
	}
}

goos: darwin
goarch: arm64
pkg: demo1
BenchmarkCalculateSquaresMain-10    	55957647	        21.29 ns/op	      80 B/op	       1 allocs/op
PASS
ok  	demo1	2.183s
```

```go
func BenchmarkCalculateSquaresMath(b *testing.B) {
	for i := 0; i < b.N; i++ {
		CalculateSquaresMath(10)
	}
}

goos: darwin
goarch: arm64
pkg: demo1
BenchmarkCalculateSquaresMath-10    	11432787	       105.4 ns/op	      80 B/op	       1 allocs/op
PASS
ok  	demo1	2.691s

```

From the benchmarking results we can see that `CalculateSquaresMath` is slower than `CalculateSquaresMain` but we don't know why. We'll have to use [pprof](https://github.com/google/pprof) to get better insight.

First we need to create cpu and memory profiles using the command below

```
go test -run='^$' -bench='BenchmarkCalculateSquaresMath' -cpuprofile='cpu.prof' -memprofile='mem.prof'
```

The use `pprof`'s top method to get a high level view of where the function is spending most of its time.

```
go tool pprof cpu.prof

(pprof) top
Showing nodes accounting for 1110ms, 81.02% of 1370ms total
Showing top 10 nodes out of 100
      flat  flat%   sum%        cum   cum%
     270ms 19.71% 19.71%      270ms 19.71%  math.archModf
     170ms 12.41% 32.12%      740ms 54.01%  math.pow
     170ms 12.41% 44.53%      170ms 12.41%  runtime.kevent
     160ms 11.68% 56.20%      180ms 13.14%  math.Frexp (inline)
     100ms  7.30% 63.50%      100ms  7.30%  runtime.pthread_cond_wait
      80ms  5.84% 69.34%       80ms  5.84%  math.IsNaN (inline)
      50ms  3.65% 72.99%      130ms  9.49%  runtime.mallocgc
      40ms  2.92% 75.91%       40ms  2.92%  runtime.pthread_cond_timedwait_relative_np
      40ms  2.92% 78.83%       40ms  2.92%  runtime.usleep
      30ms  2.19% 81.02%      900ms 65.69%  demo1.CalculateSquaresMath
```

From the results we see that most of the time is spent in the `math.pow` function. Armed with this knowledge we can go ahead and optimise this part.
