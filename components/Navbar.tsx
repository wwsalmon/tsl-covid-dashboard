import {useRouter} from "next/router";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();

    const themeRGBColor = {
        "/cmc": "152,1,46",
        "/hmc": "51,51,51",
        "/pomona": "0,84,154",
        "/pitzer": "244,146,28",
        "/scripps": "51,115,91",
        "/": "50,116,190",
    }[router.asPath];

    return (
        <>
            <div className="w-full sticky top-0 h-16 flex items-center px-4 z-10">
                <a href="https://tsl.news">
                    <img src="/tsl.svg" alt="TSL Logo" className="h-3"/>
                </a>
                <Link href="/about">
                    <a className="ml-auto">About</a>
                </Link>
                <Link href="/">
                    <a className="absolute left-1/2 font-bold text-lg" style={{transform: "translateX(-50%)"}}>5C COVID Dashboard</a>
                </Link>
            </div>
            {themeRGBColor && (
                <div
                    className="fixed top-0 left-0 w-full h-16 z-0 pointer-events-none"
                    style={{background: `linear-gradient(180deg, rgba(${themeRGBColor},0.125) 0%, rgba(${themeRGBColor},0.0625) 25%, rgba(${themeRGBColor},0) 100%)`}}
                />
            )}
        </>
    );
}