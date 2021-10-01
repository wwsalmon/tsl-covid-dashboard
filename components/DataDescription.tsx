import {schoolOpts} from "../utils/types";
import {addDays, addMinutes, format, getISODay} from "date-fns";
import data from "../data/data.json";
import getSchoolShortName from "../utils/getSchoolShortName";

export default function DataDescription({school}: {
    school: schoolOpts,
}) {
    const schoolInfo = {
        cmc: {
            link: "https://cmc-returns21.cmc.edu/covid-19-dashboard/",
            title: "COVID-19 Dashboard | CMC Returns–Current",
        },
        pomona: {
            link: "https://www.pomona.edu/return-to-campus/testing",
            title: "Case Dashboard & Testing | Pomona College in Claremont, California - Pomona College",
            weeklyBasis: "Sunday-Monday",
        },
        hmc: {
            link: "https://www.hmc.edu/covid-19/dashboard/",
            title: "On-Campus COVID-19 Testing and Positivity Rates  |  Harvey Mudd College",
            reportingFrequency: "daily"
        },
        pitzer: {
            link: "https://www.pitzer.edu/pathway-forward/covid-19-dashboard/",
            title: "COVID-19 Dashboard - Pathway Forward",
            reportingFrequency: "daily"
        },
        scripps: {
            link: "https://www.scrippscollege.edu/scripps-strong/covid-19-dashboard/",
            title: "Scripps College  |  COVID-19 Dashboard",
        }
    }[school];

    const allReportedSchoolItems =  data.filter(d => d.school === school && d.reported !== "historic");
    const itemsReportedOnTime = allReportedSchoolItems.filter(d => {
        const weekStartDate = new Date(d.weekStart);
        const weekEndDate = addDays(weekStartDate, 6);
        const reportedDate = new Date(d.reported);
        return +reportedDate <= +weekEndDate;
    });

    return (
        <>
            <p>Source: <a href={schoolInfo.link}>{schoolInfo.title}</a></p>
            <p>According to {getSchoolShortName(school)}'s website, {getSchoolShortName(school)} publishes COVID data {schoolInfo.reportingFrequency || "weekly"}. The dashboard displays COVID testing and positivity on a {schoolInfo.weeklyBasis || "Monday-Sunday"} weekly basis.</p>
        </>
    );
}