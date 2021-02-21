import "../styles/global.css";
import Router from "next/router";
import { GA_TRACKING_ID, pageview } from "../lib/gtag";
if (GA_TRACKING_ID) {
	Router.events.on("routeChangeComplete", (url) => pageview(url));
}
export const config = { amp: true };
export default function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}