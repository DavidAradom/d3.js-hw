
// Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
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

// Import data from the data.csv file
// =================================
d3.csv("data.csv").then(function(censusData) {
    // Step 4: Parse the data
    // Format the data and convert to numerical and date values
    // =================================
    // Create a function to parse date and time
    
  
    // Format the data
    censusData.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.smokes = +data.smokes;
      data.age = +data.age;
      data.obesity = +data.obesity;
      data.income = +data.income;
      data.abbr = +data.abbr;
    });
    
    // Step 5: Create the scales for the chart
    // =================================
    // var xTimeScale = d3.scaleTime()
    // .domain(d3.extent(censusData, d => d.poverty))
    // .range([0, width]);

    var xLinearScale = d3.scaleLinear().range([0, width]);
    
    var yLinearScale = d3.scaleLinear().range([height, 0]);
    
    // Step 6: Set up the y-axis domain
    // ==============================================
    // @NEW! determine the max y value
    // find the max of the morning data
    var morningMax = d3.max(donutData, d => d.morning);
    // find the max of the evening data
    var eveningMax = d3.max(donutData, d => d.evening);
    var yMax;
    if (morningMax > eveningMax) {
        yMax = morningMax;
    }
    else {
        yMax = eveningMax;
    }
    // var yMax = morningMax > eveningMax ? morningMax : eveningMax;
    // Use the yMax value to set the yLinearScale domain
    yLinearScale.domain([0, yMax]);