import {DataItem, schoolOpts} from "../utils/types";
import {numberOrZero} from "../utils/numberOrZero";
import getBgClass from "../utils/getBgClass";
import getSchoolName from "../utils/getSchoolName";
import {FiChevronRight} from "react-icons/fi";
import Link from "next/link";

const LegendSchool = ({school, items}: {school: schoolOpts, items: DataItem[]}) => {
    const thisItem = items.find(d => d.school === school);
    const allPositives = thisItem ? (numberOrZero(thisItem.studentsPositive) + numberOrZero(thisItem.employeesPositive)) : 0;
    const allTests = thisItem ? (numberOrZero(thisItem.studentsTested) + numberOrZero(thisItem.employeesTested)) : 0;
    const percentage = allTests > 0 ? (allPositives / allTests * 100).toFixed(2) : 0;

    return (
        <Link href={`/${school}`}>
            <a className="flex items-center py-3 px-4 rounded hover:bg-gray-100 transition">
                <div className={`w-4 h-4 mr-4 rounded-full ${getBgClass(school)}`}/>
                <div>
                    <h3 className="font-serif font-bold text-gray-700">{getSchoolName(school)}</h3>
                    <div className="text-gray-500 flex items-center mb-2">
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
                <div className="ml-auto text-gray-400">
                    <FiChevronRight/>
                </div>
            </a>
        </Link>
    );
}

export default LegendSchool;