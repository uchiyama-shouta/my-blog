import Link from "next/link";
import Layout from "../../components/Layout";
import Pager from "../../components/Pager";

const COUNT_PER_PAGE = 10;
export default function Archive(props) {
	const { posts, page, total, perPage } = props;
	return (
		<Layout title="アーカイブ">
			{posts.map((post) => (
				<div key={post.id} className="post-teaser">
					<h2>
						<Link href="/posts/[id]" as={`/posts/${post.id}`}>
							<a>{post.title}</a>
						</Link>
					</h2>
					<div>
						<span>{post.publishedAt.slice(0,10).replace(/-/g, '/')}</span>
					</div>
				</div>
			))}
			<Pager
				page={page}
				total={total}
				perPage={perPage}
				href="/archive/[page]"
				asCallback={(page) => `/archive/${page}`}
			/>
			<style jsx>{`
				.post-teaser {
					margin-bottom: 2em;
				}
				.post-teaser h2 a {
					text-decoration: none;
				}
			`}</style>
		</Layout>
	);
}
/**
 * ページコンポーネントで使用する値を用意する
 */
export async function getStaticProps({ params }) {
	const page = parseInt(params.page, 10);
	const end = COUNT_PER_PAGE * page;
	const start = end - COUNT_PER_PAGE;
	const key = {
		headers: { "X-API-KEY": process.env.API_KEY },
	};
	const data = await fetch("https://shou-blog.microcms.io/api/v1/blog", key)
		.then((res) => res.json())
		.catch(() => null);
	return {
		props: {
			posts: data.contents.slice(start, end),
			page,
			total: data.contents.length,
			perPage: COUNT_PER_PAGE,
		},
	};
}
/**
 * 有効な URL パラメータを全件返す
 */
export async function getStaticPaths() {
	const key = {
		headers: { "X-API-KEY": process.env.API_KEY },
	};
	const data = await fetch("https://shou-blog.microcms.io/api/v1/blog", key)
		.then((res) => res.json())
		.catch(() => null);
	const pages = range(Math.ceil(data.contents.length / COUNT_PER_PAGE));
	const paths = pages.map((page) => ({
		params: { page: `${page}` },
	}));
	return { paths: paths, fallback: false };
}
/**
 * ユーティリティ: 1 から指定された整数までを格納した Array を返す
 */
function range(stop) {
	return Array.from({ length: stop }, (_, i) => i + 1);
}
