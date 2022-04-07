import {useEffect, useRef} from "react";
import * as d3 from "d3";
import data from "../../data/data.json";
import {getDateCounts} from "../MainStats";
import {DataItem} from "../../utils/types";

const firstDate = new Date("2021-11-22");
const lastDate = new Date("2022-04-06");

const filteredData = data.filter(d => new Date(d.weekStart) <= lastDate && new Date(d.weekStart) >= firstDate);

const positiveDateCounts = {"2022-04-06": 190, ...getDateCounts(filteredData as DataItem[], "Positive")};
const testDateCounts = getDateCounts(filteredData as DataItem[], "Tested");
const positivityDateCounts = Object.fromEntries(Object.keys(testDateCounts).map(d => [d, positiveDateCounts[d] / testDateCounts[d]]));

const w = 800;
const h = 800;
const pt = 200;
const pl = 32;
const pr = 96;
const pi = 32;

const positivesScaleHeight = 300;
const subScaleHeight = 48;
const graphWidth = w - pl - pr;

const pathOpacity = 1.0;
const tickOpacity = 0.5;

const positivesScale = d3.scaleLinear().domain(d3.extent(Object.values(positiveDateCounts))).range([positivesScaleHeight, 0]);
const positivityScale = d3.scaleLinear().domain(d3.extent(Object.values(positivityDateCounts))).range([subScaleHeight, 0]);
const testsScale = d3.scaleLinear().domain(d3.extent(Object.values(testDateCounts))).range([subScaleHeight, 0]);

const dateScale = d3.scaleTime().domain([firstDate, lastDate]).range([0, graphWidth]);

export default function SurgeGraph1() {
    const svgRef = useRef<SVGSVGElement>(null);
    const didMount = useRef<boolean>(false);

    useEffect(() => {
        if (!didMount.current) {
            // initial code
            if (svgRef.current) {
                const svg = d3.select(svgRef.current);
                svg.attr("width", w).attr("height", h).style("border", "1px solid black");

                const positivesGraph = svg.append("g")
                    .style("transform", `translate(${pl}px, ${pt}px)`);

                positivesGraph.append("path")
                    .datum(Object.keys(positiveDateCounts))
                    .attr("fill", "#b41100")
                    .style("opacity", pathOpacity)
                    .attr(
                        "d",
                        d3.area()
                            .curve(d3.curveMonotoneX)
                            .x(d => dateScale(new Date(d)))
                            .y0(positivesScale(0))
                            .y1(d => positivesScale(positiveDateCounts[d]))
                    );

                positivesGraph.append("g")
                    .style("transform", `translate(${pl + graphWidth}px, 0)`)
                    .call(d3.axisRight(positivesScale))
                    .style("opacity", 0.5);

                const testsGraph = svg.append("g")
                    .style("transform", `translate(${pl}px, ${pt + positivesScaleHeight + pi}px`);

                testsGraph.append("path")
                    .datum(Object.keys(testDateCounts))
                    .attr("fill", "#555555")
                    .style("opacity", pathOpacity)
                    .attr(
                        "d",
                        d3.area()
                            .curve(d3.curveMonotoneX)
                            .x(d => dateScale(new Date(d)))
                            .y0(testsScale(0))
                            .y1(d => testsScale(testDateCounts[d]))
                    );

                testsGraph.append("g")
                    .style("transform", `translate(${pl + graphWidth}px, 0)`)
                    .call(d3.axisRight(testsScale).ticks(3))
                    .style("opacity", 0.5);

                const positivityGraph = svg.append("g")
                    .style("transform", `translate(${pl}px, ${pt + positivesScaleHeight + subScaleHeight + 2 * pi}px`);

                positivityGraph.append("path")
                    .datum(Object.keys(positivityDateCounts))
                    .attr("fill", "#f4cb2a")
                    .style("opacity", pathOpacity)
                    .attr(
                        "d",
                        d3.area()
                            .curve(d3.curveMonotoneX)
                            .x(d => dateScale(new Date(d)))
                            .y0(positivityScale(0))
                            .y1(d => positivityScale(positivityDateCounts[d]))
                    );

                positivityGraph.append("g")
                    .style("transform", `translate(${pl + graphWidth}px, 0)`)
                    .call(d3.axisRight(positivityScale).ticks(3).tickFormat(d3.format(".0%")))
                    .style("opacity", 0.5);

                const dateAxis = svg.append("g")
                    .style("transform", `translate(${pl}px, ${pt + positivesScaleHeight + 2 * subScaleHeight + 2 * pi}px`)
                    .call(d3.axisBottom(dateScale).ticks(9).tickSize(-(positivesScaleHeight + 2 * subScaleHeight + 4 * pi)).tickSizeOuter(0))
                    .style("opacity", 0.5);

                dateAxis.selectAll("line").attr("stroke", "#666").style("opacity", tickOpacity);
                dateAxis.selectAll("text").style("font-size", 16).style("transform", "translate(0px, 16px)");
            }
            didMount.current = true;
        } else {
            const svg = d3.select(svgRef.current);
        }
    }, []);

    return (
        <svg ref={svgRef}/>
    )
}