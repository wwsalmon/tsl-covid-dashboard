import {schoolOpts} from "../utils/types";
import {addDays, format, getISODay} from "date-fns";

export default function DataDescription({school}: {
    school: schoolOpts,
}) {
    const schoolInfo = {
        cmc: {
            schoolShortName: "CMC",
            link: "https://cmc-returns21.cmc.edu/covid-19-dashboard/",
            title: "COVID-19 Dashboard | CMC Returns–Current",
        },
        pomona: {
            schoolShortName: "Pomona",
            link: "https://www.pomona.edu/return-to-campus/testing",
            title: "Case Dashboard & Testing | Pomona College in Claremont, California - Pomona College",
            weeklyBasis: "Sunday-Monday",
            reportingFrequency: "weekly on Friday"
        },
        hmc: {
            schoolShortName: "HMC",
            link: "https://www.hmc.edu/covid-19/dashboard/",
            title: "On-Campus COVID-19 Testing and Positivity Rates  |  Harvey Mudd College",
            reportingFrequency: "daily"
        },
        pitzer: {
            schoolShortName: "Pitzer",
            link: "https://www.pitzer.edu/pathway-forward/covid-19-dashboard/",
            title: "COVID-19 Dashboard - Pathway Forward",
            reportingFrequency: "daily"
        },
        scripps: {
            schoolShortName: "Scripps",
            link: "https://www.scrippscollege.edu/scripps-strong/covid-19-dashboard/",
            title: "Scripps College  |  COVID-19 Dashboard",
        }
    }[school];

    return (
        <>
            <p>Source: <a href={schoolInfo.link}>{schoolInfo.title}</a></p>
            {school === "scripps" ? (
                <p>As of {format(addDays(new Date(), -(getISODay(new Date())) % 7), "MMMM d, yyyy")}, Scripps has only reported the results for one week of testing: of 229 students and 252 employees from September 3 to September 10. According to the website, 4,722 tests have been conducted since January 2021, but no other results are available.</p>
            ) : (
                <p>According to {schoolInfo.schoolShortName}'s website, {schoolInfo.schoolShortName} publishes COVID data {schoolInfo.reportingFrequency || "weekly"}. Since September 19, 2021, we have found {schoolInfo.schoolShortName}'s reporting to be <b>on-time 100% of the time.</b> The dashboard displays COVID testing and positivity on a {schoolInfo.weeklyBasis || "Monday-Sunday"} weekly basis.</p>
            )}
        </>
    );
}