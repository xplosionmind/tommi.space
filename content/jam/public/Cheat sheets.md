---
date: 2020-05-07T02:00:00+02:00
updated: 2022-11-28T10:51:45+01:00
aliases:
  - Cheat Sheet
  - cmd
  - CLI
  - Command Line
  - Terminal
tags:
  - geek
description: Useful digital shortcuts I always forget.
image: /assets/terminal.webp
redirect_from:
  - /cheatsheet/
  - /cheatsheets/
  - /cheat-sheet/
  - /terminal/
  - /cli/
---
## Miscellaneous

- Compress a file or a directory: `zip -r -X archive-name.zip /path/to/item`
- Prevent sleep: `caffeinate -i -t 3600`
- Disk space usage:
	- `du # dust`
	- `lsblk -a -T -h`
	- [Storage analyser](https://forum.yunohost.org/t/storage-analyser-analyse-du-stockage 'Storage analyser - YunoHost Forum'), from YunoHost Forum
- With `say`, convert a text file to an audio file with Apple’s TTS engine: `say -v Alex -f file.txt -o output.m4a` (`-v` allows you to select the kind of voice for the output)
- [recursively count files in a directory](https://stackoverflow.com/a/9157162 'Recursively counting files in a Linux directory'):`find . -type f | wc -l`
- [Recursively copying files from subdirectories to root directory](https://superuser.com/questions/1372906/how-to-get-files-out-of-all-subfolders-and-move-them-up-to-the-first-folder 'How to get files out of all subfolders and move them up to the first folder - Super User'): `fd . ./input/ -t f -x cp {} ./output/ \;`

## `sd`

[`sd`](https://github.com/chmln/sd 'sd source code') is a wonderful command-line tool to find and replace sub-strings in files. Its original version is `sed`, which comes by default in shell.

Replace `foo` with `bar` in all files in the <em title='present working directory'>pwd</em>: `sd 'foo' 'bar' ./*`

## Vim

[Vim Cheat Sheet](Vim.md#Cheat%20Sheet)

## Pandoc

[Pandoc Cheat Sheet](Pandoc.md#Cheat%20sheet)

## ffmpeg

[ffmpeg Cheat Sheet](FFMPEG.md#Cheat%20Sheet)

## Resources

- [The art of command line](https://github.com/jlevy/the-art-of-command-line 'the-art-of-command-line on GitHub'), a repository to master command-line usage
- [Commandlinefu best commands](https://www.commandlinefu.com/commands/browse/sort-by-votes 'Commandlinefu best commands'), a record of little great command line tips
- [Handy Bash Shell Aliases For Linux](https://www.cyberciti.biz/tips/bash-aliases-mac-centos-linux-unix.html '30 Handy Bash Shell Aliases For Linux')
- [Shell commands for simple tasks of processing CSV file](https://dev.to/0xbf/shell-commands-for-simple-tasks-of-processing-csv-files-linux-tips-48ea 'Shell commands for simple tasks of processing CSV file')
- [`chmod` guide](https://chmodcommand.com 'Chmodcommand')
- [Linux command line](https://github.com/learnbyexample/Linux_command_line 'linux-command-line on GitHub')
- A complete dive in the Terminal language, Bash
