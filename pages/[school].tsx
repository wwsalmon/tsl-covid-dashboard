import Container from "../components/headless/Container";
import MainStats from "../components/MainStats";
import {useState} from "react";
import {useRouter} from "next/router";
import {schoolOpts} from "../utils/types";
import H1 from "../components/headless/H1";
import getSchoolName from "../utils/getSchoolName";
import Button from "../components/headless/Button";
import {FiArrowLeft} from "react-icons/all";

export default function SchoolPage() {
    const router = useRouter();
    const { school } = router.query;

    const [currentDate, setCurrentDate] = useState<string>("2021-08-30");

    return (
        <Container width="3xl" className="my-16">
            <Button containerClassName="mb-8" childClassName="flex items-center" href="/">
                <FiArrowLeft/>
                <span className="ml-2">All 5Cs</span>
            </Button>
            <div className="flex items-center mt-12 mb-8">
                <img src={`/logos/${school}.png`} style={{maxWidth: 64, maxHeight: 64}} className="mr-8"/>
                <div>
                    <H1>COVID at {getSchoolName(school as schoolOpts)}</H1>
                    <p className="text-gray-500 text-xl mt-2">Your one dashboard for COVID information at {getSchoolName(school as schoolOpts)}</p>
                </div>
            </div>
            <hr className="my-12"/>
            <MainStats currentDate={currentDate} setCurrentDate={setCurrentDate} school={school as schoolOpts}/>
        </Container>
    );
}