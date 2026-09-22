---
date: 2026-09-03T13:05:02+02:00
tags:
  - geek/linux
description: Understanding how the Compose key configuration works in Linux.
---
From the [Compose key Wikipedia page](https://en.wikipedia.org/wiki/Compose_key):

> A compose key (sometimes called multi key) is a key on a computer keyboard that indicates that the following (usually 2 or more) keystrokes trigger the insertion of an alternate character, typically a precomposed character or a symbol.

In Linux, the default compose key combinations are in `/usr/share/X11/locale/en_US.UTF-8/Compose`. In order to add custom compose key combination, create `~/.XCompose`, where the first line is `include "%L"` in order to include the default combinations.

Here is the content of my `~/.XCompose`:

```
include "%L" # from /usr/share/X11/locale/en_US.UTF-8/Compose

<Multi_key> <asterisk> <asterisk>               : "⁂"   U2042 # ASTERISM
<Multi_key> <3> <e>                                                                     : "з"   U0437 # CYRILLIC SMALL LETTER ZE
<Multi_key> <3> <E>                                                                     : "З"   U0417 # CYRILLIC CAPITAL LETTER ZE
<Multi_key> <e> <3>                                                                     : "з"   U0437 # CYRILLIC SMALL LETTER ZE
<Multi_key> <E> <3>                                                                     : "З"   U0417 # CYRILLIC CAPITAL LETTER ZE

<Multi_key> <less> <3>                                                  : "❤️"  U2764 # RED HEART
<Multi_key> <s> <f>                                                                     : "🌻"  U1F33B # SUNFLOWER EMOJI
```

## Resources

- [Compose Key cheat sheet](https://tuttle.github.io/python-useful/compose-key-cheat-sheet.html)
- [Xorg/Keyboard configuration - ArchWiki](https://wiki.archlinux.org/title/Xorg/Keyboard_configuration#Configuring_compose_key)