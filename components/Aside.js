import Image from "next/image";
import { circle } from "./Aside.module.css";

const Aside = ({ isAmp }) => {
	return (
		<>
			<aside className="sidebar">
				<div className="profile">
					<div className="">
						{isAmp ? (
							<amp-img
								width="150"
								height="150"
								src="/images/profile.webp"
								alt="内山 翔太の自画像"
								layout="responsive"
							/>
						) : (
							<Image
								src="/images/profile.webp"
								className={circle}
								quality={50}
								alt="内山 翔太の自画像"
								width={150}
								height={150}
							/>
						)}
						<p className="myName">内山 翔太</p>
						<p className="introduceMyself">
							Next.jsを学び始めた、現役高校生のしょうたです。
							<br />
							<br />
							「理想の人生を生きる」をモットーに日々勉強しています。
							現在の目標はNext.jsを使って自分のサービス・アプリを作ることです。
						</p>
					</div>
				</div>
			</aside>
			<style jsx>{`
				.sidebar {
					width: 330px;
					min-width: 330px;
					text-align: center;
				}
				.profile {
					width: 95%;
					padding: 50px 30px;
					border: 1px solid #707070;
				}

				.myName {
					font-size: 30px;
					margin-top: 40px;
				}
				.introduceMyself {
					font-size: 14px;
					width: 90%;
					margin: 0 auto;
					margin-top: 30px;
					text-align: left;
				}
				@media (max-width: 768px) {
					.sidebar {
						margin: 50px auto 0;
					}
				}
			`}</style>
		</>
	);
};

export default Aside;
