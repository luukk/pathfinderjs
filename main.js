window.addEventListener('load', function(e) {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      grid = Object.create(Grid);
      astar = Object.create(astar);
  grid.rows =15;
  grid.cols =15;
  grid.generateGrid();
  grid.drawGrid(context);
  grid.getNodes(context);

  astar.getGrid();
});
