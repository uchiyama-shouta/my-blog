import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";
import Aside from './Aside'
import { useState } from "react";

export const config = { amp: true };

const Layout = (props) => {
	const [isOpened, setIsOpend] = useState(false);
	const { title, children, description } = props;
	const siteTitle = "しょうBlog";

	const isOpenedToggle = () => {
		setIsOpend(!isOpened);
	};

	return (
		<div className={styles.page}>
			<Head>
				<title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
				<meta name="description" content={description} />
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
						<button
							onClick={isOpenedToggle}
							className={styles.btn}
							name="メニューボタン"
							aria-label="メニューボタン"
						>
							{isOpened ? (
								<>
									<div className={styles.hamburgerCross} />
									<div className={styles.hamburgerCross} />
								</>
							) : (
								<>
									<div className={styles.hamburgerLine} />
									<div className={styles.hamburgerLine} />
									<div className={styles.hamburgerLine} />
								</>
							)}
						</button>
					</div>
				</div>
				<div className={!isOpened && styles.blackLine} />
				<div className={isOpened ? styles.show : styles.categories}>
					<ul>
						<li>
							<Link href="/posts/categories/programming">
								<a>programming</a>
							</Link>
						</li>
						<li>
							<Link href="/posts/categories/life">
								<a>life</a>
							</Link>
						</li>
						<li>
							<Link href="/posts/categories/business">
								<a>business</a>
							</Link>
						</li>
					</ul>
				</div>
			</header>

			<div className={styles.main}>
				<main className={styles.content}>
					{title && <h1 className={styles.page}>{title}</h1>}
					<div className="page-main">{children}</div>
				</main>
				<Aside />
			</div>
			<footer className={styles.footer}>&copy; {siteTitle}</footer>
		</div>
	);
};

export default Layout;