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
                        <h2 className="font-bold">Note about dashboard inconsistencies</h2>
                        <p className="mt-4">
                            During the COVID surge in April, Student Health Services over-counted COVID cases across the 5Cs, TCCS confirmed on April 27.
                        </p>
                        <p className="mt-4">Read TSL's <a href="https://tsl.news/shs-overcounted-covid-cases/" className="underline">coverage of the over-counting here</a>.</p>
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