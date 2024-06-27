---
date: 2020-05-06
tags: geek/apps
image: https://www.tomshw.it/images/images/2021/03/foto-generiche-147818.jpg
description: A comprehensive list of apps I use + interesting apps I have to keep record of.
aliases:
  - Software
  - Digital Tools
redirect_from: [/uses/]
toc: true
todo:
  - print whether the app is open source or not
---
Here is {{ description }}.

## MacOS

Right now on my <a href='https://support.apple.com/kb/SP799' title='MacBook Pro 13-inch 2019 tech specs'>MacBook Pro 13-inch 2019</a>:

<ul>
  {% for app in apps -%}
    {% if app.os contains 'MacOS' and app.uninstalled == '' and app.remember == '' -%}
      <li>
        <a href='{{ app.url }}' title='{{ app.name | append: app.title }}'>{{ app.name }}</a>, 
        {{ app.description | markdownify }}. {% if app.price != '' -%}<mark>{{ app.price }}€</mark>.{% endif -%}
      </li>
    {% endif -%}
  {% endfor -%}
</ul>

### Terminal

<ul>
  {% for app in apps -%}
    {% if app.os contains 'terminal' and app.uninstalled == '' and app.remember == '' -%}
      <li>
        <a href='{{ app.url }}' title='{{ app.name | append: app.title }}'>{{ app.name }}</a>,
        {{ app.description | markdownify }}. {% if app.price != '' -%}<mark>{{ app.price }}€</mark>.{% endif --%}
      </li>
    {% endif -%}
  {% endfor -%}
</ul>

## iOS

Apps installed on my [iPhone 12 mini](https://www.apple.com/it/iphone-12 'iPhone 12 mini'):

<ul>
  {% for app in apps -%}
    {% if app.os contains 'iOS' and app.uninstalled == '' and app.remember == '' -%}
      <li>
        <a href='{{ app.url }}' title='{{ app.name | append: app.title }}'>{{ app.name }}</a>,
        {{ app.description | markdownify }}. {% if app.price != '' -%}<mark>{{ app.price }}€</mark>.{% endif -%}
      </li>
    {% endif -%}
  {% endfor -%}
</ul>

## Android

Apps installed on my <a href='https://oneplus.com/6t' title='OnePlus 6T'>OnePlus 6T</a> running <del><a href='https://oneplus.com/oxygenos' title='OxygenOS on OnePlus’ website'>OxygenOS</a></del> [[Switch to LineageOS]].

<div class='yellow box'><h3>Note</h3>My main phone is now an iPhone 12 mini. My OnePlus 6T comfortably sits in a drawer sadly I will not be opening for a while.</div>

<ul>
  {% for app in apps -%}
    {% if app.os contains 'Android' and app.uninstalled == '' and app.remember == '' -%}
      <li>
        <a href='{{ app.url }}' title='{{ app.name | append: app.title }}'>{{ app.name }}</a>,
        {{ app.description | markdownify }}. {% if app.price != '' -%}<mark>{{ app.price }}€</mark>.{% endif -%}
      </li>
    {% endif -%}
  {% endfor -%}
</ul>

## Linuxplosion

Apps which I have installed on my beloved [[Linuxplosion]].

<ul>
  {% for app in apps -%}
    {% if app.os contains 'MacOS' and app.uninstalled == '' and app.remember == '' -%}
      <li>
        <a href='{{ app.url }}' title='{{ app.name | append: app.title }}'>{{ app.name }}</a>,
        {{ app.description | markdownify }}. {% if app.price != '' -%}<mark>{{ app.price }}€</mark>.{% endif -%}
      </li>
    {% endif -%}
  {% endfor -%}
</ul>

### Worth noting

Interesting tools and software to test

- [Pacstall](https://pacstall.dev) - The AUR for Ubuntu

## Server

The services I self-hosted which are running on my server can be found in the [[Nebuchadnezzar]] Jam ingredient.

## Awesome Software

Lists with a ton of apps which are too valuable to be forgotten

- [awesome-macOS](https://github.com/iCHAIT/awesome-macOS)
- [awesome-command-line-apps](https://github.com/herrbischoff/awesome-command-line-apps)
- [awesome-macos-command-line](https://github.com/herrbischoff/awesome-macos-command-line)
- [open-source-mac-os-apps](https://github.com/serhii-londar/open-source-mac-os-apps)

## Worth remembering

Apps which are not installed but it is worth remembering or testing in the future.

<ul>
  {% for app in apps -%}
    {% if app.remember != '' -%}
      <li>
        <a href='{{ app.url }}' title='{{ app.name | append: app.title }}'>{{ app.name }}</a>,
        {{ app.description | markdownify }}. {% if app.price != '' -%}<mark>{{ app.price }}€</mark>.{% endif -%}
      </li>
    {% endif -%}
  {% endfor -%}
</ul>

## Missing digital tools

<div class='blue box'>
  Although I literally <strong>love</strong> some of the apps I installed on my devices, there are some <a href='https://tommi.space/missing-digital-tools' title='Missing Digital Tools - tommi.space'>Missing digital tools</a> that I keep note of, in case someone with more programming expertise than me may be able to develop.
</div>

![[Missing digital tools]]
