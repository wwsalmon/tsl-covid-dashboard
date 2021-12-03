import data from "../data/data.json";
import {DataItem} from "../utils/types";
import {getCasesFromItems, getDateCounts} from "../components/MainStats";
import {allSchools} from "./index";
import getSchoolName from "../utils/getSchoolName";
import {numberOrZero} from "../utils/numberOrZero";
import {addDays, addMinutes, format, subDays} from "date-fns";
import CaseDot from "../components/CaseDot";
import StatSection from "../components/StatSection";

export default function Print({}: {}) {
    const dateCounts = getDateCounts(data as DataItem[], "Tested");

    const currentDate = Object
        .keys(dateCounts)
        .sort((a, b) => +new Date(b) - +new Date(a))[0];

    const currentItems = data.filter(d => d.weekStart === currentDate) as DataItem[];

    let primaryBgClass = "bg-tsl";

    // data processing

    const studentsTested = currentItems.reduce((a, b) => a + numberOrZero(b.studentsTested), 0);
    const employeesTested = currentItems.reduce((a, b) => a + numberOrZero(b.employeesTested), 0);
    const totalTested = studentsTested + employeesTested;

    const allCases = getCasesFromItems(currentItems);

    const totalPositive = allCases.length;
    const studentsPositive = allCases.filter(d => !d.isEmployee).length;
    const employeesPositive = allCases.filter(d => d.isEmployee).length;

    const lastWeekDate = format(addMinutes(subDays(new Date(currentDate), 7), new Date().getTimezoneOffset()), "yyyy-MM-dd");
    let lastWeekItems = data.filter(d => d.weekStart === lastWeekDate) as DataItem[];
    const lastWeekCases = getCasesFromItems(lastWeekItems);
    const lastWeekPositive = lastWeekCases.length;

    const caseDifference = totalPositive - lastWeekPositive;

    const percentage = (totalPositive / totalTested * 100).toFixed(2);

    const weekStartDate = addMinutes(new Date(currentDate), new Date().getTimezoneOffset());
    const weekEndDate = addMinutes(addDays(new Date(currentDate), 6), new Date().getTimezoneOffset());
    const inSameMonth = weekStartDate.getMonth() === weekEndDate.getMonth();

    const schoolColors = {
        hmc: "#FFB300",
        pomona: "#0040E6",
        scripps: "#327A3D",
        cmc: "#910039",
        pitzer: "#FF8000",
    }

    return (
        <div style={{width: 720, height: 155, fontSize: 9}} className="flex">
            <div style={{width: 232, paddingRight: 32}} className="flex flex-col">
                <div className="flex items-center">
                    <p className="font-serif font-bold">TSL COVID Tracker</p>
                    <div className="bg-gray-300 mx-2" style={{height: 3, width: 3, borderRadius: 3}}/>
                    <p className="font-medium">covid.tsl.news</p>
                </div>
                <h1 className="font-serif font-medium" style={{fontSize: 32}}>+{totalPositive} case{totalPositive !== 1 ? "s" : ""}</h1>
                <p className="text-gray-500">
                    {"at the 5Cs from "}<span className="font-bold">{format(weekStartDate, "MMMM d")} - {format(weekEndDate, inSameMonth ? "d" : "MMMM d")}</span>
                </p>
                <p className="text-gray-500">{caseDifference < 0 ?
                    <span className="text-green-600 font-medium"><span className="font-bold">{caseDifference}</span> from previous week</span> :
                    <span className="text-red-600 font-medium"><span className="font-bold">+{caseDifference}</span> from previous week</span>}
                </p>
                <div className="border-t w-full mt-auto" style={{height: 37}}>
                    <p className="text-gray-500" style={{fontSize: 7, marginTop: 7}}>
                        Data from each of the 5C schools’ testing dashboards at press time. Visit <b>covid.tsl.news</b> for the most up-to-date testing information and historical data.
                    </p>
                </div>
            </div>
            <div style={{width: 276, paddingRight: 32}} className="flex flex-col">
                <div className="flex flex-wrap">
                    {allCases.map(d => (
                        <div style={{width: 32, height: 32, marginRight: 12, borderRadius: 16, backgroundColor: schoolColors[d.school]}}>
                            {d.isEmployee && (
                                <p className="text-white font-bold text-center w-full" style={{marginTop: 5, fontSize: 16}}>E</p>
                            )}
                        </div>
                    ))}
                    {allSchools.map(school => {
                        const thisItem = currentItems.find(d => d.school === school);
                        const allPositives = thisItem ? (numberOrZero(thisItem.studentsPositive) + numberOrZero(thisItem.employeesPositive)) : 0;
                        if (allPositives !== 0) return <></>;
                        const allTests = thisItem ? (numberOrZero(thisItem.studentsTested) + numberOrZero(thisItem.employeesTested)) : 0;

                        return (
                            <div style={{width: 32, height: 32, marginRight: 12, borderRadius: 16, borderWidth: 2.5, borderColor: schoolColors[school]}} className={`opacity-50 ${allTests === 0 ? "border-dashed" : ""}`}>
                                <p className="font-bold text-center w-full" style={{marginTop: 2, fontSize: 16, color: schoolColors[school]}}>
                                    {allTests === 0 ? "N" : "0"}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center flex-wrap mt-6 text-gray-500">
                    <div className="flex items-center mr-8 mb-2">
                        <div className="rounded-full mr-4 bg-gray-500" style={{width: 8, height: 8}}/>
                        <span style={{fontSize: 8}}>One positive case</span>
                    </div>
                    <div className="flex items-center mr-8 mb-2">
                        <span className="mr-4 font-bold">E</span>
                        <span style={{fontSize: 8}}>Employee</span>
                    </div>
                    <div className="flex items-center mr-8 mb-2">
                        <span className="mr-4 font-bold">N</span>
                        <span style={{fontSize: 8}}>No tests reported</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-4 font-bold">0</span>
                        <span style={{fontSize: 8}}>No positive cases</span>
                    </div>
                </div>
                <div className="border-t w-full mt-auto pt-2" style={{height: 37}}>
                    <div className="flex items-center">
                        <p className="font-bold">{percentage}% positivity rate</p>
                        <p className="ml-auto text-gray-500">{totalTested.toLocaleString()} tests</p>
                    </div>
                    <div className="w-full h-2 bg-gray-100 relative mt-2">
                        <div className={`absolute h-2 bg-tsl top-0 left-0`} style={{width: `${percentage}%`}}/>
                    </div>
                </div>
            </div>
            <div className="h-full flex flex-col justify-between">
                {allSchools.map(school => {
                    const thisItem = currentItems.find(d => d.school === school);
                    const allPositives = thisItem ? (numberOrZero(thisItem.studentsPositive) + numberOrZero(thisItem.employeesPositive)) : 0;
                    const allTests = thisItem ? (numberOrZero(thisItem.studentsTested) + numberOrZero(thisItem.employeesTested)) : 0;

                    return (
                        <div className="flex items-center">
                            <div style={{width: 10, height: 10, marginRight: 12, backgroundColor: schoolColors[school], borderRadius: 5}}/>
                            <div>
                                <h1 className="font-serif font-bold">{getSchoolName(school)}</h1>
                                <div className="text-gray-500 flex items-center mb-2" style={{fontSize: 7}}>
                                    {allTests === 0 ? (
                                        <span>No tests reported</span>
                                    ) : (
                                        <>
                                            <span><b>+{allPositives}</b>/{allTests.toLocaleString()}</span>
                                            <span className="ml-3">{percentage}%</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}