import Container from "./headless/Container";

export default function Footer({}: {}) {
    return (
        <Container width="full" className="sm:fixed bottom-0 right-0">
            <p className="text-right text-gray-500 text-sm py-4">Developed by <a href="https://www.samsonzhang.com" className="underline">Samson Zhang</a> PO '25</p>
        </Container>
    );
}