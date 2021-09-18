import Container from "../components/headless/Container";
import MainStats, {getDateCounts} from "../components/MainStats";
import {useState} from "react";
import {useRouter} from "next/router";
import {DataItem, schoolOpts} from "../utils/types";
import H1 from "../components/headless/H1";
import getSchoolName from "../utils/getSchoolName";
import Button from "../components/headless/Button";
import {FiArrowLeft} from "react-icons/all";
import data from "../data/data.json";
import SEO from "../components/SEO";

export default function SchoolPage() {
    const router = useRouter();
    const { school } = router.query;

    const dateCounts = getDateCounts(data.filter(d => d.school === school) as DataItem[]);

    const [currentDate, setCurrentDate] = useState<string>(Object
        .keys(dateCounts)
        .sort((a, b) => +new Date(b[0]) - +new Date(a[0]))[0]
    );

    return (
        <Container width="3xl" className="my-4 sm:my-16">
            <SEO title={getSchoolName(school as schoolOpts)}/>
            <Button containerClassName="mb-8" childClassName="flex items-center" href="/">
                <FiArrowLeft/>
                <span className="ml-2">All 5Cs</span>
            </Button>
            <div className="sm:flex items-center sm:mt-12 sm:mb-8">
                <img src={`/logos/${school}.png`} style={{maxWidth: 64, maxHeight: 64}} className="mr-8 mb-8 sm:mb-0"/>
                <div>
                    <H1>COVID at {getSchoolName(school as schoolOpts)}</H1>
                    <p className="text-gray-500 text-xl mt-2">Testing result information for {getSchoolName(school as schoolOpts)} in Claremont, CA</p>
                </div>
            </div>
            <hr className="my-12"/>
            <MainStats currentDate={currentDate} setCurrentDate={setCurrentDate} school={school as schoolOpts}/>
        </Container>
    );
}