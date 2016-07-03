var astar = {
  openlist: [], // contains squares that might fall along the path, and need to be checked out
  closedlist:[], //list of squares that you temporarly not have to look at, these squares are unwalkable

  getGridNodes:function(context){
    var self = this;
    teken.addEventListener('click',function(){
      var grid = Object.create(Grid);
      self.pushStartingSquare(grid,context);
      self.bestTile(grid,context);
    });
  },
  pushStartingSquare:function(grid,context){
    grid.resetGrid(context,this.closedlist);
    this.closedlist.length = 0;
    grid.startpoint[0].calcGScore(0);
    this.closedlist.push(grid.startpoint[0]);
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
    this.heuristicDistance(grid);
    var tilegrid = grid.grid
    var parent = this.closedlist.slice(-1).pop(),
        selectedValue = parent.id.split(","),
        x = parseFloat(selectedValue[0]),
        y = parseFloat(selectedValue[1]),
        temp = [],
        arr = [];
    for (var l = 1; l > -3; l-=2) {
      var xcor = x-l;
      var ycor = y-l;
      if(xcor > 0){
        var xh = tilegrid[x-l][y-0];
        var yh = tilegrid[x-l][y-1];
        var yw = tilegrid[x-l][y+1];
        xh.calcGScore(10+parent.gscore);
        yh.calcGScore(14+parent.gscore);
        yw.calcGScore(14+parent.gscore);
      }
      if(ycor > 0 ){
        var xw = tilegrid[x-0][y-l];
        xw.calcGScore(10+parent.gscore);
      }
      temp.push.apply(temp,[xh,yh,yw,xw]);
    }
    for(let i of temp)
        i && arr.push(i);
      temp = arr
      delete arr;
    for(var i = 0; i < temp.length; i++) {
      if(temp[i].status == 0) {
        temp[i].calcGScore(Infinity);
         delete temp[i];
      }
      adjacentSquares = temp.filter(Object);
    }
    this.setTotalScore(adjacentSquares);
    return [adjacentSquares,parent];
  },
  setParentSquare: function(squares,parent){
    for (var i = 0; i < squares.length; i++) {
      squares[i].parentsquare = parent.id;
    }
  },
  setTotalScore: function(squares){
    for (var i = 0; i < squares.length; i++) {
      squares[i].calcFScore();
    }
  },
  checkPath: function(grid){
    var adjacentSquares = this.adjacentSquares(grid);
    adjacentSquaresList = adjacentSquares[0];
    parent = adjacentSquares[1];
    for (var i = 0; i < adjacentSquaresList.length; i++) {
      if(this.openlist.indexOf(adjacentSquaresList[i]) == -1 && this.closedlist.indexOf(adjacentSquaresList[i]) == -1){
        adjacentSquaresList[i].parentsquare = parent.id;
        this.openlist.push(adjacentSquaresList[i]);
      }
    }
  },
  bestTile: function(grid,context){
    console.log(grid.grid);
    bestTile = grid.startpoint[0];
    function compare(a,b) {
      if (a.fscore < b.fscore)
        return -1;
      if (a.fscore > b.fscore)
        return 1;
      return 0;
    }
    while(bestTile.id != grid.endpoint[0].id){
      this.checkPath(grid);
      var bestTile = this.openlist.sort(compare)[0];
      this.closedlist.push(bestTile);
      this.openlist.splice(0,1);
    }
    grid.setPath(context,this.closedlist);
  }
}
