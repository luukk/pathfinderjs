var astar = {
  openlist: [], // contains squares that might fall along the path, and need to be checked out
  closedlist:[], //list of squares that you temporarly not have to look at, these squares are unwalkable

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
    this.openlist.push(startpoint);
    this.getAdjecantSquares(grid.grid);
  },
  getAdjecantSquares:function(startNode){
    var parentNode = this.openlist[0];
    console.log(parentNode.id);
    x = parseInt(parentNode.id.substr(0,parentNode.id.indexOf(',')));
    console.log(x);
    parentNode.setParentNode(parentNode.id);
    var test = startNode[4][4];
    test.setParentNode(parentNode.id);
    console.log(test.parentsquare,test.id);
  },
}
