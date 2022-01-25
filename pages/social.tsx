import data from "../data/data.json";
import {getDateCounts} from "../components/MainStats";
import {DataItem, schoolOpts} from "../utils/types";
import {allSchools} from "./index";
import {numberOrZero} from "../utils/numberOrZero";
import getSchoolShortName from "../utils/getSchoolShortName";
import {getTextClass} from "../utils/getBgClass";
import {ReactNode} from "react";

function SchoolBox({school, items}: {school: schoolOpts, items: DataItem[]}) {
    const thisItem = items.find(d => d.school === school);
    const positives = thisItem ? (numberOrZero(thisItem.studentsPositive) + numberOrZero(thisItem.employeesPositive)) : 0;
    const tests = thisItem ? (numberOrZero(thisItem.studentsTested) + numberOrZero(thisItem.employeesTested)) : 0;
    const percentage = tests > 0 ? (positives / tests * 100).toFixed(2) : 0;

    return (
        <div className="p-4 border">
            <p className={`font-serif text-6xl font-bold ${getTextClass(school)}`}>+{positives}</p>
            <p className="text-2xl mt-3 opacity-75">{getSchoolShortName(school)} • {percentage}%</p>
        </div>
    )
}

function WeekGrid({currentDate}: {currentDate: string}) {
    const currentItems = data.filter(d => d.weekStart === currentDate) as DataItem[];

    const totalCases = currentItems.reduce((a, b) => {
        let newObj = {...a};
        newObj.tested += b.studentsTested + b.employeesTested;
        newObj.positive += b.studentsPositive + b.employeesPositive;
        return newObj;
    }, {tested: 0, positive: 0});

    return (
        <div className="grid grid-cols-3">
            <div className="p-4 bg-tsl text-white">
                <p className="text-6xl font-serif font-bold">+{totalCases.positive}</p>
                <p className="text-2xl mt-3 opacity-75">5Cs • {((totalCases.positive) / (totalCases.tested) * 100).toFixed(2)}%</p>
            </div>
            {allSchools.map(school => (
                <SchoolBox school={school} items={currentItems} key={school}/>
            ))}
        </div>
    )
}

function H1({children, className} : {children: ReactNode, className?: string}) {
  return (
    <h1 className={"font-bold text-xl uppercase tracking-wide px-4 py-3 bg-tsl text-white mt-8 " + (className || "")}>
        <span className="opacity-75">{children}</span>
    </h1>
  );
}

function Header() {
    return (
        <div className="flex items-center justify-center my-4 text-xl">
            <img src="/tsl-logo.svg" className="w-6 h-6 mr-4" alt="TSL Logo"/>
            <span className="font-serif font-bold">TSL COVID Tracker</span>
            <span className="mx-3 opacity-50">•</span>
            <span className="text-tsl font-medium">covid.tsl.news</span>
        </div>
    );
}

export default function Social({}: {}) {
    const dateCounts = getDateCounts(data as DataItem[], "Tested");

    const sortedDateCounts = Object
        .keys(dateCounts)
        .sort((a, b) => +new Date(b) - +new Date(a));

    const currentDate = sortedDateCounts[0];
    const nextDate = sortedDateCounts[1];

    return (
        <div className="p-4 bg-black">
            <div className="bg-white p-4 box-border" style={{width: 800, height: 800}}>
                <Header/>
                <H1>January 17 to 23</H1>
                <WeekGrid currentDate={currentDate}/>
                <H1>January 10 to 16</H1>
                <WeekGrid currentDate={nextDate}/>
            </div>
        </div>
    );
}