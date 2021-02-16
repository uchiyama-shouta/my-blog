import Link from "next/link";

const Article = ({ blog }) => {
	return (
		<>
			<article key={blog.id} className="post-teaser">
				<h2>
					<Link href="/posts/[id]" as={`/posts/${blog.id}`}>
						<a>{blog.title}</a>
					</Link>
				</h2>
				<div>
					<span>{blog.publishedAt.slice(0, 10).replace(/-/g, "/")}</span>
				</div>
			</article>
		</>
	);
};

export default Article;
