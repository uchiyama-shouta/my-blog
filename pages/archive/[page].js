import Layout from "../../components/Layout";
import Pager from "../../components/Pager";
import Article from "../../components/Article";

export default function Archive(props) {
	const { blog, page, total, perPage } = props;
	return (
		<Layout title="アーカイブ" description="アーカイブ">
			{blog.map((blog) => (
				<Article blog={blog} />
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
export async function getStaticProps({ params }) {
	const COUNT_PER_PAGE = 10;
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
			blog: data.contents.slice(start, end),
			page,
			total: data.contents.length,
			perPage: COUNT_PER_PAGE,
		},
	};
}
export async function getStaticPaths() {
	const COUNT_PER_PAGE = 10;
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
function range(stop) {
	return Array.from({ length: stop }, (_, i) => i + 1);
}
