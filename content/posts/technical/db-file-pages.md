---
title: "Database Storage: Files And Pages"
date: 2025-02-12T06:48:33+03:00
slug: files-and-pages
tags:
    - database
    - storage
    - pages
    - files
---

### Introduction

The storage subsystem is an important database component and is responsible for how data is stored on
disk and loaded into memory. In this article we'll be exploring how a database persists its data on disk.

### Files And Pages

Databases store their data as files in the operating systems' filesystem. A database like SQLite stores all its data in
a single file whereas Postgres and MySQL use multiple files. For example, if we have two tables A and B, then their data
will be stored on some files `/dbdata/A` and `/dbdata/B` in the filesystem.

Loading the whole file ie `/dbdata/A` into memory is impractical and expensive. If a table is **1GB** in size we don't
want to load
the
whole **1GB** of it. Instead the file is divided into logical blocks, typically **4KB** in size, which can then be
loaded
into
memory and flushed to disk. We'll call these blocks pages. Each page is uniquely identifiable by a page id.

<!--TODO: Img of pages on a file -->

Page Ids enable block addressing, that is, knowing the address of each page in the file. For example, if
`baseAddr = 0x1000, pageId = 5, and pageSize = 4KB (4096 bytes)`, the page address would be:
`0x1000 + (5 * 4096) = 0x6000`.

### Heap File Organisation

A heap file stores an unordered collection of pages with tuples(table rows) stored in random order. It supports the
usual
CRUD operations on pages and also iterating over all pages. The DBMS maintains special pages to track data pages (page
directory) and store metadata, including available space,
free pages, and page types (metadata or data page)

<!--TODO: Img of page directory  -->

### Freespace Map

The freespace map ensures efficient record storage. It is an array with a length equal to the number of pages. An entry
in the freespace map, represents the available space in
a page. For example, if the ith page is only half used then `freespaceMap[i] = 50%;`. The freespace map allows us to
know what pages have enough space without scanning all the pages to find a suitable page for record storage.

When a new row is inserted into a table the DBMS will look through the freespace map to find a page with enough space
for the record. If none is found a new page is appended and the record stored. The freespace map is periodically updated
by the DBMS because it is expensive to always update it and store it on disk whenever a record is updated.

The freespace map can be out of sync with the true page state because it is not updated everytime an entry is added or
removed in a page. It might show a page as having more space than it has or fuller than it actually is. Both cases are
handled gracefully either by finding another page or allocating a new page and do not lead to data corruption.







