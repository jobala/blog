---
title: "Sleep And Wakeup"
date: 2024-11-04T10:54:49+03:00
draft: true
---

Sleep and wakeup functions are used to implement voluntary scheduling, whereby, a process opts to yield the cpu without
being forced to do so by a timer interrupt. Processes yield the CPU for I/O bound operations. A process doesn't need CPU
time when it is waiting for response from an I/O device.

## Sleep

The sleep function takes two arguments a channel and a lock. The channel will be used by the `wakeup` function to wake
up sleeping processes. The lock is used to maintain some flag's invariant to avoid deadlocks.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/proc.c#L547-L574" >}}

`sleep` then acquire's the processes' lock and releases the lock it received in the argument.

## Wakeup

Wakeup resumes all processes listening on a channel. It goes through the process table and finds processes listening on
a specific channel then changes the state to **runnable**, then the scheduler will find and resume them.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/proc.c#L576-L592" >}}
