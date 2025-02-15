---
date: 2021-04-04T19:24:15+02:00
updated: 2023-03-18T15:06:23+01:00
tags:
  - geek
  - knowledge
description: Insights about JavaScript, a great tool but also a nightmare.
---
I am stacking here everything I find out on the web which might be useful for when I am finally going to get into the magical universe of JavaScript.

## Resources

- [My Learn Javascript list](https://github.com/stars/xplosionmind/lists/javascript '“JavaScript„ list on GitHub') on GitHub
- [Derek Sivers’s guide](https://sivers.org/learn-js)
- <cite><a href='http://www.javascriptbook.com/' target='_blank' title='JavaScript and JQuery'>JavaScript and JQuery</a></cite>, a book by [Jon Duckett](https://en.wikipedia.org/wiki/John_Duckett 'Jon Duckett on Wikipedia')
- [10 best JavaScript practices recommended by Top Developers](https://blog.hrithwik.me/10-best-javascript-practices-recommended-by-top-developers '10 best JavaScript practices recommended by Top Developers')
- [JavaScript, The Right Way](https://jstherightway.org/ 'JavaScript, The Right Way'), an open source, easy-to-read, quick reference for JS best practices, accepted coding standards, and links around the Web
- [OneMonth](https://onemonth.com/ 'OneMonth official website'), free with [GitHub Education](https://education.github.com 'GitHub Education')

### Node

- [oclif](https://oclif.io 'The Open CLI Framework'): The Open CLI Framework · Create command line tools your users love

## Notes

- When combining stuff, the string always wins
- you can grab the content of a DOM Element by selecting it and using `innerText`
- `textContent` is better than `innerText`

### Reading and writing JSON

To read a JSON file in JavaScript, you can use the `fetch()` method to get the contents of the file as a `Response` object. Then, you can convert the `Response` object to JSON using the `json()` method.

Here is an example:

```
fetch('example.json')
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error))
```

To write a JSON file in JavaScript, you can create an object that you want to write to a file, convert it to a JSON string using the `JSON.stringify()` method, and then write the string to a file using the `fs` module.

Here is an example:

```
const fs = require('fs')

const data = {
	name: 'John',
	age: 30,
	city: 'New York'
}

const jsonData = JSON.stringify(data)

fs.writeFile('example.json', jsonData, err => {
	if (err) {
		console.error(err)
		return
	}
console.log('Data written to file')
})
```
