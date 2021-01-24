import fs from "fs";
import Link from "next/link";
import Layout from "../../../../components/Layout";

import { readBusinessContentFiles } from "../../../../lib/content-loader";

export default function Category(props) {
	const { posts, hasArchive } = props;
	return (
		<Layout title="">
			{posts.map((post) => (
				<div key={post.slug} className="post-teaser">
					<h2>
						<Link
							href="/posts/categories/business/[id]"
							as={`/posts/categories/business/${post.slug}`}
						>
							<a>{post.title}</a>
						</Link>
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
		</Layout>
	);
}

export async function getStaticProps({ params }) {
	const MAX_COUNT = 6;
	const posts = await readBusinessContentFiles({ fs });
	const hasArchive = posts.length > MAX_COUNT;
	return {
		props: {
			posts: posts.slice(0, MAX_COUNT),
			hasArchive,
		},
	};
}
