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
    });
  },
  pushStartingSquare:function(grid){
    var startpoint = grid.startpoint[0];
    this.parentsquares.push(startpoint);
    this.getAdjecantSquares(grid.grid);
  },
  getAdjecantSquares:function(grid){
    //first array in the closedlist is the parent
    var tileGrid = grid;
    var parentNode = this.parentsquares[0];
    x = parseInt(parentNode.id.substr(0,parentNode.id.indexOf(',')));
    y = parseInt(parentNode.id.substr(0,parentNode.id.lastIndexOf(',')));
    //var vertical = [x-1][y-0]
    for (var i = 0; i < 1; i++) {
      for (var j = 0; j <= 1; j++) {
        console.log(grid[y+j][x-1]);
      }
      for (var k = 0; k < 1; k++) {
        console.log(grid[y-k][x+k]);
      }
    }
  },
}
