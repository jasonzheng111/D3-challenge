

var width = 1000;
var height = 700;

var margin = 50;

var labelArea = 100;

// create svg container
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

svg.append("g").attr("class", "xText");

var xText = d3.select(".xText");

xText
  .attr("transform","translate(" +((width - labelArea) / 2 + labelArea) +", " + (height - margin) +")")
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("Percentage of Poverty");



var leftTextX = margin;
var leftTextY = (height + labelArea) / 2 - labelArea;


svg.append("g").attr("class", "yText");


var yText = d3.select(".yText");


yText
  .attr("transform","translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)")
  .append("text")
  .attr("y", -26)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Percentage of Obesesity");


// Import CSV data 
d3.csv("assets/data/data.csv").then(function(theData) {
  // define the x and y axiese range
  var xMin = d3.min(theData, function(d) {return parseFloat(d["poverty"]) }) - 2;
  var xMax = d3.max(theData, function(d) {return parseFloat(d["poverty"]) }) + 2;
  var yMin = d3.min(theData, function(d) {return parseFloat(d["obesity"]) }) - 2;
  var yMax = d3.max(theData, function(d) {return parseFloat(d["obesity"]) }) + 2;


  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labelArea, margin]);


  var xAxis = d3.axisBottom(xScale).ticks(20);
  var yAxis = d3.axisLeft(yScale).ticks(10);

  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");




// Dots and labels
  var circRadius = 10;
  var theCircles = svg.selectAll("g theCircles").data(theData).enter();

  theCircles
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d["poverty"]);
    })
    .attr("cy", function(d) {
      return yScale(d["obesity"]);
    })
    .attr("r", circRadius)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    });
    

  theCircles
    .append("text")
    .text(function(d) {
      return d.abbr;
    })
    .attr("dx", function(d) {
      return xScale(d["poverty"]);
    })
    .attr("dy", function(d) {
      return yScale(d["obesity"]) + circRadius / 2.5;
    })
    .attr("font-size", circRadius)
    .attr("class", "stateText");
}
);

