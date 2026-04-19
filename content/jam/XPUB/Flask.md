---
date: 2026-04-07T11:03:52+02:00
tags: [wip, uni/XPUB, dev/python]
---
I am *finally* learning a web framework! We are diving into [during the prototyping classes of XPUB Special Issue 30](https://pzwiki.wdka.nl/mediadesign/Prototyping/2025-2026/T3 'Prototyping/2025-2026/T3').

This is a sparse collection of notes that complements the wiki pages from the course.

The source code I have been tinkering with is [here](https://git.xpub.nl/tommi/flask-intro).

---

By default, Flask runs `app.py`. It’s possible to define a different app with `--app` flag.

```zsh
uv run --app main --debug
```

It is mind-blowing, game-changing for me to learn how the Web works by making little things step-by-step with a software, in this case Flask.

What I am referring to is understanding [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods 'HTTP request methods'), which honestly seemed conceptually sound, yet very abstract and impractical so far. Implementing this methods in Flask and experimenting together in a simple form is what made things click in my head.

It is fascinating to observe how `@app.route` handles requests behind the scenes, and how to channel those requests into changes that are then visible in the web page(s).

---

Instead of simply reading and writing a text file, it’s cleaner and safer to handle JSON. I followed [this simple tutorial](https://www.geeksforgeeks.org/python/reading-and-writing-json-to-a-file-in-python/) to use JSON.

## What to play with

- Making forms on static websites to interact with APIs of Flask or other websites

## Open questions

- How is it that a page automatically reloads after submitting a form?