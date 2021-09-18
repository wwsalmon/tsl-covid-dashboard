import {useRouter} from "next/router";
import Link from "next/link";
import Button from "./headless/Button";
import {FiMenu, FiX} from "react-icons/fi";
import {useState} from "react";
import {allSchools} from "../pages";
import getSchoolName from "../utils/getSchoolName";
import H3 from "./headless/H3";

export default function Navbar() {
    const router = useRouter();
    const {school} = router.query;

    const themeRGBColor = router.route === school ? {
        "cmc": "152,1,46",
        "hmc": "51,51,51",
        "pomona": "0,84,154",
        "pitzer": "244,146,28",
        "scripps": "51,115,91",
    }[school] : "50,116,190";

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <>
            <div className="w-full sticky top-0 h-16 flex items-center px-4 z-10 bg-white">
                <a href="https://tsl.news">
                    <img src="/tsl.svg" alt="TSL Wordmark" className="h-3 hidden sm:block"/>
                    <img src="/tsl-logo.svg" alt="TSL Logo" className="h-5 sm:hidden"/>
                </a>
                <Link href="/about">
                    <a className="ml-auto hidden sm:block text-gray-500">About</a>
                </Link>
                <Link href="/">
                    <a
                        className="absolute left-1/2 font-bold sm:text-lg whitespace-nowrap"
                        style={{transform: "translateX(-50%)"}}
                    >5C COVID Dashboard</a>
                </Link>
                <Button containerClassName="ml-auto sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <FiMenu/>
                </Button>
                <div className="fixed h-full w-72 top-0 right-0 transition-all bg-white shadow-md flex flex-col items-end justify-center p-6 z-30" style={{marginRight: menuOpen ? "0" : "-100%"}}>
                    <div className="absolute top-6 right-6">
                        <Button onClick={() => setMenuOpen(false)}>
                            <FiX/>
                        </Button>
                    </div>
                    <H3 className="mb-2">By school</H3>
                    {allSchools.map(d => (
                        <Button containerClassName="py-2 text-xl text-right" href={`/${d}`}>{getSchoolName(d)}</Button>
                    ))}
                    <H3 className="mt-8 mb-2">Other info</H3>
                    <Button containerClassName="py-2 text-xl" href="About">About this dashboard</Button>
                    <Button containerClassName="py-2 text-xl" href="https://tsl.news">The Student Life home</Button>
                    <p className="absolute bottom-6 right-6 text-gray-500 text-sm">
                        Developed by Samson Zhang
                    </p>
                </div>
            </div>
            {themeRGBColor && (
                <div
                    className="fixed top-0 left-0 w-full h-16 z-20 pointer-events-none"
                    style={{background: `linear-gradient(180deg, rgba(${themeRGBColor},0.125) 0%, rgba(${themeRGBColor},0.0625) 25%, rgba(${themeRGBColor},0) 100%)`}}
                />
            )}
        </>
    );
}