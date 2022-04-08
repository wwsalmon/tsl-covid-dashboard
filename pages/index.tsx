import Container from "../components/headless/Container";
import {useState} from "react";
import data from "../data/data.json";
import {DataItem, schoolOpts} from "../utils/types";
import LegendSchool from "../components/LegendSchool";
import H3 from "../components/headless/H3";
import MainStats, {getDateCounts} from "../components/MainStats";
import SEO from "../components/SEO";
import Link from "next/link";

export const allSchools: schoolOpts[] = ["cmc", "hmc", "pitzer", "pomona", "scripps"];

export default function Home() {
    const dateCounts = getDateCounts(data as DataItem[], "Tested");

    const [currentDate, setCurrentDate] = useState<string>(Object
        .keys(dateCounts)
        .sort((a, b) => +new Date(b) - +new Date(a))[0]
    );

    const currentItems = data.filter(d => d.weekStart === currentDate) as DataItem[];

    return (
        <Container width="5xl" className="my-16">
            <SEO/>
            <div className="sm:flex">
                <div className="flex-shrink-1 min-w-0 sm:pr-8">
                    <div className="bg-tsl p-4 text-white rounded-md mb-12">
                        <h2 className="font-bold">Note about week of April 4 surge</h2>
                        <p className="mt-4">
                            The data on this dashboard reflects the latest weekly data published by each 5C school on their respective COVID dashboards (linked <Link href="/about"><a className="underline"
                        >here</a></Link>).
                        </p>
                        <p className="mt-4">
                            From April 4-6, the 5Cs experienced a <b>surge of over 190 positive cases.</b> These cases are not yet reflected in the schools' testing dashboards, so they will not appear on the dashboard below until next Tuesday, April 12, when all dashboards are updated.
                        </p>
                        <p className="mt-4">
                            For the latest coverage until then, see <a href="https://tsl.news/5c-early-april-case-update/" className="underline">this tsl.news article about the surge</a> and follow @TSLNews on <a
                            href="https://www.instagram.com/tslnews/" className="underline"
                        >Instagram</a> and <a href="https://twitter.com/tslnews" className="underline">Twitter</a>.
                        </p>
                    </div>
                    <MainStats currentDate={currentDate} setCurrentDate={setCurrentDate}/>
                </div>
                <div className="ml-auto sm:w-80 sm:pl-4 sm:border-l box-content flex-shrink-0">
                    <hr className="my-12 sm:hidden"/>
                    <H3>Data by school</H3>
                    <p className="text-gray-500 mb-8">Click on a school for details</p>
                    {allSchools.map(school => (
                        <LegendSchool school={school} items={currentItems}/>
                    ))}
                </div>
            </div>
        </Container>
    );
}