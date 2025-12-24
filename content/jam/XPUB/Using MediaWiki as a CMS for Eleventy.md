---
date: 2025-10-30T11:18:00+01:00
updated: 2025-12-12T10:25:00+01:00
tags:
  - geek/web
location: XPUB studio
description: The steps I followed and what I learned by using the XPUB Wiki as the source for the content of a static website built with Eleventy.
permalink: /mediawiki-11ty/
wiki_title: Using MediaWiki as a CMS for Eleventy
---
## Context

Since the beginning of the trimester, we ([XPUB1 students](https://pzwiki.wdka.nl/mediadesign/Students#2025/2027 '2025/2027 Students – XPUB Wiki')) have been thinking about the best way to make a website for [our first Special Issue](https://pzwiki.wdka.nl/mediadesign/Writing_Machines%E2%80%93Protocols%E2%80%93Feedback 'Writing Machines–Protocols–Feedback – XPUB Wiki') (SI28), and [the related event](https://pzwiki.wdka.nl/SI28/Public-Event) at [Ubik](https://worm.org/spaces/ubik/ 'UBIK - Worm - A Rotterdam based organisation working at the intersection of culture and arts.').

All XPUB students use [the wiki](https://pzwiki.wdka.nl/mediadesign/Main_Page 'XPUB Wiki Main Page') regularly, because it is a critical and ubiquitous tool of our learning process. Therefore, we all agreed that using [MediaWiki](https://mediawiki.org 'MediaWiki’s homepage') (the software powering our wiki, as well as Wikipedia (this is why they look very similar)) would have been the easiest choice.

I asked [Kim](https://pzwiki.wdka.nl/mediadesign/User:Kim 'User:Kim – XPUB Wiki') to give us an introduction to the MediaWiki API and walk us through the process she followed to make the website of the [Special Issue 25](https://hub.xpub.nl/cerealbox/Special-Issue-25/view.html 'Protocols for Collective Performance – XPUB Special Issue 25'). [The workshop](https://pzwiki.wdka.nl/mediadesign/Wiki_Website_Workshop 'Wiki Website Workshop – XPUB Wiki') she hosted was super insightful. It helped a lot to (at least initially) overcome my terror for JavaScript and, even worse, my tremendous fear of APIs. Nevertheless, I believe there are two major limitations with the approach Kim used.

- It relies solely on **front-end JavaScript**: the HTML page the user visits is completely empty, and it’s populated with content only once the page has been fetched from the wiki. As a plain HTML lover, I want to avoid using client-side JavaScript as much as possible, and take advantage of it only when it’s strictly necessary to make something work. In our case, we would be asking the API to give us plain HTML ready to be published, so the page could be fetched beforehand, and just publish an HTML file.
- Every time a website page is visited, the MediaWiki API is called. The more visits to a website page, the more API calls to fetch the same exact content. Both because it is important to limit API calls to the wiki as much as possible, and because the XPUB Wiki sometimes goes down, it would be best **generate HTML from cached pages**.

In my head, I had a faint idea of a solution that would avoid this issues.

## Eleventy backbone

I am a big fan and a heavy user of [Eleventy](https://11ty.dev/ 'Eleventy, a simpler static site generator'), but I have never used the [`eleventy-fetch` plugin](https://www.11ty.dev/docs/plugins/fetch/ 'Fetch plugin – Eleventy Docs'). I read many nice things about it, so I really wanted to try it. This was the perfect occasion to learn more about it and put it to work.

I will skip introducing Eleventy, as I look forward to planning an introductory workshop about it. For the time being, the essential information to get started is [in the SI28 website repository README](https://git.xpub.nl/XPUB/SI28) and in [Eleventy’s docutmentation](https://11ty.dev/docs/).

## Workflow

### In MediaWiki

1. Assign to a specific category the pages that are to be published. Ideally, create a sub-category for every specific section. By doing so, the result is having general-scoped pages that do not belong to the parent category directly, and having neat categories with only one kind of page. This is best understood with an example for our specific instance:
	- The parent category is [SI28](https://pzwiki.wdka.nl/mediadesign/Category:SI28). In MediaWiki, sub-categories are not created by merely naming something `ParentCategory/ChildCategory`, but it is necessary to add the parent category to the child category itself. As you can see if you open the raw wikitext in the following sub-categories, I had to write `[[Category: SI28]]` for them to be linked to the SI28 category.
		- The [SI28/Blog](https://pzwiki.wdka.nl/mediadesign/Category:SI28/Blog) sub-category collects commentaries and thoughts about from students.
		- The [SI28/Projects](https://pzwiki.wdka.nl/mediadesign/Category:SI28/Projects) sub-category collects all the works we created for the public event.
		- The [SI28/Radio Shows](https://pzwiki.wdka.nl/mediadesign/Category:SI28/Radio_Shows) sub-category collects all information and links to the radio shows we recorded at WORM every Monday morning.
		- The [SI28/Writing Machines](https://pzwiki.wdka.nl/mediadesign/Category:SI28/Writing_Machines) sub-category collects all Writing Machines that we created/played with during the trimester.
2. Make sure that that pages do not belong to more than one of the categories you are importing. If that is not the case, it would mean that Eleventy would be fetching the page multiple times, as part of multiple categories, and this would cause conflicts to parse permalinks in particular: you would have multiple sources attempting to write to the same URL—even though all sources come from the same page, replicated in multiple categories.

## In Eleventy

To do everything in Eleventy we are writing custom JavaScript functions that use the MediaWiki API to fetch things, and perform everything by being called in the global configuration file. Finally using Liquid pagination templates to generate the pages.

1. Create a JavaScript file anywhere in the input directory. In this case: `/input/utilities/fetchFromWiki.js`.
2. Import the dependencies we will be using, and create a variable that stores the URL of the API:
	```js
	import EleventyFetch from '@11ty/eleventy-fetch';
	import { DOMParser, Element } from '@b-fuze/deno-dom';
	
	const WIKI_URL = 'https://pzwiki.wdka.nl/';
	const MEDIAWIKI_API = 'https://wiki.xpub.nl/mw-mediadesign/api.php?';
	```
3. Get the list of pages that belong to a category by composing the URL and passing it to `EleventyFetch` to get the pages:
	```js
		export async function getCategoryMembers(category) {
		const url = MEDIAWIKI_API + new URLSearchParams({
			action: 'query',
			list: 'categorymembers',
			cmtitle: 'Category:' + category,
			cmlimit: '500',
			format: 'json',
			origin: '*'
		});
		const data = await EleventyFetch(url, {
			duration: '1d', // Caching time
			type: 'json'
		});
		return data.query.categorymembers;
	}
	```
	I decided to use the `URLSearchParams` functionality, but it is merely a cleaner and fancier way to compose a URL. It is the same as ``${MEDIAWIKI_API}action=query&list=categorymembers&cmtitle=Category:${category}&cmlimit=500&format=json&origin=*``
4. Get the content of the page and clean it (see following point):
	```js
		export async function getPageContent(title) {
		const url = MEDIAWIKI_API + new URLSearchParams({
			action: 'parse',
			page: title,
			prop: 'text',
			format: 'json',
			origin: '*'
		});
		const data = await EleventyFetch(url, {
			duration: '1d',
			type: 'json'
		});
		// Super weird: the “*” key is where parsed HTML is stored.
		// The cleanHtml function is explained in the next point.
		const cleanContent = await cleanHtml(data.parse.text['*'])
		// We are assigning a permalink that replicates the wiki structure
		const permalink = '/' + title.replace(/ /g, '_') + '/';
		console.log(`Fetching ${title}`);
		return {
			title: title,
			url: permalink,
			content: cleanContent
		};
	}
	```
5. The content we fetched is exactly the same as the HTML generated by MediaWiki, to display a page in the wiki itself. Therefore, it contains the table of contents, all the MediaWiki-generated classes, and any inline styling. Thanks to the DOM manipulator that we initially imported, we are able to perform HTML modifications as we wish:
	- stripping away what we do not need/want. In this case:
		- the <q>edit</q> links after every heading
		- any inline styling;
		- the `srcset` attribute, because we let eleventy-img handle the images’ sizes;
	- using regular expressions, change relative links to image sources to absolute links and replace the links to thumbnails with the URL of their full-sized source files;
	- using regular expressions, change relative links to absolute links, prepending the wiki URL;
	```js
	export async function cleanHtml(content) {
		const doc = new DOMParser().parseFromString(
			`<body>${content}</body>`,
			'text/html',
		);
		const walk = (node) => {
			if (node instanceof Element) {
				if (node.classList.contains('mw-editsection') || node.classList.contains('toctogglecheckbox')) {
					node.remove();
					return;
				}
				node.removeAttribute('style');
				node.removeAttribute('srcset');

				const srcAttr = node.getAttribute('src');
				if (srcAttr && (srcAttr.startsWith('/mw-mediadesign/') || srcAttr. startsWith('/mediadesign/'))) {
					node.setAttribute('src', `https://pzwiki.wdka.nl${srcAttr.replace(/\/thumb(.*)\/.*/, '$1')}`);
				}

				const hrefAttr = node.getAttribute('href');
				if (hrefAttr && (hrefAttr.startsWith('/mw-mediadesign/') || hrefAttr.startsWith('/mediadesign/'))) {
					node.setAttribute('href', `https://pzwiki.wdka.nl${hrefAttr}`);
				}

				for (const child of node.childNodes) {
					walk(child);
				}
			}
		};
		walk(doc.body);
		return doc.body.innerHTML;
	}
	```
6. At the end of the file, we call all the functions:
	```js
	export default async function fetchCategoryContent(category) {
		const members = await getCategoryMembers(category);
		const results = [];
		for (const page of members) {
			const content = await getPageContent(page.title);
			results.push(content);
		}
		return results;
	}
	```
	The source code of the final JavaScript file is [here](+++ 'fetchFromWiki.js').
7. Moving to the global configuration file (in our case, `eleventy.config.js`), we are using Eleventy’s collections API to generate a collection out of each imported category, and its children:
	```js
	export default function (eleventyConfig) {
		…
		eleventyConfig.addCollection('SI28', async function (collectionApi) {
			const pages = await fetchCategoryContent('SI28');
			return pages;
		});
		…
	}
	```
8. Finally, let’s generate the actual pages on the website. Even though we have *fetched* the pages from the wiki, we have not told Eleventy to parse them and effectively *generate* them, so they are not part of the output. To do it, we will be generating templates using pagination. It suffices to create a Liquid file for each category/collection:
	```yaml
	---{{ echo }}
	pagination:
	  data: collections.SI28
	  size: 1
	alias: wikipage
	layout: main.vto
	permalink: '{{ wikipage.url }}'
	eleventyComputed:
	  title: '{{ wikipage.title }}'
	---
	<h1>{{ wikipage.title }}</h1>
	<article>
		{{ wikipage.content }}
	</article>{{ /echo }}
	```

## Open challenges

- The pages fetched from the wiki are stored in collections as arrays. What if I want to get a specific page? Can I only do it calling the collection and use the array numbering selector to choose a specific page? If yes, it would mean that, if that collection’s size changes, I might be selecting a different page. For example, in the SI28 website, how can I get the Colophon page from the SI28 category, and parse it into the footer?
