import Link from "next/link";
import Layout from "../components/Layout";

export default function Home(props) {
	const { blog, hasArchive } = props;
	return (
		<Layout>
			{blog.map((blog) => (
				<div key={blog.id} className="post-teaser">
					<h2>
						<Link href={`/posts/${blog.id}`}>
							<a>{blog.title}</a>
						</Link>
					</h2>
					<div>
						<span>{blog.publishedAt.slice(0, 10).replace(/-/g, "/")}</span>
						<span className="category">{blog.name && blog.name.name}</span>
					</div>
				</div>
			))}

			{hasArchive ? (
				<div className="home-archive">
					<Link href="/archive/[page]" as="/archive/1">
						<a>アーカイブ</a>
					</Link>
				</div>
			) : null}
			<style jsx>{`
				h2 {
					margin-bottom: 5px;
				}
				.home-archive {
					margin-top: 50px;
				}
			`}</style>
		</Layout>
	);
}

export const getStaticProps = async () => {
	const MAX_COUNT = 6;
	const key = {
		headers: { "X-API-KEY": process.env.API_KEY },
	};
	const data = await fetch("https://shou-blog.microcms.io/api/v1/blog", key)
		.then((res) => res.json())
		.catch(() => null);
	const hasArchive = data.contents.length > MAX_COUNT;
	return {
		props: {
			blog: data.contents,
			hasArchive,
		},
	};
};
