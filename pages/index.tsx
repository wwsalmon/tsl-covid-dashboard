import Container from "../components/headless/Container";
import {useState} from "react";
import data from "../data/data.json";
import {DataItem, schoolOpts} from "../utils/types";
import LegendSchool from "../components/LegendSchool";
import H3 from "../components/headless/H3";
import MainStats from "../components/MainStats";
import H1 from "../components/headless/H1";

export const allSchools: schoolOpts[] = ["cmc", "hmc", "pitzer", "pomona", "scripps"];

export default function Home() {
    const [currentDate, setCurrentDate] = useState<string>("2021-08-30");
    const currentItems = data.filter(d => d.weekStart === currentDate) as DataItem[];

    return (
        <Container width="5xl" className="my-16">
            <H1>COVID at the 5Cs</H1>
            <p className="text-gray-500 text-xl mt-2">Your one dashboard for COVID information at the five Claremont Colleges</p>
            <hr className="my-12"/>
            <div className="flex">
                <div className="flex-shrink-1 min-w-0 pr-8">
                    <MainStats currentDate={currentDate} setCurrentDate={setCurrentDate}/>
                </div>
                <div className="ml-auto w-80 pl-4 border-l box-content flex-shrink-0">
                    <H3>Data by school</H3>
                    <p className="text-gray-500 mb-8">Click on a school for details</p>
                    <div className="flex items-center py-3 px-4 rounded">
                        <div className="w-4 h-4 mr-4 flex items-center justify-center">
                            <span className="font-bold text-gray-500">E</span>
                        </div>
                        <h3 className="font-serif font-bold my-1 text-gray-700">Employee</h3>
                    </div>
                    {allSchools.map(school => (
                        <LegendSchool school={school} items={currentItems}/>
                    ))}
                </div>
            </div>
        </Container>
    );
}