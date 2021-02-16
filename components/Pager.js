import Link from "next/link";

const Pager = (props) => {
	const { total, page, perPage, href, asCallback } = props;
	const prevPage = page > 1 ? page - 1 : null;
	let nextPage = null;
	if (page < Math.ceil(total / perPage)) {
		nextPage = page + 1;
	}
	return (
		<>
			<div className="pager">
				<span className="pagerItem">
					{prevPage ? (
						<Link href={href} as={asCallback(prevPage)}>
							<a>{prevPage}</a>
						</Link>
					) : (
						``
					)}
				</span>
				<span className="pagerItem">{page}</span>
				<span className="pagerItem">
					{nextPage ? (
						<Link href={href} as={asCallback(nextPage)}>
							<a>{nextPage}</a>
						</Link>
					) : null}
				</span>
			</div>
			<style jsx>{`
				.pager {
					display: flex;
					flex-direction: row;
					justify-content: center;
					flex-wrap: nowrap;
					padding-top: 20px;
				}
				.pagerItem {
					margin: 0 1em;
				}
			`}</style>
		</>
	);
};
export default Pager;
