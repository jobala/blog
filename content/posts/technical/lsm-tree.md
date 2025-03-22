---
title: "Log Structured Merge Trees"
date: 2025-02-12T17:33:48+03:00
draft: true
tags:
  - database
  - storage
  - lsm
---

## Intention

I want to inform the reader about how databases uses LSM trees for efficient writing

- Pages are not great for random writes
- LSM trees are great for write heavy workloads
- Key Components
  - MemTable
    - Insert in the MemTable
  - SSTable
    - SSTable are files in the local filesystem
  - Compaction
    - Improve read amplification with compaction
    - The process of moving data from one level to another, l0 to l1 ...
- Reading data from the database

### Introduction

LSM -- log structured merge trees -- are another solution to the database storage problem. It trades off read
performance for write efficiency and preferred for write heavy workloads. We'll be exploring how LSM works in this
article.

### MemTable And SSTable

### Compaction
