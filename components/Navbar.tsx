import Container from "./headless/Container";
import {useRouter} from "next/router";

export default function Navbar() {
    const router = useRouter();

    return (
        <div className="w-full sticky top-0">
            <Container className="flex items-center my-4" width="full">
                <p>YourApp</p>
            </Container>
        </div>
    );
}