import Link from "next/link";
import Layout from "../../../components/Layout";

export default function Post(props) {
	const { blog, hasArchive } = props;
	return (
		<>
			<Layout title={blog.title}>
				{blog.map((blog) => (
					<div key={blog.id} className="post-teaser">
						<h2>
							<Link href="/posts/[id]" as={`/posts/${blog.id}`}>
								<a>{blog.title}</a>
							</Link>
						</h2>
						<div>
							<span>{blog.publishedAt.slice(0, 10).replace(/-/g, "/")}</span>
						</div>
					</div>
				))}

				{hasArchive ? (
					<div className="home-archive">
						<Link href="/archive/[page]" as="/archive/1">
							<a>アーカイブ</a>
						</Link>
					</div>
				) : (
					``
				)}
				<style jsx>{`
					.post-body {
						margin-bottom: 70px;
					}
				`}</style>
			</Layout>
		</>
	);
}

export const getStaticProps = async (context) => {
	const MAX_COUNT = 6;
	const id = context.params.slug;
	const apiUrl = "https://shou-blog.microcms.io/api/v1/blog/";
	const key = {
		headers: { "X-API-KEY": process.env.API_KEY },
	};
	const data = await fetch(apiUrl, key)
		.then((res) => res.json())
		.catch(() => null);
	const hasArchive = data.contents.length > MAX_COUNT;
	return {
		props: {
			blog: data.contents.filter((data) => data.name && data.name.name === id),
			hasArchive,
			id: id,
		},
	};
};
export const getStaticPaths = async () => {
	const apiUrl = "https://shou-blog.microcms.io/api/v1/categories";
	const key = {
		headers: { "X-API-KEY": process.env.API_KEY },
	};
	const data = await fetch(apiUrl, key)
		.then((res) => res.json())
		.catch(() => null);
	const paths = data.contents.map(
		(content) => `/posts/categories/${content.name}`
	);
	return { paths, fallback: false };
};
