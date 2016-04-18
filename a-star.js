var astar = {
  openlist: [], // contains squares that might fall along the path, and need to be checked out
  closedlist:[], //list of squares that you temporarly not have to look at, these squares are unwalkable

  getGridNodes:function(){
    var self = this;
    teken.addEventListener('click',function(){
      var grid = Object.create(Grid);
      self.pushStartingSquare(grid);
      self.heuristicDistance(grid);
      self.adjacentSquares(grid);
    });
  },
  pushStartingSquare:function(grid){
    this.closedlist.length = 0;
    grid.startpoint[0].calcGScore(0);
    this.closedlist.push(grid.startpoint[0]);
    console.log(this.closedlist);
  },
  heuristicDistance:function(grid){
    var x = startpoint.xmap;
    var y = startpoint.ymap;
    var walls = grid.walls;
    var endpoint = grid.endpoint;
    var grid = grid.grid;

    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        if(walls.indexOf(grid[i][j]) == -1){
          grid[i][j].heuristic(endpoint);
        }else{
          grid[i][j].status = 0;
        }
      }
    }
  },
  adjacentSquares: function(grid){
    var grid = grid.grid;
    var parent = this.closedlist.slice(-1).pop();
    var selectedValue = parent.id.split(",");
    var x = parseFloat(selectedValue[0]);
    var y = parseFloat(selectedValue[1]);
    var temp = [];
    for (var l = 1; l > -3; l-=2) {
      var xcor = x-l;
      var ycor = y-l;
      if(xcor > 0){
        var xh = grid[x-l][y-0];
        var yh = grid[x-l][y-1];
        var yw = grid[x-l][y+1];
      }
      if(ycor > 0 ){
      var xw = grid[x-0][y-l];
      }
    temp.push.apply(temp, [xh,yh,yw,xw]);
    adjacentSquares = temp.filter(function(n){ return n != undefined });
    }
    this.openlist.push(xh);
  }
}
