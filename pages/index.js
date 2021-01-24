import fs from "fs";
import Link from "next/link";
import Layout from "../components/Layout";

import { readAllContent } from "../lib/content-loader";

export default function Home(props) {
	const { posts, hasArchive } = props;
	const random = [1,2,3,4,5,6,7,8,9,0, "a", "b", "c"]
	return (
		<Layout>
			{posts.map((post) => (
				<div key={post.slug + random[Math.floor(Math.random() * 10)]} className="post-teaser">
					<h2>
						{post.category === null ? (
							<Link href="/posts/[id]" as={`/posts/${post.slug}`}>
								<a>{post.title}</a>
							</Link>
						) : (
							<Link
								href="/posts/categories/[category]/[id]"
								as={`/posts/categories/${post.category}/${post.slug}`}
							>
								<a>{post.title}</a>
							</Link>
						)}
					</h2>
					<div>
						<span>{post.published}</span>
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

export async function getStaticProps({ params }) {
	const MAX_COUNT = 6;
	const posts = await readAllContent({ fs });
	const hasArchive = posts.length > MAX_COUNT;
	return {
		props: {
			posts: posts.slice(0, MAX_COUNT),
			hasArchive,
		},
	};
}
