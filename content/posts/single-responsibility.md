---
title: Single Responsibility Principle
date: 2021-01-10
categories: solid
slug: single-responsibility
keywords: software design
---


I used to think the single responsibility principle means that a module should only do one thing, this is a common misunderstanding of the principle and often leads to fragmented codebase with thin classes that have one or two methods littering the codebase as we can see in this [StackOverflow](https://softwareengineering.stackexchange.com/questions/150760/single-responsibility-principle-how-can-i-avoid-code-fragmentation).

While researching about the subject, I came across [SRP is a hoax](https://www.yegor256.com/2017/12/19/srp-is-hoax.html) which in my opinion embodies the misunderstanding of the single responsibility principle. The article shows the code below

```java
    class AwsOcket {
        boolean exists() {}
        void read(final OutputStream output) {}
        void write(final InputStream input) {}
    }
```

Then argues that according to the single responsibility principle the class does too many things because it checks for the existence of an AWS bucket, reads and modifies its content.

The article then goes ahead and puts each of the methods in its own class in 'adherence' to the single responsibility principle which results in an explosion of classes and a fragmented codebase thus demonstrating that single responsibility is a hoax.

The article gets a number of things wrong. The first is divorcing the code from the business context it supports, the second is using a sloppy interpretation of the principle and finally applying the principle to code that doesn't have symptoms common to codebases that violate the single responsibility principle like accidental duplication and merge conflicts.

The correct interpretation of  the single responsibility principle is **a module should have one reason to change**. The business context that the software supports provides the reason to change. Which is why I said the article is wrong for divorcing the code from the business context. Since changes in business functions are inspired by users, we can say that **a module should be responsible to one, and only one user or stakeholder**

However, it is likely that multiple users or stakeholders will want to have the system changed in the same way. So what we are really saying is that a group of users or stakeholders will want the system changed in the same way, we can refer to this group as **actors**. Reducing the principle to **a module should be responsible to one and only one actor**. A module can be a class or a source file depending on the programming language.

Now that we understand what the principle is, let us look at a module that violates the principle and then fix it.

Let's assume we have the following class in a payroll processing system.

```python
    class Employee:
        def calculate_pay():
            pass
        def report_hours():
            pass
        def save():
            pass
```

The _calculate_pay_ method is used by an accounting actor and the _report_hours_ by a HR actor. You can see that this class is responsible to more than one actor. By having both of them in one class we are **coupling** accounting and hr actors. This leads to fragile code.

To remove the coupling and to adhere to the single responsibility principle we should put the methods in their own classes, so that each is responsible to only one actor.

```python
    class PayCalculator:
        def calculate_pay():
            pass

    class HourReporter:
        def hour_reporter():
            pass
```

In conclusion, the single responsibility principle is not about each class doing one thing but instead each class being responsible to one actor.
