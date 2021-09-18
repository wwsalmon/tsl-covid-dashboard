import Container from "./headless/Container";
import {useRouter} from "next/router";

export default function Navbar() {
    const router = useRouter();

    return (
        <div className="w-full sticky top-0 h-16 flex items-center px-4">
            <p className="font-serif uppercase font-semibold text-lg">The Student Life</p>
            <p className="ml-auto">About</p>
            <p className="absolute left-1/2" style={{transform: "translateX(-50%)"}}>COVID Dashboard</p>
        </div>
    );
}