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
