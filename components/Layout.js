import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./layout.module.css";
import { useState } from "react";

const Layout = (props) => {
	const [isOpened, setIsOpend] = useState(false);
	const { title, children } = props;
	const myName = "翔太";
	const siteTitle = "しょうBlog";

	const isOpenedToggle = () => {
		setIsOpend(!isOpened);
	};

	return (
		<div className={styles.page}>
			<Head>
				<title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className={styles.container}>
				<div className={styles.header}>
					<h1 className={styles.siteTitle}>
						<Link href="/">
							<a>{siteTitle}</a>
						</Link>
					</h1>
					<div className={styles.hamburger}>
						<button onClick={isOpenedToggle} className={styles.btn}>
							{isOpened ? (
								<>
									<div className={styles.hamburgerCross}></div>
									<div className={styles.hamburgerCross}></div>
								</>
							) : (
								<>
									<div className={styles.hamburgerLine}></div>
									<div className={styles.hamburgerLine}></div>
									<div className={styles.hamburgerLine}></div>
								</>
							)}
						</button>
					</div>
				</div>
				<div className={!isOpened && styles.blackLine}></div>
				<div className={isOpened ? styles.show : styles.categories}>
					<ul>
						<li>
							<Link href="/posts/categories/programming/list">
								<a>programming</a>
							</Link>
						</li>
						<li>
							<Link href="/posts/categories/life/list">
								<a>life</a>
							</Link>
						</li>
						<li>
							<Link href="/posts/categories/business/list">
								<a>business</a>
							</Link>
						</li>
					</ul>
				</div>
			</header>

			<div className={styles.main}>
				<main className={styles.content}>
					{title ? <h1 className={styles.page - title}>{title}</h1> : ``}
					<div className="page-main">{children}</div>
				</main>
				<aside className={styles.sidebar}>
					<div className={styles.profile}>
						<div className="">
							<Image
								src="/images/profile.jpg"
								className={styles.circle}
								alt={`${myName}の自画像`}
								width={150}
								height={150}
							/>
							<p className={styles.myName}>{myName}</p>
							<p className={styles.introduceMyself}>
								Next.jsを学び始めた、現役高校生のしょうたです。
								<br />
								<br />
								「理想の人生を生きる」をモットーに日々勉強しています。
								現在の目標はNext.jsを使って自分のサービス・アプリを作ることです。
							</p>
						</div>
					</div>
				</aside>
			</div>
			<footer className={styles.footer}>&copy; {siteTitle}</footer>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: sans-serif;
					color: #222;
					width: 100vw;
				}
				html {
					width: 100vw;
				}
				img,
				iframe {
					max-width: 100%;
				}
				h1,
				h2,
				h3,
				h4,
				h5,
				h6 {
					font-family: Montserrat, -apple-system, "Segoe UI", "Helvetica Neue",
						"Hiragino Kaku Gothic ProN", メイリオ, meiryo, sans-serif;
				}
				* {
					box-sizing: border-box;
				}
				h1 {
					margin-bottom: 5px;
				}
				a {
					color: #0044cc;
					text-decoration: none;
				}
				main a:hover {
					text-decoration: underline;
				}
				main a:visited {
					color: #551a8b;
				}
			`}</style>
		</div>
	);
};

export default Layout;
