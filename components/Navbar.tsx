import {useRouter} from "next/router";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();

    return (
        <div className="w-full sticky top-0 h-16 flex items-center px-4">
            <a href="https://tsl.news">
                <img src="/tsl.svg" alt="TSL Logo" className="h-3"/>
            </a>
            <Link href="/about">
                <a className="ml-auto">About</a>
            </Link>
            <Link href="/">
                <a className="absolute left-1/2" style={{transform: "translateX(-50%)"}}>COVID Dashboard</a>
            </Link>
        </div>
    );
}