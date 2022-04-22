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
                        <h2 className="font-bold">Note about Pomona dashboard inconsistency</h2>
                        <p className="mt-4">
                            At 10:30 PM PT on April 19, Pomona's COVID dashboard showed that there were 70 positive student cases in the week of April 10, 92 student cases in the week of April 3 and 43 student cases in the week of March 27, as <a
                            href="https://github.com/wwsalmon/tsl-covid-screenshotter/blob/master/scs/2022-04-20-pomona.png"
                            className="underline"
                        >recorded by TSL's daily COVID dashboard screenshotter.</a>
                        </p>
                        <p className="mt-4">
                            Since then, the dashboard has changed case counts to show 40, 78 and 41 cases in the weeks of April 10, April 3 and March 27 respectively. TSL has reached out to Pomona College for an explanation about these changes and will update the TSL COVID dashboard once a response is received.
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