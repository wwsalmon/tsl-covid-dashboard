import {CaseItem, DataItem, schoolOpts} from "../utils/types";
import data from "../data/data.json";
import {Dispatch, SetStateAction, useState} from "react";
import {numberOrZero} from "../utils/numberOrZero";
import {addDays, addMinutes, format, subDays} from "date-fns";
import {allSchools} from "../pages";
import CaseDot from "./CaseDot";
import StatSection from "./StatSection";
import H3 from "./headless/H3";
import getBgClass from "../utils/getBgClass";

const getCasesFromItems = (items: DataItem[]) => allSchools.reduce((a: CaseItem[], b): CaseItem[] => {
    const thisItem = items.find(d => d.school === b);
    if (!thisItem) return a;
    const numStudentCases = numberOrZero(thisItem.studentsPositive);
    const numEmployeeCases = numberOrZero(thisItem.employeesPositive);
    return [
        ...a,
        ...Array(numStudentCases).fill({isEmployee: false, school: b}),
        ...Array(numEmployeeCases).fill({isEmployee: true, school: b}),
    ];
}, []);

export const getDateCounts = (items: DataItem[]): {[weekStart: string]: number} => {
    const returnValues = items.reduce((a: {[weekStart: string]: number}, b) => {
        const thisPositives = numberOrZero(b.employeesPositive) + numberOrZero(b.studentsPositive);
        const existingValue = a[b.weekStart];
        if (existingValue === undefined) return {...a, [b.weekStart]: thisPositives};
        let newValues = {...a};
        newValues[b.weekStart] = a[b.weekStart] + thisPositives;
        return newValues;
    }, {});

    return returnValues;
}

export default function MainStats({school, currentDate, setCurrentDate}: {school?: schoolOpts, currentDate: string, setCurrentDate: Dispatch<SetStateAction<string>>}) {
    const dateCounts = getDateCounts((school ? data.filter(d => d.school === school) : data) as DataItem[]);
    const maxCount = Math.max(...Object.values(dateCounts));

    let currentItems = data.filter(d => d.weekStart === currentDate) as DataItem[];
    if (school) currentItems = currentItems.filter(d => d.school === school);

    let primaryBgClass = "bg-tsl";
    if (school) primaryBgClass = getBgClass(school);

    // data processing

    const studentsTested = currentItems.reduce((a, b) => a + numberOrZero(b.studentsTested), 0);
    const employeesTested = currentItems.reduce((a, b) => a + numberOrZero(b.employeesTested), 0);
    const totalTested = studentsTested + employeesTested;

    const allCases = getCasesFromItems(currentItems);

    const totalPositive = allCases.length;
    const studentsPositive = allCases.filter(d => !d.isEmployee).length;
    const employeesPositive = allCases.filter(d => d.isEmployee).length;

    const lastWeekDate = format(addMinutes(subDays(new Date(currentDate), 7), new Date().getTimezoneOffset()), "yyyy-MM-dd");
    const lastWeekItems = data.filter(d => d.weekStart === lastWeekDate) as DataItem[];
    const lastWeekCases = getCasesFromItems(lastWeekItems);
    const lastWeekPositive = lastWeekCases.length;

    const caseDifference = totalPositive - lastWeekPositive;

    const percentage = (totalPositive / totalTested * 100).toFixed(2);

    const weekStartDate = addMinutes(new Date(currentDate), new Date().getTimezoneOffset());
    const weekEndDate = addMinutes(addDays(new Date(currentDate), 7), new Date().getTimezoneOffset());
    const inSameMonth = weekStartDate.getMonth() === weekEndDate.getMonth();

    return (
        <>
            <h1 className="font-serif text-6xl font-medium">+{totalPositive} cases</h1>
            <p className="mt-3 text-gray-500 text-xl">
                {!school && "at the 5Cs from "}{format(weekStartDate, "MMMM d")} - {format(weekEndDate, inSameMonth ? "d" : "MMMM d")}
            </p>
            <p className="text-gray-500 text-xl">{caseDifference < 0 ?
                <span className="text-green-600 font-medium">{caseDifference}</span> :
                <span className="text-red-600 font-medium">+{caseDifference}</span>} from previous week
            </p>
            <div className="flex flex-wrap my-12">
                {allCases.map(d => (
                    <CaseDot case={d}/>
                ))}
            </div>
            <StatSection
                primary={`${percentage}% positivity rate`}
                secondary={`${totalTested.toLocaleString()} tests`}
                percentage={+percentage}
                bgClass={primaryBgClass}
            />
            <hr className="my-12"/>
            <H3>Historical data</H3>
            <p className="text-gray-500">Click on a bar for details</p>
            <div className="overflow-x-auto w-full my-8">
                <div className="flex">
                    {
                        Object.entries(dateCounts)
                            .sort((a, b) => +new Date(b[0]) - +new Date(a[0]))
                            .map(([key, value]) => (
                                <button className="w-16 h-40 border-l border-l-gray-100 relative flex items-end flex-shrink-0 hover:bg-gray-100" onClick={() => setCurrentDate(key)}>
                                    <div className="absolute top-2 left-2 text-xs text-gray-500"><span>{format(addMinutes(new Date(key), new Date().getTimezoneOffset()), "MMM d")}</span></div>
                                    <div className={`w-full ${primaryBgClass} ${currentDate === key ? "" : "opacity-50"}`} style={{height: `${75 * value / maxCount}%`}}/>
                                </button>
                            ))
                    }
                </div>
            </div>
            <hr className="my-12"/>
            <H3>Data sourcing</H3>
            <p className="mt-2">The data in this portal is aggregated from data published by each of the 5C schools.</p>
        </>
    );
}