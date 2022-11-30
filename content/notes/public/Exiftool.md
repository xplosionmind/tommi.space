---
date: 2021-03-29T05:44:07+02:00
updated: 2022-11-28T10:43:41+01:00
tags: geek/apps
description: Cheat sheet and useful information to use ExifTool
---
[ExifTool](https://exiftool.org 'ExifTool') is the most common and used software to handle file metadata, specifically image information.

## Cheat Sheet

### Show metadata

```bash
exiftool -s -G filename.jpg
```

where: 
- **`-s`** is used to show the names in ExifTool commands format. *e.g.: instead of <q>Create Date</q> you see `CreateDate`*
- **`-G`** is used to show the metadata Group to which the metadata tag belongs.

### Show dates

```bash
exiftool -AllDates filename.jpg
```

### Strip metadata

Removing all metadata from all files in pwd

```bash
exiftool -all= ./* #filename.jpg
```

### Renaming according to original date

Rename all files in pwd, according to the time and time they were shot

```bash
exiftool '-FileName=CustomName%-c.%le' '-FileName<CreateDate' '-FileName<GPSDateTime' '-FileName<DateTimeOriginal' -d %Y.%m.%d-%H.%M.%S%%-lc.%%le -r ./*
```

where:
- [**`-r`**](https://exiftool.org/exiftool_pod.html#r-.--recurse '-r in ExifTool Documentation') makes the analysis <i>recursive</i>;
- [**`-d`**](https://exiftool.org/exiftool_pod.html#d-FMT--dateFormat '-d FMT (-dateFormat) - ExifTool Documentation') is used to specify the printed date format;
- [**`%c`**](https://exiftool.org/exiftool_pod.html#w-EXT-or-FMT--textOut 'Write option in ExifToolDocumentation') adds a counter to images that result to be shot in the same second, **`l`** makes the counter alphabetical and the leading dash, guess what, adds a dash when the counter is used.
- **`%`** for non-date variables [must be double](https://exiftool.org/exiftool_pod.html#RENAMING-EXAMPLES 'RENAMING EXAMPLES - ExifTool Documentation')
- adding [**`-o`**](https://exiftool.org/exiftool_pod.html#o-OUTFILE-or-FMT--out '-o option in ExifTool documentation') copies each image instead of moving it.

During the file renaming process, the leftmost values are overwritten by the rightmost ones. Therefore, if a file both has `CreateDate` and `DateTimeOriginal`, the latter will overwrite the former. This is so in order to prioritize most reliable date values, as discussed in [this thread](https://exiftool.org/forum/index.php?topic=12325.0 'Dates data accuracy hierarchy - ExifTool Forum') in the ExifTool forum.

### Directories

Organize files in directories based on each image’s dimensions (resolution)

```bash
exiftool '-Directory<imagesize' ./*
```

Move files to folders based on year and month

```bash
exiftool '-Directory<CreateDate' '-Directory<GPSDateTime' '-Directory<DateTimeOriginal' ./%Y/%Y.%m -r ./*
```

## Resources

- [ExifTool Commands for Image Organization](https://ninedegreesbelow.com/photography/exiftool-commands.html 'ExifTool commands - 9° Below'), by [9° Below](https://ninedegreesbelow.com "Nine Degrees Below")
- [ExifTool official documentation](https://exiftool.org/exiftool_pod.html 'exiftool Application Documentation')