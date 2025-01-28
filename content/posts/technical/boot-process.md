---
title: "What Happens When You Turn On A Computer ?"
date: 2025-01-28T15:31:49+03:00
tags:
  - os
  - systems-programming
---

I have always loved tearing things apart to see how they work and whenever I turn on my computer, I can't help but
wonder, "What is it doing?" This article is an answer to that question. We'll be exploring what happens when a computer
boots up using the [xv6-riscv](https://github.com/mit-pdos/xv6-riscv) os.

Computer hardware is useless by itself without software and for a computer to run any software it must first load the
software into memory. The operating system is the first software that the computer runs after it has turned on.
Computers with RISC-V processors expect the operating system kernel to be loaded at the `0x80000000` memory address.
xv6 uses a linker script to load the kernel at that address as shown below.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/kernel.ld#L6-L10" >}}

`entry.S` initializes the stack pointer register `sp` for each core. The address for some stack0 is defined in `start.c`
and for the different cores their stack will be at the address `core_id * 4096`. In this instance `mhartid` represents
the core's id. When it's done setting up the execution environment it jumps to the `start` function defined in
`start.c`. The cores need a stack so that they can ran c programs. `start.c` does some setup and the calls `main.c`.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/entry.S#L7-L18" >}}

`main.c` starts the different components of the `xv6` os. The booting core -- with id 0 -- does the initialization and
the other cores only initialize their paging, interrrupt vector and device interrupts. After which, the scheduler is
started. At this point the os is done booting and you can use the computer.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/main.c#L13-L44"  >}}
