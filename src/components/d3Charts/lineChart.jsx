"use client"; // Ensures it runs only in the browser

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function D3LineChart({ data }) {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const width = 600;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", "#000000")
            .style("overflow", "visible");

        // Create scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .range([height - margin.bottom, margin.top]);

        // Create line generator
        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
            .curve(d3.curveMonotoneX);

        // Remove previous line before rendering
        svg.selectAll("*").remove();

        // Append x-axis
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        // Append y-axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        // Append line path
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

    }, [data]); // Runs when data changes

    return <svg ref={svgRef}></svg>;
}
