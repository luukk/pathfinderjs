function Tile(xpos,ypos,xmap,ymap,id,rows,cols) {
  this.status = 1 //1 is walkable 0 is not;
  this.gscore = 999;
  this.hscore = 999;
  this.fscore = 1998;
  this.id = id;
  this.xmap = xmap;
  this.ymap = ymap;
  this.parentsquare = 999;
  this.xpos = xpos;
  this.ypos = ypos;
  this.rows = rows;
  this.cols = cols;
  this.cw = canvas.width;
  this.ch = canvas.height;
  this.color = "#ffffff";
  this.offsetx = this.xpos+this.cw/this.rows;
  this.offsety = this.ypos+this.ch/this.cols;

  this.draw = function(context){
    context.beginPath();
    context.moveTo(this.xpos,this.ypos);
    context.lineTo(this.offsetx,this.ypos);
    context.lineTo(this.offsetx,this.offsety);
    context.lineTo(this.xpos,this.offsety);
    context.lineTo(this.xpos,this.ypos);
    context.lineWidth = 2;
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
  }
  this.setGreen = function(){
    this.color = "#00cc00";
  }
  this.setRed = function(){
    this.color = "#cc0000";
  }
  this.setWhite = function(){
    this.color = "#ffffff";
  }
  this.setWall = function(){
    this.color = "#0000cc";
  }
  this.unwalkable = function(){
    this.status = 0;
  }
  this.setParentNode = function(id){
    this.parentsquare = id;
  }
  this.heuristic = function(endTile){

  }
}
