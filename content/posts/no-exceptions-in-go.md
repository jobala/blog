---
title: No Exceptions In Go
date: 2022-02-13
categories:
  - go
  - exceptions
slug: no-exceptions-in-go
keywords: go
---

Uncle Bob's Clean Code encourages use of exceptions over error status codes so I was surprised when I learnt that Go doesn't support exceptions and instead treats errors as values. Like many things about Go, there are good reasons for this design decision but at first it felt anachronistic and backward. It is one of those things that you eventually get used to.

The reason Go doesn't have exceptions is because they introduce a code path that if not handled may cause the program to crash in surprising ways. Take the Python program below, to a caller it is unclear that the function throws an exception.

```python
def divide(dividend, divisor):
  res = None

  try:
    res = dividend/divisor
  except:
    raise Exception("divided by zero")

res = divide(1, 0)
```

In Go, the error has to be returned and handled explicitly.

```go
func divide(divided, divisor int) error {
  if divisor == 0 {
    return errors.New("divided by zero")
  }
}

err := divide(1, 2)
if err != nil {
  // Handle error
}
```

The down side of treating errors as values is that you end up having a lot of `nil` checks which is annoying at first but you get used to it.
