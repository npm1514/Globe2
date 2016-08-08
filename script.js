//determines view block
var width = 700,
    height = 700;

//orthographic creates sperical globe
var projection = d3.geo.orthographic()
    .scale(300)//determines zoom. We may be able to use this for a function, on click, zoom button
//determines position relative to view block
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

//rotate range
var a = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

var b = d3.scale.linear()
    .domain([0, height])
    .range([90, -90]);

//viewport svg
var svg = d3.select(".globe")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

svg.on("mousedown",function(){
  svg.on("mousemove", function() {
    var p = d3.mouse(this);
    projection.rotate([a(p[0]), b(p[1])]);
    svg.selectAll("path").attr("d", path);
    svg.on("mouseup", function(){
      projection.rotate([a, b]);
      svg.selectAll("path").attr("d", path);
    });
  });
});






d3.json("world-110m.json", function(error, world) {
  if (error) throw error;

  svg.datum(topojson.feature(world, world.objects.land))
      .append("path")
      .attr("fill", "rgb(111, 158, 89)")
      .attr("class", "land")
      .attr("d", path);
});
