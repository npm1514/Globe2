//determines view block
var width = 2000,
    height = 2000;

//orthographic creates sperical globe
var projection = d3.geo.orthographic()
    .scale(500)//determines zoom. We may be able to use this for a function, on click, zoom button
//determines position relative to view block
    .translate([width / 3, height / 3])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

//rotate range
var λ = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

var φ = d3.scale.linear()
    .domain([0, height])
    .range([90, -90]);

//viewport svg
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.on("mousedown",function(){
  svg.on("mousemove", function() {
    var p = d3.mouse(this);
    projection.rotate([λ(p[0]), φ(p[1])]);
    svg.selectAll("path").attr("d", path);
    svg.on("mouseup", function(){
      projection.rotate([λ, φ]);
      svg.selectAll("path").attr("d", path);
    });
  });
});






d3.json("world-110m.json", function(error, world) {
  if (error) throw error;

  svg.append("path")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
});
