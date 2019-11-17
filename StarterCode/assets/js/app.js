
// Set up our chart
//= ================================
var svgWidth = 900;
var svgHeight = 600;

var margin = {
  top: 40,
  right: 40,
  bottom: 80,
  left: 90
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Set variable for csv and read file
var file = "assets/data/data.csv"

d3.csv(file).then(successHandle, errorHandle);

function errorHandle(error) {
  throw err;
}

// Set up data for chart

function successHandle(censusData) {
  censusData.map(function (data) {
    data.poverty = +data.poverty;
    data.obesity = +data.obesity;
  });
  var xLinearScale = d3.scaleLinear()
  .domain([8.1, d3.max(censusData, d => d.poverty)])
  .range([0, width]);
 
  var yLinearScale = d3.scaleLinear()
  .domain([20, d3.max(censusData, d => d.obesity)])
  .range([height, 0]);
 
  var bottomAxis = d3.axisBottom(xLinearScale)
  .ticks(7);
  
  var leftAxis = d3.axisLeft(yLinearScale);
 
  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);
 
  chartGroup.append("g")
  .call(leftAxis);
 
  // circles 
 
  var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.obesity))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", ".5")
 
 
  // circle labels
  var circlesGroup = chartGroup.selectAll()
  .data(censusData)
  .enter()
  .append("text")
  .attr("x", d => xLinearScale(d.poverty))
  .attr("y", d => yLinearScale(d.obesity))
  .style("font-size", "12px")
  .style("text-anchor", "middle")
  .style('fill', 'white')
  .text(d => (d.abbr));
 
  // tooltip
 
  var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "3px")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .html(function (d) {
    return (`${d.state}<br>Poverty: ${d.poverty}%<br>Obesity: ${d.obesity}% `);
  });
 
  chartGroup.call(toolTip);
 
  circlesGroup.on("mouseover", function (data) {
    toolTip.show(data, this);
  })
  .on("mouseout", function (data) {
    toolTip.hide(data);
  });
 
  // Y Axis
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Obese (%)");
 
  // X Axis
  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 5})`)
  .attr("class", "axisText")
  .text("In Poverty (%)");
}