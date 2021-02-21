import Link from "next/link";
import Layout from "../components/Layout";
import Article from "../components/Article";
import { useAmp } from "next/amp";
export const config = { amp: "hybrid" };

export default function Home(props) {
	const isAmp = useAmp();
	const { blog, hasArchive } = props;
	return (
		<Layout description="記事一覧ページ" isAmp={isAmp}>
			{blog.map((blog) => (
				<Article blog={blog} />
			))}

			{hasArchive ? (
				<div className="home-archive">
					<Link href="/archive/[page]" as="/archive/1">
						<a>アーカイブ</a>
					</Link>
				</div>
			) : null}
			<style jsx>{`
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
