import "../styles/globals.css";
import ReactModal from "react-modal";
import Navbar from "../components/Navbar";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import Router from "next/router";
import Footer from "../components/Footer";

Router.events.on("routeChangeStart", (url, {shallow}) => {
    if (!shallow) NProgress.start();
});
Router.events.on("routeChangeComplete", (url, {shallow}) => {
    if (!shallow) NProgress.done();
    // @ts-ignore
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
    });
});
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({Component, pageProps}) {
    return (
        <div id="app-root">
            <Navbar/>
            <Component {...pageProps} />
            <Footer/>
        </div>
    );
}

ReactModal.setAppElement("#app-root");