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
            reportingFrequency: "weekly on Friday"
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
    const numReported = allReportedSchoolItems.length;
    const itemsReportedOnTime = allReportedSchoolItems.filter(d => {
        const weekStartDate = new Date(d.weekStart);
        const weekEndDate = addDays(weekStartDate, 6);
        const reportedDate = new Date(d.reported);
        return +reportedDate <= +weekEndDate;
    });
    const numReportedOnTime = itemsReportedOnTime.length;
    const percentageOnTime = numReported === 0 ? 0 : (numReportedOnTime / numReported * 100).toFixed(2);

    return (
        <>
            <p>Source: <a href={schoolInfo.link}>{schoolInfo.title}</a></p>
            {school === "scripps" ? (
                <p>As of {format(addDays(new Date(), -(getISODay(new Date())) % 7), "MMMM d, yyyy")}, Scripps has only reported the results for one week of testing: of 229 students and 252 employees from September 3 to September 10. According to the website, 4,722 tests have been conducted since January 2021, but no other results are available.</p>
            ) : (
                <p>According to {getSchoolShortName(school)}'s website, {getSchoolShortName(school)} publishes COVID data {schoolInfo.reportingFrequency || "weekly"}. Since September 19, 2021, we have found {getSchoolShortName(school)}'s reporting to be <b>on-time {percentageOnTime}% of the time.</b> The dashboard displays COVID testing and positivity on a {schoolInfo.weeklyBasis || "Monday-Sunday"} weekly basis.</p>
            )}
        </>
    );
}