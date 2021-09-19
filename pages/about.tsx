import Container from "../components/headless/Container";
import SEO from "../components/SEO";
import H1 from "../components/headless/H1";
import DataDescription from "../components/DataDescription";
import {allSchools} from "./index";
import getSchoolName from "../utils/getSchoolName";
import Link from "next/link";

export default function About({}: {}) {
    return (
        <Container width="3xl" className="my-8">
            <SEO title="About"/>
            <H1 className="mb-4">About this dashboard</H1>
            <div className="prose mt-6" style={{fontSize: 18}}>
                <p><i>The Student Life</i>'s 5C COVID dashboard, accessible at covid.tsl.news, aggregates COVID testing data from each of the 5C schools and displays them in one easy-to-read dashboard.</p>
                <p>The dashboard first launched on September 19, 2021, developed by TSL News Staff Writer <a href="https://www.samsonzhang.com">Samson Zhang (PO '25)</a> and maintained by TSL staff.</p>
                <p>Data displayed on the dashboard is manually updated every Sunday for the previous week starting on Monday. Data is sourced from reports published by each of the 5C schools. The specifics for each school are detailed in the sections below.</p>
                <p>The dashboard's code is <a href="https://github.com/wwsalmon/tsl-covid-dashboard">open-source on GitHub.</a></p>
                <hr/>
                <h3>Data sourcing</h3>
                {allSchools.map(d => (
                    <>
                        <Link href={`/${d}`}><a><h4>{getSchoolName(d)}</h4></a></Link>
                        <DataDescription school={d}/>
                        <hr/>
                    </>
                ))}
            </div>
        </Container>
    );
}