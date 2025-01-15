---
date: 2021-03-22T12:19:14+01:00
updated: 2024-11-24T18:38:41+02:00
aliases:
  - Neovim
tags:
  - geek/apps
  - knowledge
description: Insights personal notes about the best text editor in the world
---
## To learn

- buffers management
- macros recording

## Cheat Sheet

- [Count occurrences](https://vimtricks.com/p/vimtrick-count-occurrences/ 'Count occurrences on Vim Tricks'): **`:%s/some_pattern//n`**
- Toggling spell checking: **`:set spell "nospell`**.
- Sometimes, when I activate [spell checking](https://vimtricks.com/p/vimtrick-spell-checking-in-vim/ 'Spell checking in Vim'), I need to change the language, since my `init.vim` file has `set spelllang=it` by default: **`:set spell spelllang=en`**.
- [Navigate changes](https://vimtricks.com/p/vimtrick-jump-between-changes/ 'Jump between changes') (by using `g;` and `g,`): **`:changes`**.
- Use **`:retab`** to convert the buffer to your setup for indentation. For instance, if you configured vim to have 4 spaces for indentation, it will convert the tabs to 4 spaces.
- [Time travel](https://vimtricks.com/p/vimtrick-time-travel-in-vim/ 'Time travel in Vim')
```vim
:earlier 3 "undo the last three changes
:earlier 5m "Go back to the state of the file 5 minutes ago
:later 1h "Travel forward through the change history 1 hour
```

### Cheat Sheets

- [Vim Cheat Sheet](https://vim.rtorr.com 'Vim Cheat Sheet')
- [DevHints cheatsheet](https://devhints.io/vim 'Vim cheatsheet - devhints.io')

## Resources

- [vim-galore](https://github.com/mhinz/vim-galore 'vim-galore on GitHub'), a repository collecting all sorts of resources about Vim
- [Vim casts](http://vimcasts.org/ 'Vim casts'), the best video tutorials you can find
- [Vim help](https://vimhelp.org 'Vim help files'), a website made of Vim man pages
- [Vim cookbook](https://www.oualline.com/vim-cook.html 'Vim Cookbook')
- [Vim FAQ](https://vimdoc.sourceforge.net/htmldoc/vimfaq.html 'Vim documentation: vim\_faq')
- [Practical Vim](https://pragprog.com/titles/dnvim2/practical-vim-second-edition/ 'Practical Vim, Second Edition') a book - the best book you can find - on Vim, by the same creator of Vim Casts: [Drew Neil](http://drewneil.com/).
- [Vim subreddit](https://www.reddit.com/r/vim/ 'r/vim')
- [Vim intermediate guide](https://thevaluable.dev/vim-intermediate/ 'A Vim Guide for Intermediate Users')
- [Vim as an IDE](https://blog.jez.io/vim-as-an-ide 'Vim as an IDE'), a workshop by [Jake Zimmerman](https://jez.io 'Jake Zimmerman')
- [Obsidian](https://obsidian.md 'Obsidian official website') is awesome, nevertheless it is not the best performance-wise. Even if it becomes way harder and complicated to manage, it is worth keeping note of [personal notetaking in Vim](https://vimways.org/2019/personal-notetaking-in-vim/ 'Personal Notetaking in Vim')
