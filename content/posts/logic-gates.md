---
title: Elementary Logic Gates
date: 2021-12-21
categories:
  - nand-to-tetris
slug: logic-gates
keywords: Logic-Gates
---

A digital computer is made up numerous logic gates that only have two states on and off. In this article I will introduce the elementary logic gates and for the next few articles I will be exploring how these unintelligible gates can be combined to form a functional computing device.

## And

The **And** gate outputs 1 if both inputs are 1

![and-gate](/images/and.png)

## Or

The **Or** gate outputs 1 when either of it's inputs are 1

![or-gate](/images/or.png)

## Not

The **Not** gate outputs 1 only if the input is 0

![not-gate](/images/not.png)

## Xor

The **Xor** gate outputs 1 only if it's inputs differ

![xor](/images/xor.png)

## Mux

The **Mux** gate is a multiplexer and uses a selector bit to channel either of the inputs to the output. When the selector bit is 0, a is channeled to the output when the selector bit is 1, b is output.

![mux](/images/mux.png)

## Dmux

The **Dmux** gate is a demultiplexer and uses a selector bit to select which output port the in signal should be channeled to.

![dmux](/images/dmux.png)