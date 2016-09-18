function operar(){	
	var n1= parseInt($("#n1").val());
	var n2= parseInt(document.getElementById("n2").value);

	var op= document.getElementById("operacion").value;
	if(op=="sum"){
		var valor=n1 +n2;
	}else if(op=="rest"){
		var valor=n1 -n2;
	}else{
		valor= "OPERACION NO VALIDA";
	}
	var r_div = document.getElementById("rta_div")
	rta_div.innerHTML= valor;
}

function pintar(){
	var w = 400, h = 400;

	var nodes = d3.range(10).map(function() { return {radius: Math.random() * 12 + 4}; }),
	color = d3.scale.category10();

	var force = d3.layout.force()
	.gravity(0.05)
	.charge(function(d, i) { return i ? 0 : -2000; })
	.nodes(nodes)
	.size([w, h]);

	var root = nodes[0];
	root.radius = 0;
	root.fixed = true;

	force.start();

	var svg = d3.select("#canvas").append("svg:svg")
	.attr("width", w)
	.attr("height", h);

	svg.selectAll("circle")
	.data(nodes.slice(1))
	.enter().append("svg:circle")
	.attr("r", function(d) { return d.radius - 2; })
	.style("fill", function(d, i) { return color(i % 3); });

	force.on("tick", function(e) {
	var q = d3.geom.quadtree(nodes),
	  i = 0,
	  n = nodes.length;

	while (++i < n) {
	q.visit(collide(nodes[i]));
	}

	svg.selectAll("circle")
	  .attr("cx", function(d) { return d.x; })
	  .attr("cy", function(d) { return d.y; });
	});

	svg.on("mousemove", function() {
	var p1 = d3.svg.mouse(this);
	root.px = p1[0];
	root.py = p1[1];
	force.resume();
	});

}



function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2
        || x2 < nx1
        || y1 > ny2
        || y2 < ny1;
  };
}


function pintar2(){
	// pedire datos
	$.ajax({url: "/migrafo", success: function(result){
        alert(result);

        //pintare los datos

    	var w = 800, h = 800;

    	my_data= result
    	
    	var nodes = d3.range(my_data.length).map(function() { return {title: "Hola", radius: 30}; });

    	console.log(nodes)

		
		var color = d3.scale.category10();

		var force = d3.layout.force()
		.gravity(0.05)
		.charge(function(d, i) { return i ? 0 : -2000; })
		.nodes(nodes)
		.size([w, h]);

		var root = nodes[0];
		root.radius = 30;
		root.fixed = true;

		force.start();

		var svg = d3.select("#canvas").append("svg:svg")
		.attr("width", w)
		.attr("height", h);

		svg.selectAll("ellipse")
		.data(nodes)
		.enter().append("svg:ellipse")
		.style("fill", function(d, i) { return color(i % 3); });


		svg.selectAll("text")
		.data(nodes)
	

    }});
}

//FUNCION PARA EL GRAFOO FINAL 
 function ejemplo(){
//TAMALOS INICIALES 960 Y 500 DEFINE ESPACIO DE TRABAJO
var width = 1200,
    height = 600,
    root;

var force = d3.layout.force()
    .linkDistance(90) /*DISTANCIA ENTRE NODOS*/
    .charge(-200) /* TAMAÑO GENERAL DEL GRAFO*/
    .gravity(.04) /* PESO DE LOS NODOS 0.05*/
    .size([width, height])
    .on("tick", tick);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");
      
d3.json("static/js/graph.json", function(archivo, json) { /*Cargando el archivo json*/
  if (archivo) throw archivo;
//alert('ENTRA HASTA AQUI');
  root = json;
  update();
});

function update() {

  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

  // Restart the force layout.
  force
      .nodes(nodes)
      .links(links)
      .start();

  // Update links.
  link = link.data(links, function(d) { return d.target.id; });

  link.exit().remove();

  link.enter().insert("line", ".node")
      .attr("class", "link");/*quitando link me quita las lineas que une los nodos*/

  // Update nodes.
  node = node.data(nodes, function(d) { return d.id; });

  node.exit().remove();

  var nodeEnter = node.enter().append("g")
      .attr("class", "")  /*Quitando el node inicial quita los bordes y la letra determinada*/
      .on("click", click)
      .call(force.drag);

  nodeEnter.append("circle")
      //.attr("r", function(d) { return Math.sqrt(d.size) / 5 || 7.5; });/*tAMAÑOS DE ALGUNOS CIRCULOS 10 Y 4.5*/
   .attr("r", function(d) { return Math.sqrt(300); });/*DEFINE EL TAMAÑO DE TODOS LOS NODOS*/

  nodeEnter.append("text")
      .attr("dy", ".100em")// TAMAÑO INICIAL 35 
      .text(function(d) { return d.name; });

  node.select("circle")
      .style("fill", color);
}

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}
//
function color(d) {
  return d._children ? "#FF0080" // collapsed package  COLOR ROSADO
      : d.children ? "#B40431" // expanded package   DEFINE EL COLOR PARA LOS NODOS EN COMUN  DE ALGUNOS CIRCULOS
      : "#0B610B"; // leaf node  //COLOR AZUL para los demas cirulos
  }

