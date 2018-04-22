//01050617410617137242 28520713 youtube pirela mercantil ahorro
var ctx = $("canvas").getContext('2d');
$('canvas').addEventListener('mousedown',mouseDown,false);
$('canvas').addEventListener('mouseup',mouseUp,false);
$('canvas').addEventListener('mouseout',mouseUp,false);
class figure{ 
    constructor(){ 
        this.x = []; this.y = []; this.xx = []; this.yy = [];
        this.t ; 
        this.prevCenter; 
        this.center; 
    } 
    points(tam,m){ 
        this.t = tam;
        for(var i = 0; i < this.t; i++){ 
            this.x.push(m[i].x); 
            this.y.push(m[i].y);
            this.xx[i] = this.x[i] + 100;
            this.yy[i] = this.y[i] + -100;
        }
        this.setCenter();
        this.center = this.prevCenter;
    }
    setCenter(){
        var xxx = 0, yyy = 0,xxxx = 0,yyyy = 0;
        for(var i = 0; i < this.t; i++){ 
            xxx += this.x[i]; 
            yyy += this.y[i]; 
            xxxx += this.xx[i];
            yyyy += this.yy[i];
        }
        xxx = xxx/this.t
        yyy = yyy/this.t
        xxxx = xxxx/this.t
        yyyy = yyyy/this.t
        xxxx += (xxx - xxxx) / 2;
        yyyy += (yyy - yyyy) / 2;;
        this.prevCenter = { x: xxxx, y: yyyy }
    }
    newPoints(){
        if(this.prevCenter != this.center){
            this.prevCenter.x -= this.center.x;
            this.prevCenter.y -= this.center.y;
            for(var i = 0; i < this.t; i++){ 
                this.x[i] -= this.prevCenter.x; 
                this.y[i] -= this.prevCenter.y;
                this.xx[i] -= this.prevCenter.x; 
                this.yy[i] -= this.prevCenter.y;
            }
            this.prevCenter = this.center;
        }
    }
    paint(){
        ctx.clearRect(0, 0, $("canvas").width, $("canvas").height);
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x[0], this.y[0]);
        for(var i = 0; i < this.t; i++){ ctx.lineTo(this.x[i], this.y[i]); }
        ctx.closePath();
        ctx.moveTo(this.xx[0], this.yy[0]);
        for(var i = 0; i < this.t; i++){ ctx.lineTo(this.xx[i], this.yy[i]); }
        ctx.closePath();
        for(var i = 0; i < this.t; i++){
            ctx.moveTo(this.x[i], this.y[i]);
            ctx.lineTo(this.xx[i], this.yy[i]); 
        }
        ctx.stroke();
    }
}
var obj  = new figure(), eme = [];
eme[0] = { x : 0, y : 0 }
eme[1] = { x : 50, y : 100 }
eme[2] = { x : 90, y : 40 }
eme[3] = { x : 30, y : 200 }
obj.points(4, eme);
obj.paint();
function $(id) { return document.getElementById(id); }
function mouseUp(e){ $("canvas").removeEventListener('mousemove',mouseMove,false); }
function mouseDown(e){ $('canvas').addEventListener('mousemove',mouseMove,false); } 
function mouseMove(e){ obj.center = getCoor(e.clientX,e.clientY); obj.newPoints(); obj.paint(); }
function getCoor(clientx,clienty){
    var z = $('canvas').getBoundingClientRect();
    return { x: clientx - z.left, y: clienty - z.top }
}
function mult(com) {
    var mr = [], m = [], m2 = [], mr2 = [];
    for (var i = 0; i < obj.t; i++) {
        m [i] = []; m2 [i] = []; mr[i] = []; mr2[i] = []; eme[i] = [];
        for(var j = 0; j < obj.t; j++){ 
            mr[i][j] = 0; mr2[i][j] = 0; m[i][j] = 1; m2[i][j] = 1;
            (i == j) ? eme[i][j] = 1 : eme[i][j] = 0;
        }
        m[i][0] = obj.x[i]; m[i][1] = obj.y[i]; m2[i][0] = obj.xx[i]; m2[i][1] = obj.yy[i];
    }
    if(com == "recZ"){ eme[0][0] = -1; eme[1][1] = -1 }
    else if(com == "recX"){ eme[1][1] = -1 }
    else if(com == "recY"){ eme[0][0] = -1 }
    for (var i = 0; i < obj.t; i++){
        for (var j = 0; j < obj.t; j++){
            for(var k = 0; k < obj.t; k++){ mr[i][j] += m[i][k] * eme[k][j]; }
            for(var k = 0; k < obj.t; k++){ mr2[i][j] += m2[i][k] * eme[k][j]; }
        }
    }
    for (var i = 0; i < obj.t; i++) { 
        obj.x[i] = Math.round(mr[i][0]); 
        obj.y[i] = Math.round(mr[i][1]); 
        obj.xx[i] = Math.round(mr2[i][0]); 
        obj.yy[i] = Math.round(mr2[i][1]); 
    }
    obj.setCenter();
    obj.paint();
}