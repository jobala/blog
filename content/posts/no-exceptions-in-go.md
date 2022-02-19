---
title: No Exceptions In Go
date: 2022-02-13
categories:
  - go
  - exceptions
slug: no-exceptions-in-go
keywords: go
---

If you've read Uncle Bob's Clean Code then you know that throwing exceptions is cleaner than returning error codes but Go turns the Clean Code advice on its head and emphasises on returning error values instead. Lack of exceptions in Go feels anachronistic but like many things about the language, there are strong reasons behind the decision.

### Exceptions Considered Harmful

Exceptions add a second control flow which makes programs less readable and hard to reason about, take for example the Python program below. It is not clear from the caller's perspective that the function raises an exception this subtleness in more complex scenarios would make the program hard to reason about.

```python
def divide(dividend, divisor):
  res = None

  try:
    res = dividend/divisor
  except:
    raise Exception("divided by zero")

res = divide(1, 0)
```

### Error Values

Go returns error values rather than throwing exceptions making error handling explicit. In the code snippet below, the **divide** function returns an error that must either be explicitly handled or ignored.

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

The downside of returning errors as values is that Go forces you to tradeoff code easthetics for explicit error handling which is a fair tradeoff if you ask me.
