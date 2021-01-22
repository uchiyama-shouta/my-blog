import path from "path";

import remark from "remark";
import html from "remark-html";
import matter from "gray-matter";

import { formatDate } from "./date";

// カテゴリーを追加する時はここに追加する
const DIR = path.join(process.cwd(), "content/posts");
const programmingDIR = path.join(process.cwd(), "content/posts/programming");
const EXTENSION = ".md";

// カテゴリーを追加する時はここに追加する
/**
 * Markdown のファイル一覧を取得する
 * content/posts/ 以下の拡張子が .md のファイルの名前を全件返す
 */
const listContentFiles = ({ fs }) => {
	const filenames = fs.readdirSync(DIR);
	return filenames.filter((filename) => path.parse(filename).ext === EXTENSION);
};
/**
 * Markdown のファイル一覧を取得する
 * content/posts/programming 以下の拡張子が .md のファイルの名前を全件返す
 */
const listProgrammingContentFiles = ({ fs }) => {
	const filenames = fs.readdirSync(programmingDIR);
	return filenames.filter((filename) => path.parse(filename).ext === EXTENSION);
};
// カテゴリーを追加する時はここに追加する
/**
 * Markdown のファイルの中身をパースして取得する
 * content/posts/ 以下の .md ファイル 1 件を frontmatter 付きの Markdown として読み込む
 */
const readContentFile = async ({ fs, slug, filename }) => {
	if (slug === undefined) {
		slug = path.parse(filename).name;
	}
	const raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), "utf8");
	const matterResult = matter(raw);
	const { title, published: rawPublished, category } = matterResult.data;
	const parsedContent = await remark().use(html).process(matterResult.content);
	const content = parsedContent.toString();
	return {
		title,
		published: formatDate(rawPublished),
		category,
		content,
		slug,
	};
};
const readProgrammingContentFile = async ({ fs, slug, filename }) => {
	if (slug === undefined) {
		slug = path.parse(filename).name;
	}
	const raw = fs.readFileSync(
		path.join(programmingDIR, `${slug}${EXTENSION}`),
		"utf8"
	);
	const matterResult = matter(raw);
	const { title, published: rawPublished, category } = matterResult.data;
	const parsedContent = await remark().use(html).process(matterResult.content);
	const content = parsedContent.toString();
	return {
		title,
		published: formatDate(rawPublished),
		category,
		content,
		slug,
	};
};

// カテゴリーを追加する時はここに追加する
/**
 * Markdown のファイルの中身を全件パースして取得する
 */
const readContentFiles = async ({ fs }) => {
	const promisses = listContentFiles({ fs }).map((filename) =>
		readContentFile({ fs, filename })
	);
	const contents = await Promise.all(promisses);
	return contents.sort(sortWithProp("published", true));
};
/**
 * Markdown のファイルの中身を全件パースして取得する
 */
const readProgrammingContentFiles = async ({ fs }) => {
	const promisses = listProgrammingContentFiles({ fs }).map((filename) =>
		readProgrammingContentFile({ fs, filename })
	);
	const contents = await Promise.all(promisses);
	return contents.sort(sortWithProp("published", true));
};

// カテゴリーを追加する時はここに追加する
const readAllContent = async ({ fs }) => {
	const content = listContentFiles({ fs }).map((filename) =>
		readContentFile({ fs, filename })
	);
	const contents = await Promise.all(content);

	const programming = await listProgrammingContentFiles({
		fs,
	}).map((filename) => readProgrammingContentFile({ fs, filename }));
	const programmingContents = await Promise.all(programming);
	const allContents = [...contents, ...programmingContents];
	return allContents.sort(sortWithProp("published", true));
};

// ちゃんとexportする！

/**
 * {
 * 	content/posts/ 以下のファイルの名前を全件返す, ファイルの中身を全件取得する, ファイル 1 件を読み込む,
 * 	上記programmingカテゴリー版, 上記programmingカテゴリー版, 上記programmingカテゴリー版,
 * 	上記categoriesカテゴリー版, 上記categoriesカテゴリー版, 上記categoriesカテゴリー版,
 * }
 */
export {
	listContentFiles,
	readContentFiles,
	readContentFile,
	listProgrammingContentFiles,
	readProgrammingContentFiles,
	readProgrammingContentFile,
	readAllContent,
};

const sortWithProp = (name, reversed) => (a, b) => {
	if (reversed) {
		return a[name] < b[name] ? 1 : -1;
	} else {
		return a[name] < b[name] ? -1 : 1;
	}
};
