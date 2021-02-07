import fs from "fs";
import path, { resolve } from "path";
import Link from "next/link";

import Layout from "../../../../components/Layout";
// import { listProgrammingContentFiles, readProgrammingContentFile } from "../../../../lib/content-loader";

export default function Post(props) {
	const { blog } = props;
	return (
		<Layout title={blog.title}>
			{/* <div className="post-meta">
				<span>{params.published}</span>
				<span className='category'>{params.category}</span>
			</div>
			<div
				className="post-body"
				dangerouslySetInnerHTML={{ __html: params.content }}
			/>
			<Link href="/">
				<a>back to home</a>
			</Link>
			<style jsx>{`
				.post-body {
					margin-bottom: 70px; 
				}
			`}</style> */}
		</Layout>
	);
}

// export async function getStaticProps({ params }) {
// 	const content = await readProgrammingContentFile({ fs, slug: params.slug });

// 	return {
// 		props: {
// 			...content,
// 		},
// 	};
// }

// export async function getStaticPaths() {
// 	const paths = listProgrammingContentFiles({ fs }).map((filename) => ({
// 		params: {
// 			slug: path.parse(filename).name,
// 		},
// 	}));
// 	return { paths, fallback: false };
// }

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
		.then((data) => {
			const arr = data.contents.filter((data) => {
				data.name.name === 'programming'
			})
		})
		.catch(() => null);
	const paths = data.contents.map(
		(content) => `/posts/programming/${content.id}`
	);
	return { paths, fallback: false };
};