// Toggle children on click.
function click(d) {
  if (d3.event.defaultPrevented) return; // ignore drag
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update();
}

// Returns a list of all nodes under the root.
function flatten(root) {
  var nodes = [], i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}

}

//TERMIBA LA FUNCION DEL GRAFO FINAL



function pintar3(){
			var w = 900, h = 400;

			var labelDistance = 0;

			var vis = d3.select("body").append("svg:svg").attr("width", w).attr("height", h);

			var nodes = [];
			var labelAnchors = [];
			var labelAnchorLinks = [];
			var links = [];

			    	
    		//var nodes = d3.range(my_data.length).map(function() { return {title: "Hola", radius: 30}; });

			//DEfine la cantidad de nodos y el nombre 
			for(var i = 0; i < 20; i++) {
				var node = {
					label : "shakira "
				};
				nodes.push(node);
				labelAnchors.push({
					node : node
				});
				labelAnchors.push({
					node : node
				});
			};
			//para graficar y mostrar los punto 
			for(var i = 0; i < nodes.length; i++) {
				for(var j = 0; j < i; j++) {
					if(Math.random() > .95)
						links.push({
							source : i,
							target : j,
							weight : Math.random()
						});
				}
				labelAnchorLinks.push({
					source : i * 2,
					target : i * 2 + 1,
					weight : 1
				});
			};


			var force = d3.layout.force().size([w, h]).nodes(nodes).links(links).gravity(1).linkDistance(50).charge(-3000).linkStrength(function(x) {
				return x.weight * 10
			});


			force.start();

			var force2 = d3.layout.force().nodes(labelAnchors).links(labelAnchorLinks).gravity(0).linkDistance(0).linkStrength(8).charge(-100).size([w, h]);
			force2.start();

			var link = vis.selectAll("line.link").data(links).enter().append("svg:line").attr("class", "link").style("stroke", "#CCC");

			var node = vis.selectAll("g.node").data(force.nodes()).enter().append("svg:g").attr("class", "node");
			node.append("svg:circle").attr("r", 5).style("fill", "#555").style("stroke", "#FFF").style("stroke-width", 3);
			node.call(force.drag);


			var anchorLink = vis.selectAll("line.anchorLink").data(labelAnchorLinks)//.enter().append("svg:line").attr("class", "anchorLink").style("stroke", "#999");

			var anchorNode = vis.selectAll("g.anchorNode").data(force2.nodes()).enter().append("svg:g").attr("class", "anchorNode");
			anchorNode.append("svg:circle").attr("r", 0).style("fill", "#FFF");
				anchorNode.append("svg:text").text(function(d, i) {
				return i % 2 == 0 ? "" : d.node.label
			}).style("fill", "#555").style("font-family", "Arial").style("font-size", 12);

			var updateLink = function() {
				this.attr("x1", function(d) {
					return d.source.x;
				}).attr("y1", function(d) {
					return d.source.y;
				}).attr("x2", function(d) {
					return d.target.x;
				}).attr("y2", function(d) {
					return d.target.y;
				});

			}

			var updateNode = function() {
				this.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")";
				});

			}


			force.on("tick", function() {

				force2.start();

				node.call(updateNode);

				anchorNode.each(function(d, i) {
					if(i % 2 == 0) {
						d.x = d.node.x;
						d.y = d.node.y;
					} else {
						var b = this.childNodes[1].getBBox();

						var diffX = d.x - d.node.x;
						var diffY = d.y - d.node.y;

						var dist = Math.sqrt(diffX * diffX + diffY * diffY);

						var shiftX = b.width * (diffX - dist) / (dist * 2);
						shiftX = Math.max(-b.width, Math.min(0, shiftX));
						var shiftY = 5;
						this.childNodes[1].setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
					}
				});


				anchorNode.call(updateNode);

				link.call(updateLink);
				anchorLink.call(updateLink);

			});
		


}