
//FUNCION PARA EL GRAFOO FINAL 
 function ejemplo(){

}

  function click2(){
    $.ajax({url:"/taller02/graph",  
        success: function(result){
          console.log(result);
          nodes= result.nodes;
          edges=result.edges;
          pintar(nodes, edges);
        }

//TERMIBA LA FUNCION DEL GRAFO FINAL
 function pintar(mynodes, myedges){
    alert("PPPPP");
// create an array with nodes
    var nodes = new vis.DataSet(mynodes);

    // create an array with edges
    var edges = new vis.DataSet(myedges);

    // create a network
    var container = document.getElementById('migrafo');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);

  }


    });
  }