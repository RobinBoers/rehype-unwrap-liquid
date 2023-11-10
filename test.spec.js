import {expect, test, describe} from 'bun:test';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import {unified} from 'unified';
import rehypeUnwrapLiquid from './index.js';

describe('rehypeUnwrapLiquid', async function () {
	test('should expose the public api', async function () {
		const api = Object.keys(await import('./index.js')).sort();
		expect(api).toEqual(['default']);
	});

	test('should unwrap liquid', async function () {
		const out = String(
			await unified()
				.use(remarkParse)
				.use(rehypeUnwrapLiquid)
				.use(remarkRehype)
				.use(rehypeStringify)
				.process('{% render "something" %}'),
		);

		expect(out).toEqual('{% render "something" %}');
	});

	test('should not unwrap multiple liquid tags', async function () {
		const out = String(
			await unified()
				.use(remarkParse)
				.use(rehypeUnwrapLiquid)
				.use(remarkRehype)
				.use(rehypeStringify)
				.process('{% render "foo" %} {% render "bar" %}'),
		);

		expect(out).toEqual('<p>{% render "foo" %} {% render "bar" %}</p>');
	});

	test('should not unwrap liquid next to other content', async function () {
		const out = String(
			await unified()
				.use(remarkParse)
				.use(rehypeUnwrapLiquid)
				.use(remarkRehype)
				.use(rehypeStringify)
				.process('{% render "foo" %} yoo'),
		);

		expect(out).toEqual('<p>{% render "foo" %} yoo</p>');
	});

	test('should not unwrap if there is no liquid', async function () {
		const out = String(
			await unified()
				.use(remarkParse)
				.use(rehypeUnwrapLiquid)
				.use(remarkRehype)
				.use(rehypeStringify)
				.process('some text'),
		);

		expect(out).toEqual('<p>some text</p>');
	});

	test('should not unwrap liquid expressions', async function () {
		const out = String(
			await unified()
				.use(remarkParse)
				.use(rehypeUnwrapLiquid)
				.use(remarkRehype)
				.use(rehypeStringify)
				.process('{{ some_variable }}'),
		);

		expect(out).toEqual('<p>{{ some_variable }}</p>');
	});
});
