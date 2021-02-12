import Link from "next/link";
import Layout from "../../components/Layout";

export default function Post(props) {
	const { blog } = props;
	const description = `${blog.title} | ${blog.body.slice(0, 80)}...`;
	return (
		<>
			<Layout title={blog.title} description={description}>
				<div className="post-meta">
					<span>{blog.publishedAt.slice(0, 10).replace(/-/g, "/")}</span>
				</div>
				<div
					className="post-body"
					dangerouslySetInnerHTML={{ __html: blog.body }}
				/>
				<Link href="/">
					<a>back to home</a>
				</Link>
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
	const id = context.params.slug;
	const apiUrl = "https://shou-blog.microcms.io/api/v1/blog/";
	const key = {
		headers: { "X-API-KEY": process.env.API_KEY },
	};
	const data = await fetch(apiUrl + id, key)
		.then((res) => res.json())
		.catch(() => null);
	return {
		props: {
			blog: data,
		},
	};
};
export const getStaticPaths = async () => {
	const apiUrl = "https://shou-blog.microcms.io/api/v1/blog";
	const key = {
		headers: { "X-API-KEY": process.env.API_KEY },
	};
	const data = await fetch(apiUrl, key)
		.then((res) => res.json())
		.catch(() => null);
	const paths = data.contents.map((content) => `/posts/${content.id}`);
	return { paths, fallback: false };
};
