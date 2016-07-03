var Grid = {
  rows: 1, //i
  cols: 1, //j
  grid: [],
  startpoint:[],
  endpoint:[],
  walls:[],
  pathTiles:[],

  init: function(context){
    this.greenTile = document.getElementById("startpoint");
    this.redTile = document.getElementById("endpoint");
    this.wallsTiles = document.getElementById("walls");
  },
  generateGrid: function(){
    for(var i =0; i <=this.rows; i++){
      this.grid.push([]);
      for(var j =0; j<this.cols; j++){
        var xpos = 0+i*canvas.width/this.rows;
        var ypos = 0+j*canvas.height/this.cols;
        var id = i+ ","+j;
        var xmap = i;
        var ymap = j;
        tile = new Tile(xpos,ypos,xmap,ymap,id,this.rows,this.cols);
        this.grid[i].push(tile);
      }
    }
  },
  drawGrid: function(context){
    this.context = context;
    for(var i = 0; i<this.rows;i++){
     for (var j = 0; j < this.cols; j++) {
       this.grid[i][j].draw(this.context);
       this.getGrid()[i][j].hscore = Infinity;
       this.getGrid()[i][j].gscore = Infinity;
      }
    }
  },
  dataEmitter:function(inputvalue,context){
    var a = [];
    green = "startpoint",
    red = "endpoint",
    wall = "walls"
    a[red] = this.endpoint;
    a[wall] = this.walls;
    a[green] = this.startpoint;
    var self = this;
    var re= /\[(.*?)\]/g;
    for(key in inputvalue){
      if (inputvalue.hasOwnProperty(key)) {
        var result = inputvalue + inputvalue[key].match(/[^[\]]+(?=])/g)
        for(m = re.exec(inputvalue[key]); m; m = re.exec(inputvalue[key])){
          x = parseInt(m[1].substr(0,m[1].indexOf(',')));
          y = parseInt(m[1].substr(m[1].lastIndexOf(',') + 1));
          var targettiles = self.grid[x][y];
          for (var pushableArray in a) {
            if (key == pushableArray) {
              a[pushableArray].push(targettiles);
            }
          }
        }
      }
    }
    this.drawGrid(context);
  },
  resetGrid:function(ar1){
    var arrs = arguments;
    for (var i = 0; i < arrs.length; i++) {
      for (var j = 0; j < arrs[i].length; j++) {
        arrs[i][j].setWhite();
      }
      arrs[i].length = 0;
    }

    for(var i = 0; i<this.rows;i++){
      for (var j = 0; j < this.cols; j++) {
        this.grid[i][j].setWhite();
        this.grid[i][j].resetTile();
      }
    }
    console.log(this.grid);
  },
  setNodes:function(context){
    this.init();
    var self = this;
      var data = [],
      green = "startpoint",
      red = "endpoint",
      walls = "walls";
      data[green] = self.greenTile.value;
      data[red] = self.redTile.value;
      data[walls] = self.wallsTiles.value;
      self.resetGrid(context,self.startpoint,self.endpoint,self.walls);
      self.dataEmitter(data,context);
      self.setGreen(context);
      self.setRed(context);
      self.setWalls(context);
  },
  getNodes: function(context){
    var self = this;
    teken.addEventListener('click',function(){
      self.setNodes(context);
    });
      this.setNodes(context);
  },
  setGreen:function(context){
    this.startpoint[0].setGreen();
    this.drawGrid(context);
  },
  setRed:function(context){
    this.endpoint[0].setRed();
    this.drawGrid(context);
  },
  setWalls:function(context){
    for (var i = 0; i < this.walls.length; i++) {
      this.walls[i].setWall();
    }
    this.drawGrid(context);
  },
  setPath: function(context,pathTiles){
    for (var i = 1; i < pathTiles.length-1; i++) {
      pathTiles[i].setPathColor();
      pathTiles[i].draw(context);
    }
  },
  getGrid:function(){
    return this.grid;
  },
}
