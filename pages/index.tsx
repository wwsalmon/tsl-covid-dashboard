import Container from "../components/headless/Container";
import {useState} from "react";
import data from "../data/data.json";
import {addDays, addMinutes, format, subDays} from "date-fns";
import {CaseItem, DataItem, schoolOpts} from "../utils/types";
import {numberOrZero} from "../utils/numberOrZero";
import CaseDot from "../components/CaseDot";
import LegendSchool from "../components/LegendSchool";
import StatSection from "../components/StatSection";
import H3 from "../components/headless/H3";

const allSchools: schoolOpts[] = ["scripps", "hmc", "cmc", "pitzer", "pomona"];

const getCasesFromItems = (items: DataItem[]) => allSchools.reduce((a: CaseItem[], b): CaseItem[] => {
    const thisItem = items.find(d => d.school === b);
    if (!thisItem) return [];
    const numStudentCases = numberOrZero(thisItem.studentsPositive);
    const numEmployeeCases = numberOrZero(thisItem.employeesPositive);
    return [
        ...a,
        ...Array(numStudentCases).fill({isEmployee: false, school: b}),
        ...Array(numEmployeeCases).fill({isEmployee: true, school: b}),
    ];
}, []);

const getDateCounts = (items: DataItem[]): {[weekStart: string]: number} => {
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

export default function Home() {
    const [currentDate, setCurrentDate] = useState<string>("2021-08-30");

    const dateCounts = getDateCounts(data as DataItem[]);
    const maxCount = Math.max(...Object.values(dateCounts));

    const currentItems = data.filter(d => d.weekStart === currentDate) as DataItem[];

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
        <Container width="5xl" className="flex my-16">
            <div className="flex-shrink-1 min-w-0 pr-8">
                <h1 className="font-serif text-6xl font-medium">+{totalPositive} cases</h1>
                <p className="mt-3 text-gray-500 text-xl">
                    {format(weekStartDate, "MMMM d")} - {format(weekEndDate, inSameMonth ? "d" : "MMMM d")}
                </p>
                <p className="text-gray-500 text-xl">{caseDifference < 0 ?
                    <span className="text-green-600 font-medium">{caseDifference}</span> :
                    <span className="text-red-600 font-medium">+{caseDifference}</span>} from previous week
                </p>
                <div className="grid gap-5 my-12" style={{gridTemplateColumns: "repeat(8, 2.5rem)"}}>
                    {allCases.map(d => (
                        <CaseDot case={d}/>
                    ))}
                </div>
                <StatSection
                    primary={`${percentage}% positivity rate`}
                    secondary={`${totalTested.toLocaleString()} tests`}
                    percentage={+percentage}
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
                                        <div className={`w-full bg-tsl ${currentDate === key ? "" : "opacity-50"}`} style={{height: `${75 * value / maxCount}%`}}/>
                                    </button>
                                ))
                        }
                    </div>
                </div>
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
        </Container>
    );
}