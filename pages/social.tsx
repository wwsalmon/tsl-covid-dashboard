import data from "../data/data.json";
import {getDateCounts} from "../components/MainStats";
import {DataItem, schoolOpts} from "../utils/types";
import {allSchools} from "./index";
import {numberOrZero} from "../utils/numberOrZero";
import getSchoolShortName from "../utils/getSchoolShortName";
import {getTextClass} from "../utils/getBgClass";
import {ReactNode, useEffect, useRef} from "react";
import * as d3 from "d3";

const testedCounts = getDateCounts(data as DataItem[], "Tested");
const positiveCounts = getDateCounts(data as DataItem[], "Positive");
const percentages = Object.fromEntries(Object.entries(testedCounts).map(d => [d[0], positiveCounts[d[0]] / d[1]]));

const sortedDateCounts = Object
    .keys(testedCounts)
    .sort((a, b) => +new Date(b) - +new Date(a));

const currentDate = sortedDateCounts[0];
const nextDate = sortedDateCounts[1];

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

function Graphic({children, className} : {children: ReactNode, className?: string}) {
  return (
    <div className="bg-white p-4 box-border my-8" style={{width: 800, height: 800}}>
        <Header/>
        {children}
    </div>
  );
}

function Graph() {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            const w = 768, h = 600, px = 144, py = 64;
            const dates = ["2021-12-06", "2021-12-13", "2021-12-20", "2021-12-27", "2022-01-03", "2022-01-10", "2022-01-17", "2022-01-24"];

            svg.attr("width", w).attr("height", h);

            const xScale = d3.scalePoint(dates, [px, w - px]);
            const percentageScale = d3.scaleLinear().domain([0, 20]).range([h - py, py]);
            const positivesScale = d3.scaleLinear().domain([0, 800]).range([h - py, py]);
            const testsScale = d3.scaleLinear().domain([0, 8000]).range([h - py, py]);

            const testsArea = d3.area()
                .curve(d3.curveMonotoneX)
                .x(d => {
                    console.log(d[0], xScale(d[0]));
                    return xScale(d[0]);
                })
                .y0(() => testsScale(0))
                .y1(d => testsScale(d[1]));

            const positivesArea = d3.area()
                .curve(d3.curveMonotoneX)
                .x(d => {
                    console.log(d[0], xScale(d[0]));
                    return xScale(d[0]);
                })
                .y0(() => positivesScale(0))
                .y1(d => positivesScale(d[1]));

            const testsDatum = Object.entries(testedCounts).filter(d => dates.includes(d[0])).sort((a, b) => dates.findIndex(x => x === a[0]) - dates.findIndex(x => x === b[0]));

            const positivesDatum = Object.entries(positiveCounts).filter(d => dates.includes(d[0])).sort((a, b) => dates.findIndex(x => x === a[0]) - dates.findIndex(x => x === b[0]));

            const percentagesDatum = Object.entries(percentages).filter(d => dates.includes(d[0])).sort((a, b) => dates.findIndex(x => x === a[0]) - dates.findIndex(x => x === b[0]));

            svg.append("path")
                .datum(testsDatum)
                .attr("fill", "#eeeeee")
                .attr("d", testsArea);

            svg.append("path")
                .datum(positivesDatum)
                .attr("fill", "#f4dddd")
                .attr("d", positivesArea);

            svg.append("g")
                .attr("id", "x-axis")
                .style("opacity", 0.5)
                .attr("transform", `translate(0, ${h - py})`)
                .call(d3.axisBottom(xScale).tickSize(-h + 2 * py).ticks(8).tickSizeOuter(0));

            svg.selectAll("#x-axis .tick line").style("opacity", 0.25);
            svg.selectAll("#x-axis .tick text").style("display", "none");

            svg.append("g")
                .attr("id", "tests-axis")
                .style("opacity", 0.5)
                .attr("color", "#555555")
                .attr("transform", `translate(${px},0)`)
                .call(d3.axisLeft(testsScale).tickSize(-w + 2 * px).ticks(8).tickSizeOuter(0));

            svg.selectAll("#tests-axis .tick line").style("opacity", 0.25);
            svg.selectAll("#tests-axis .tick text").attr("dx", -20);

            svg.append("g")
                .attr("id", "positives-axis")
                .style("opacity", 0.5)
                .attr("color", "#c11103")
                .attr("transform", `translate(${w - px},0)`)
                .call(d3.axisRight(positivesScale).ticks(8).tickSizeOuter(0));

            svg.selectAll("#positives-axis .tick text").attr("dx", 5);

            svg.append("g")
                .attr("id", "percentage-axis")
                .style("opacity", 0.5)
                .attr("color", "#fccb3b")
                .attr("transform", `translate(${w - px/2},0)`)
                .call(d3.axisRight(percentageScale).tickValues([0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20]).tickFormat(d => d + "%").tickSizeOuter(0));

            svg.selectAll(".tick text").attr("font-size", "16px");

            svg.append("path")
                .datum(testsDatum)
                .attr("fill", "transparent")
                .attr("stroke", "#555555")
                .attr("stroke-width", 2)
                // .attr("stroke-dasharray", "2")
                .attr("d", d3.line().curve(d3.curveMonotoneX).x(d => xScale(d[0])).y(d => testsScale(d[1])));

            svg.selectAll("circle.testPoint")
                .data(testsDatum)
                .enter()
                .append("circle")
                .attr("class", "testPoint")
                .attr("stroke", "none")
                .attr("fill", "#555555")
                .attr("cx", d => xScale(d[0]))
                .attr("cy", d => testsScale(d[1]))
                .attr("r", 3);

            svg.append("path")
                .datum(positivesDatum)
                .attr("fill", "transparent")
                .attr("stroke", "#c11103")
                .attr("stroke-width", 2)
                .attr("d", d3.line().curve(d3.curveMonotoneX).x(d => xScale(d[0])).y(d => positivesScale(d[1])));

            svg.selectAll("circle.positivePoint")
                .data(positivesDatum)
                .enter()
                .append("circle")
                .attr("class", "positivePoint")
                .attr("stroke", "none")
                .attr("fill", "#c11103")
                .attr("cx", d => xScale(d[0]))
                .attr("cy", d => positivesScale(d[1]))
                .attr("r", 3);

            svg.append("path")
                .datum(percentagesDatum)
                .attr("stroke", "#fccb3b")
                .attr("fill", "transparent")
                .attr("stroke-width", 4)
                .attr("stroke-dasharray", "4")
                // .style("opacity", 0.5)
                .attr("d", d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(d => xScale(d[0]))
                    .y(d => percentageScale(d[1] * 100))
                );

            svg.selectAll("circle.percentagePoint")
                .data(percentagesDatum)
                .enter()
                .append("circle")
                .attr("class", "percentagePoint")
                .attr("stroke", "none")
                .attr("fill", "#fccb3b")
                .attr("cx", d => xScale(d[0]))
                .attr("cy", d => percentageScale(d[1] * 100))
                .attr("r", 5);
        }
    }, [svgRef.current]);

    return (
        <Graphic>
            <svg ref={svgRef}/>
        </Graphic>
    );
}

export default function Social({}: {}) {
    return (
        <div className="p-4 bg-black">
            <Graphic>
                <H1>January 17 to 23</H1>
                <WeekGrid currentDate={currentDate}/>
                <H1>January 10 to 16</H1>
                <WeekGrid currentDate={nextDate}/>
            </Graphic>
            <Graph/>
        </div>
    );
}