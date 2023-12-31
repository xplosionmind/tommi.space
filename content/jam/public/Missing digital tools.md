---
date: 2020-02-26
updated: 2022-03-30T09:45:41+02:00
tags:
  - help
  - idea
  - geek/dev
aliases:
  - Programming ideas
  - Development ideas
  - Missing Apps
description: Ideas for any sort of software that I would find extremely useful but that to my knowledge does not exist, yet.
permalink: /missing-tools/
redirect_from:
  - /tools-ideas/
  - /programming-ideas/
  - /development-ideas/
  - /apps-ideas/
  - /missing-apps/
  - /missing-digital-tools/
main: true
toc: false
type: CollectionPage
---
{{ description }}

<ul>
  {%- for note in collections.jam -%}
    {%- for tag in note.data.tags -%}
      {%- if tag contains 'geek/idea' -%}
        <li id='{{ note.data.title | slugify }}'>
          <strong><a href='{{ note.url }}' title='{{ note.data.title }}'>{{ note.data.title }}</a></strong>
          {%- if note.data.description -%}: {{ note.data.description }}{%- endif -%}
        </li>
      {%- endif -%}
    {%- endfor -%}
  {%- endfor -%}
</ul>
