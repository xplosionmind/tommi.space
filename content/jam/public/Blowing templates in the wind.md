---
date: 2025-12-18T15:54:14+01:00
tags:
  - meta
  - dev/web/11ty
  - wip
aliases:
  - Switch from Liquid to Vento in Eleventy
permalink: /vento/
description: Migrating from Liquid to Vento templating language in Eleventy.
toc: true
---
I felt the aches and the limits of templating languages since [my very first website](https://github.com/xplosionmind/old.tommi.space 'old.tommi.space repository on GitHub') made with [Jekyll](https://jekyllrb.com/). At the time, I was super scared of any sort of language beyond [Liquid](https://jekyllrb.com/docs/liquid/ '“Liquid” in Jekyll’s documentation'), and this is how I got comfortable, but also stuck, with it. What if I want to do something that is not possible to do in Liquid, or if it requires a ton of syntax, while a couple of lines of JavaScript would achieve the same result?

As soon as I found out about [Vento](https://vento.js.org), I realized that it was the breath of fresh air I was looking for. I decided to switch: both my gut feeling and all the information I could find convinced me it was the right choice.

As I transition to using Vento as the main (and only) templating language, I am annotating and documenting what I learn here.
## Introductory resources

I will not go through what other knowledgeable people explained already. Here are the very insightful resources I used to wrap my head around how Vento works, and how to switch to it from Liquid.

https://youtu.be/_854y7c0D-0

- [Vento: My Favourite Template Language for Eleventy \| Helen Chong, Web Developer](https://helenchong.dev/blog/posts/2025-05-21-vento-in-eleventy/)
- [From Nunjucks to Vento in Eleventy: a migration guide (kinda) \| chriskirknielsen](https://chriskirknielsen.com/blog/from-nunjucks-to-vento-in-eleventy-migration-guide/)
## Replacing Liquid filters

Unfortunately, all the language-specific information I could find is about switching from to Vento from [Nunjucks](https://mozilla.github.io/nunjucks/). Nevertheless, I have always used [Liquid](https://liquidjs.com), and I got used to its logic and syntax. I had to recreate some Liquid filters in the 

### `strip_html`

To recreate [LiquidJS’ `strip_html` filter](), I followed [this code snippet from CSS-Tricks](https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/ 'Strip HTML Tags in JavaScript | CSS-Tricks') to make a filter out of a regex that strips away HTML tags.

```js
eleventyConfig.addFilter('strip_html', (str) => {
	return str.replace(/(<([^>]+)>)/gi, '');
});
```

### `date_to_xmlschema`

To recreate [LiquidJS’ `date_to_xmlschema`](https://liquidjs.com/filters/date_to_xmlschema.html), I took advantage of [the `Date.prototype.toISOString()` JavaScript method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString 'Date.prototype.toISOString() on MDN'). Therefore, I didn’t even need to create a custom filter.


```vto
{% raw %}{{ somedatevariable |> toISOString() }}{% endraw %}
```

<div class='yellow box'>
	<strong>Note</strong>: this filter automatically converts the time to UTC+0 timezone. I have to figure out how to preserve the original timezone.
</div>
