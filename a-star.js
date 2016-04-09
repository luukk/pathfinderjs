var astar = {
  openlist: [], // contains squares that might fall along the path, and need to be checked out
  closedlist:[], //list of squares that you temporarly not have to look at, these squares are unwalkable
  parentsquares: [],

  getGrid:function(){
    var grid = Object.create(Grid);
    return grid
  },
  getGridNodes:function(){
    var self = this;
    teken.addEventListener('click',function(){
      var grid = self.getGrid();
      self.pushStartingSquare(grid);
      self.heuristicDistance(grid);
    //  self.AdjecantSquares(grid);
    });
  },
  pushStartingSquare:function(grid){
  },
  heuristicDistance:function(grid){
    var startpoint = grid.startpoint[0];
    var x = startpoint.xmap;
    var y = startpoint.ymap;
  //  var grid = grid.grid;

    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        if(grid.walls.indexOf(grid.grid[i][j]) == -1){
          grid.grid[i][j].heuristic(grid.endpoint);
          for (var k = 0; k < 1; k++) {
            for (var l = 1; l > -3; l-=2) {
              grid.grid[x-l][y-0].calcGScore(10);
              grid.grid[x-0][y-l].calcGScore(10);
              grid.grid[x-l][y-1].calcGScore(14);
              grid.grid[x-l][y+1].calcGScore(14);
            }
          }
        }else{
          grid.grid[i][j].status = 0;
        }
      }
    }
    console.log(grid.grid);

  },
}
