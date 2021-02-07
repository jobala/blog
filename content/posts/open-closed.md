---
title: Open Closed Principle
date: 2021-02-7
slug: open-closed
keywords: software design
---

A system's design is rigid when a change in requirements leads to a cascade of changes in the software. The open closed principle is the antidote for rigid software designs, when implemented properly it makes the software system flexible. It is the principle you should know.

The principle states that software entities --  modules, classes, functions -- should be open for extension but closed for modifications.

For a module that conforms to this principle it should be possible to add new features without modifying the module's source code or binaries. New features are added by adding new code and not by modifying existing working code. I know this is beginning to sound like a riddle, how can you add new features without modifying existing code?

Let me show you

Assuming we have a program that gets data from PDF files. The program has **Client** and **PDFReader** classes.

```typescript
    class PDFReader {
        readPDF() {
        // reads pdf
        }
    }
```

```typescript
    class Client {
        getData() {
            pdfReader = PDFReader()
            return pdfReader.readPdf()
        }
    }
```

The client uses the PDFReader to get the contents of some pdf file.

You get your paycheck and just when you're about to retire early in some island, your program manager tells you that customers are about to cancel your product because they can't read files from the internet! There's no way to add the new feature -- reading files from the internet -- without modifying the **Client** class because it violates the open closed principle.


To conform to the principle we need to add a layer of abstraction. Since the client is concerned with reading data from some source, let's put that concern in an interface.

```typescript
    interface ClientInterface {
        read()
    }
```

All readers need to implement this interface

```typescript
    class PDFReader implements ClientInterface {
        read() {

        }
    }


    class NetworkReader implements ClientInterface {
        read() {

        }
    }
```

Then we update **Client** to use the abstraction instead of concrete classes.

```typescript
    class Client {
        getData(reader: ClientInterface) {
            return reader.read()
        }
    }
```

Now the client is open for extension but closed for modification. If we get a new requirement to read from a database, the Reader class will have to implement the **ClientInterface** and alas, we have new behavior with zero modification on the **Client** class. It conforms to the open closed principle.

More important than applying the principle is knowing when to apply it. Conforming to the open closed principle is expensive as it takes effort and the layer of abstraction makes the design more complex. The principle should be limited to parts of the system that are likely to change.
