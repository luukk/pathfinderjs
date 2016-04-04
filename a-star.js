var astar = {
  openlist: [], // contains squares that might fall along the path, and need to be checked out
  closedlist:[], //list of squares that you temporarly not have to look at, these squares are unwalkable
  unwalkableNodes:[], //these nodes are unwalkable, and don't need to be checked anymore

  getGrid:function(){
    var grid = Object.create(Grid);
    this.getGridNodes(grid);
  },
  getGridNodes:function(grid){
    var self = this;
    teken.addEventListener('click',function(){
      self.getStartingPoint(grid.startpoint);
      self.getWalls(grid.walls),
      self.getendpoint(grid.endpoint);
      self.setUnwalkableNodes(grid.startpoint,grid.walls,grid.endpoint);
    });
  },
  setOpenList:function(){
    var openlist = [];
    return this.openlist;
    console.log(this.openlist);
  },
  getAdjecantSquares:function(startNode){
    var parentNode = startNode[0].id,
        horizontalAdjecantNodes = [],
        verticalAdjecantNodes = [];

  },
  getStartingPoint:function(startNode){
    this.getAdjecantSquares(startNode);
  },
  setUnwalkableNodes:function(startpoint,walls,endpoint){
    var unwalkable = [startpoint,walls,endpoint];
    for (var i = 0; i < unwalkable.length; i++) {
      for (var i = 0; i < array.length; i++) {
        array[i]
      }
      unwalkable[i]
    }
    console.log(unwalkable);
  },
  getWalls:function(walls){
  },
  getendpoint:function(endpoint){
  }
}
