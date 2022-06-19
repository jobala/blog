---
title: Vim for Daily Text Editing
date: 2022-03-11
categories:
  - engineering
  - editor 
slug: basic-vim-config
keywords:
  - vim
---

## Introduction

Vim is powerful editor that evolves to match your needs, it can be a peashooter or a howitzer depending on what you want to use it for. This article helps you setup Vim for basic text editing and use it as a substitute for notepad. 

## Vim Config

Vim is configured through a **.vimrc** which should be in your root directory, `touch ~/.vimrc` and open the file in your favourite text editor.

### General Settings

Add the following to your **.vimrc** file

```
set number
set history=500
set autoread

set foldmethod=indent
set nofoldenable

inoremap jj <Esc> 

map <space> /

let mapleader=","
nmap <leader>w :w!<cr>
map <silent><leader><cr> :noh<cr>

filetype plugin on
filetype indent on

au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif
```

`set number` configures vim to show line numbers. `set history=500` will make vim  remember the last five hundred commands and `set autoread` sets up vim to reload files that change externally, for example, when you have the same file open in Vim and another editor and you change it in the other editor, this setting will make Vim reload those changes.

`set foldmethod=indent` enables code folding on indented code. With this setting, Vim automatically folds code whenever you open a file which is annoying because you have to manually unfold the code. `set nofoldenable` disables automatic folding on opening a file. In NORMAL mode,   type `zf` to fold and `zo` to unfold.

When in INSERT mode clicking the `Esc` key returns you to NORMAL mode but in modern editors the `Esc` key is too far for it to be convenient especially because this is a common operation. `inoremap jj <Esc>` remaps the escape function to double clicking the `j` key. This reduces the pain especially because `j` is in the home row.

`map <space> /` maps the search functionality to the space key. So when in NORMAL mode, we can start searching for a word by pressing `Space`. Vim highlights all occurrences of the matched words. When done searching you can turn off highlighting by typing  `:noh`. 

If you've written code before then you maybe familiar with the idea of namespacing and that it prevents naming conflicts. **leader** is similar to a namespace and it allows you to add custom commands to Vim without stomping on Vim's inbuilt commands. `let mapleader=","` sets the comma as the leader
We'll use it in the next setting.

Saving a file is a common operation during editing and to make it as easy as possible use the `nmap <leader>w :w!<cr>` setting to configure Vim to save the file by typing `,w` when in NORMAL mode.

Earlier I showed how you can search and mentioned that Vim will highlight matched words. I used `:noh` to disable highlighting but we can make this easier by using `map <silent><leader><cr>:noh<cr>` which tells Vim to disable highlighting by typing `,Enter`.

`filetype plugin on` enables vim to run plugins for specific file types. `filetype indent on`  tells vim to load the file's indent file.

Assuming you are  editing two files A and B. When you're done editing B and return to A, you would like your cursor position in A to be the same as it was before you moved to B. `au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif` is an automatic command that Vim runs everytime you open a new file to do just that.

### Text And Indents
```
set expandtab
set tabstop=4
set shiftwidth=4

set linebreak
set tabwidth=500
set wrap 

set autoindent
set smartindent
```

You might have had of the tab vs spaces wars, well space wins. `set expandtab` replaces tab characters with space characters. `set tabstop=4` controls the number of spaces that will be inserted when the tab key is clicked. It configures it to four spaces. `set shiftwidth=4` tells vim to insert four space characters for indentation.

`set linebreak` tells vim to insert a linebreak at the following characters `" ^I!@*-+;:,./?"` instead of at the last character that fits on the screen. `set tabwidth=500` controls the width of text being inserted. `set wrap` tells vim to wrap lines longer than the window's width will wrap and display continues on the next line. 

`set autoindent` configures vim to copy indent from the current line, otherwise, new lines will start at the first column. `set smartindent` tells Vim to do smart auto indenting when starting a new line.

### Moving Windows
In vim you can split you editor into multiple windows vertically with `:vsplit` or horizontally with :split. The configuration below makes it easy to move from one window to another.


```
map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-h> <C-W>h
map <C-l> <C-W>l
```

With these settings you can move from left to right window with `CTRL + j` and right to left with `CTRL + h`. `CTRL + l` moves you down to a lower window and `CTRL + k` moves you up to an upper window.

### Conclusions

The configurations above sets up your Vim for daily text editing. Lookout for the next article that will configure your Vim for daily code editing.
