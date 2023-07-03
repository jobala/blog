---
title: Mousless Vscode
date: 2023-06-30
slug: mousless-vscode
draft: true
categories:
  - misc
keywords: vscode
---

Narrative

- Remove minor frictions in my editing

  - Death by a thousand cuts
  - effortless editing

- Long time vim user

  - Like VScode because of ease of running tests
  - Debugger
  - Extension eco-system
  - Seeing all files with errors

- Basic editing

  - Use vim extension
  - jumping to definition
  - returning back
  - opening files

- Tabs & Panes

  - Tab switching
  - Pane management
    - Splitting screen
  - selecting a file in the sidebar
    - navigating the sidebar
    - selecting a file
  - common extensions
    - file list
    - extensions
    - git
    - github pull requests
    - global file search

- minimise shortcuts to require use of a single hand

I had used vscode on and off in the past but decided to make it my primary editor because it does somethings right. I
liked how effortless executing tests and debugging was and previewing PlantUML diagrams right in the editor. Coming from
Vim, I had one problem and that was the mouse. There are many ways of killing a mouse, this is one of them.

### Editing

Installing the Vim extension was the first thing I did to make my editing experience feel more Vim like. With the
extension installed I could perform the following actions. These are the common actions I perform on a day to day.

| Key Strokes |                                                   Action                                                    |
| ----------- | :---------------------------------------------------------------------------------------------------------: |
| i           |                                    Enter into insert mode, editing mode                                     |
| jj          |                                           Enter into normal mode                                            |
| v           |        Visual mode enables text selection you can use `d` to delete selected text or `y` to copy it         |
| dd          |                                              Deletes the line                                               |
| dw          |                                      deletes the word under the cursor                                      |
| gd          | This jumps to the definition of a variable or function. Pretty handy when trying to under stand a code base |
| j           |                                                  goes down                                                  |
| k           |                                             moves the cursor up                                             |
| h           |                                        moves the cursor to the left                                         |
| l           |                                        moves the cursor to the right                                        |
| u           |                                                    undo                                                     |

| Shortcut              | action                        |
| --------------------- | ----------------------------- |
| gd                    | moves the cursor to the right |
| ctrl + o              | jump back                     |
| ctrl + p              | go to file                    |
| ctrl + \              | Split file                    |
| cmd + [1, 2, 3, 4,5 ] | switch tabs                   |

**Custom Vim Commands**

- switching panes
- leader key
- saving files
