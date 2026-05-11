import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

export default function (eleventyConfig, options = {}) {
	const md = options.md;

	eleventyConfig.addPreprocessor(
		'pluginMarkdownEmbed',
		'md',
		(data, content) => {
			if (!content) return content;
			console.log(`[pluginMarkdownEmbed] Processing: ${data.page.inputPath}`);

			// Regex to match markdown image syntax: ![alt text](file path)
			const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
			const inputDir = './'; // matches dir.input

			function processEmbeds(contentToProcess, currentSourceDir) {
				if (!contentToProcess) return contentToProcess;

				return contentToProcess.replace(imageRegex, (match, altText, fullFilePath, offset, fullContent) => {
					let parentLevel = 0;
					const textBefore = fullContent.substring(0, offset);
					const headingsBefore = textBefore.match(/^#+\s+/gm);
					if (headingsBefore && headingsBefore.length > 0) {
						parentLevel = headingsBefore[headingsBefore.length - 1].trim().length;
					}
					const decodedPath = decodeURI(fullFilePath);
					const [rawFilePath, ...hashParts] = decodedPath.split('#');
					const filePath = rawFilePath;
					const hash = hashParts.join('#');

					const isEmbeddableFile = filePath.endsWith('.html') || filePath.endsWith('.md');

					if (!isEmbeddableFile) {
						return match;
					}

					const relativeToSource = path.resolve(currentSourceDir, filePath);
					const relativeToInput = path.resolve(inputDir, filePath);

					let fullPath;
					if (existsSync(relativeToSource)) {
						fullPath = relativeToSource;
					} else if (existsSync(relativeToInput)) {
						fullPath = relativeToInput;
					} else {
						console.warn(`[pluginMarkdownEmbed]   File not found: "${filePath}"`);
						return match;
					}

					try {
						let fileContent = readFileSync(fullPath, 'utf8');

						// Strip YAML front matter if present
						if (fileContent.startsWith('---')) {
							const endOfFrontMatter = fileContent.indexOf('\n---', 3);
							if (endOfFrontMatter !== -1) {
								fileContent = fileContent.substring(endOfFrontMatter + 4).trimStart();
							}
						}

						if (hash) {
							const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
							const headingRegex = new RegExp(`^(#+)\\s+${escapeRegExp(hash.trim())}\\s*$`, 'm');
							const headingMatch = fileContent.match(headingRegex);

							if (headingMatch) {
								const headingLevel = headingMatch[1].length;
								const startIndex = headingMatch.index;
								const contentAfterHeading = fileContent.substring(startIndex + headingMatch[0].length);
								const nextHeadingRegex = new RegExp(`^#{1,${headingLevel}}\\s+`, 'm');
								const nextMatch = contentAfterHeading.match(nextHeadingRegex);

								if (nextMatch) {
									fileContent = fileContent.substring(startIndex, startIndex + headingMatch[0].length + nextMatch.index);
								} else {
									fileContent = fileContent.substring(startIndex);
								}
							} else {
								console.warn(`[pluginMarkdownEmbed]   Heading "${hash}" not found in "${filePath}"`);
								return match;
							}
						}

						const embeddedHeadings = fileContent.match(/^#+\s+/gm);
						if (embeddedHeadings && embeddedHeadings.length > 0 && parentLevel > 0) {
							const minEmbeddedLevel = Math.min(...embeddedHeadings.map(h => h.trim().length));
							const shift = (parentLevel + 1) - minEmbeddedLevel;
							if (shift !== 0) {
								fileContent = fileContent.replace(/^(#+)(\s+.*)$/gm, (m, hashes, rest) => {
									const newLevel = Math.max(1, hashes.length + shift);
									return '#'.repeat(newLevel) + rest;
								});
							}
						}

						// Recursively process embeds inside the included file
						fileContent = processEmbeds(fileContent, path.dirname(fullPath));

						if (filePath.endsWith('.md')) {
							if (md) {
								fileContent = md.render(fileContent);
							} else {
								console.warn('[pluginMarkdownEmbed] Warning: md instance not provided in options');
							}
						}

						const linkText = altText || hash || filePath;
						return `<a href="${fullFilePath}" class=transclusion-link>${linkText}</a>\n<article class=transclusion>\n${fileContent}\n</article>`;
					} catch (err) {
						console.error(`[pluginMarkdownEmbed]   Error reading file: ${err.message}`);
						return match;
					}
				});
			}

			return processEmbeds(content, path.dirname(data.page.inputPath));
		}
	);
}
