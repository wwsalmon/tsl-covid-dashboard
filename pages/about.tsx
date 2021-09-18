import Container from "../components/headless/Container";
import SEO from "../components/SEO";
import H1 from "../components/headless/H1";

export default function About({}: {}) {
    return (
        <Container width="3xl" className="my-8">
            <SEO title="About"/>
            <H1 className="mb-4">About this dashboard</H1>
            <p className="text-xl">Hello world</p>
        </Container>
    );
}