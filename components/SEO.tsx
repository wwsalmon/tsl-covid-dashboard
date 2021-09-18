import {NextSeo} from "next-seo";
import {useRouter} from "next/router";

export default function SEO({
                                  title = "TSL COVID Dashboard | 5Cs COVID info",
                                  description = "Find the latest information about COVID tests and case counts as well as historical data at the Claremont Colleges",
                                  noindex = false,
                              }: { title?: string, description?: string, noindex?: boolean }) {
    const router = useRouter();
    const fullTitle = title + (router.asPath === "/" ? "" : " | TSL COVID Dashboard");

    let openGraph = {
        title: fullTitle,
        description: description,
        url: "https://covid.tsl.news" + router.asPath,
    };

    return (
        <NextSeo
            title={fullTitle}
            description={description}
            openGraph={openGraph}
            noindex={noindex}
        />
    );
}
