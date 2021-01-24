import fs from "fs";
import path from "path";
import Link from 'next/link'

import Layout from "../../../../components/Layout";
import { listLifeContentFiles, readLifeContentFile } from "../../../../lib/content-loader";

export default function Post(params) {
	return (
		<Layout title={params.title}>
			<div className="post-meta">
				<span>{params.published}</span>
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
			`}</style>
		</Layout>
	);
}

export async function getStaticProps({ params }) {
	const content = await readLifeContentFile({ fs, slug: params.slug });

	return {
		props: {
			...content,
		},
	};
}

export async function getStaticPaths() {
	const paths = listLifeContentFiles({ fs }).map((filename) => ({
		params: {
			slug: path.parse(filename).name,
		},
	}));
	return { paths, fallback: false };
}
