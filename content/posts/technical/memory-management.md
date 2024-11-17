---
title: "Memory Management"
date: 2024-09-29T11:50:12+03:00
slug: memory-mgmt
categories:
  - os
  - systems
---

Computer memory can be thought of as a book and when a program starts it is given pages in the "memory book" to use,
each page being 4096 bytes -- 4KB.

![memory](/images/memory.png "memory")

The operating system keeps track of the pages of memory it has given out to programs to use by taking note of the pages'
physical address.

![pa](/images/phys_addr.png "physical address")

The physical address is 64-bits wide, in the RISC-V architecture the top 8 bits are unused. The middle
44 bits are used to store the page's base address and the remaining 12 bits are used to find the exact memory location
to write or read from in a page.

![page](/images/page.png "page")

When there are multiple programs running in memory, it is possible for one to corrupt the other -- and cause it to crash -- by overwriting its address space.
The operating system avoids this by providing each program with a virtual address space instead of all programs using the physical address space.
The OS then manages the virtual address to physical address using a page table. Virtual addresses are also 64-bit wide in 64-bit systems.

![page table](/images/page_tbl.png "page table")

The top 25 bits of a virtual address are unused, the middle 27-bits are used to index into the page table and low 12-bits
are offset bits that will be used by the physical address.A page table entry is 54 bits wide, the top 44 bits hold the phyiscal
page number which is the base address of the allocated page in physical memory. The low 10 bits are flags which are used to set
read, write and execute permissions for different pages.

To be memory efficient, xv6 doesn't create a single page table with 2^27 entries instead it use three page table directories each
containing a single pagetable. The top 9-bits are used to index into the first page table, the middle 9-bits index into the second
page table and the last 9-bits into the last pagetable.

![page dir](/images/page_dir.png "page dir")

## Implementation

xv6 creates the kernel page table during booting.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/main.c#L20-L20" >}}

`kvminit` then calls `kvmake` to create the pagetable

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/vm.c#L53-L57" >}}

`kvmake` calls `kalloc()` which returns the pagetable's address and the calls `memset` which cleans up pages to avoid
using left over data from some other program. Then calls `kvmmap`, maps virtual address to physical addresses. The kernel's
page table uses an identify map so the addresses in the virtual address space has the same values as those in the physical address space.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/vm.c#L19-L50" >}}

`kvmmap` the calls `mappages`. In case a mapping fails, the kernel panics.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/vm.c#L131-L136" >}}

`mappages` does the heavy lifting of mapping a virtual address to a physical address by creating page table entries. Given a virtual address and the size of memory allocated it loops starting with the given virtual address to the beginning address of the last page.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/vm.c#L158-L172" >}}

For each iteration, it gets the location of the page table entry by walking the pagetable directory, check if there's already a value in
that page table entry. If there's value the kernel panics. Otherwise it stores a value in that page table entry.
`PA2PTE(pa) | perm | PTE_V` creates a page table entry value from the physical address and then sets the permission bits
and mark the entry as valid with `PTE_V`.

`walk` traverses the three page table directories and returns the address of the page table entry in which `mappages` store a value.

{{< gh "https://github.com/mit-pdos/xv6-riscv/blob/de247db5e6384b138f270e0a7c745989b5a9c23b/kernel/vm.c#L85-L103" >}}

If the L2 page table has an invalid entry that means the L1 page table doesn't exist so it is created so on and so forth. Finally the
address of the pte in the L0 page table is returned. It is at this returned pte address that we store the value of the physical address.
