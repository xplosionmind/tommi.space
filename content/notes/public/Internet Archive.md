---
date: 2022-10-18T14:22:57+02:00
updated: 2022-10-18T15:22:38+02:00
location: Grenoble
tags:
  - geek
description: Notes regarding archive.org
toc: false
---
- [Command-Line Interface](https://archive.org/developers/internetarchive/cli.html 'Command-Line Interface — Internet Archive Developer Portal') — [Internet Archive Developer Portal](https://archive.org/developers 'Internet Archive Developers portal')
- [A Few Advanced Search Tips](https://blog.archive.org/2017/04/16/a-few-advanced-search-tips 'A Few Advanced Search Tips - Internet Archive Blogs') - Internet Archive Blogs

## Batch metadata append

Modifying metadata in bulk with [the dedicated CLI tool](https://archive.org/developers/internetarchive/cli.html 'Command-Line Interface — Internet Archive Developer Portal') means applying values to one or more fields at a time, or also to multiple items at a time (in bulk) by using spreadsheets as an input. The problem is that for bulk metadata changing, values cannot be appended, but they can only be edited/substituted/removed. In order to batch append collections, I wrote a tiny [[Scripts|script]]:

```sh
#!/bin/bash
read -p "name of the collection to add: " collection
exec < input.txt # input file in pwd
#read header # optionally skip the first line (in case it is a CSV file)
while read line
do
   ia metadata "$line" --append-list="collection:$collection"
done
```

### Resources

- [How to Parse a CSV File in Bash](https://www.baeldung.com/linux/csv-parsing 'How to Parse a CSV File in Bash - Baeldung on Linux')
- [Command-Line Interface](https://archive.org/developers/internetarchive/cli.html 'Command-Line Interface — Internet Archive Developer Portal') — [Internet Archive Developer Portal](https://archive.org/developers 'Internet Archive Developers portal')