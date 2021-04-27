/**
 * @author UberV
 * @version 0.0.12
 */


class ScaleGridLayer extends CanvasLayer {
  constructor() {
    super();
    console.log("Grid Scale | Drawing Layer | Loaded into Drawing Layer");
    this.select = null;
    let isActive = false;
    this.drawChild = null;    //a variable not used
    this.drawText = null; // used but not finished yet
    let textSample = null
    let drawChildBackup = null;
    let drawSquare = false;
    let dataCoords = null;      //variable to store the first clicks x coord
    let preGridScale = null;      //variable to store the first clicks y coord
    let secondY = null;     //variable to store the second clicks y coord
    this.testVar1 = null;  //testing variable
    this.testVar2 = null;  //testing variable
    this.testVar3 = null;
    let newButtons = null;  //testing variable
    let currentTool = null;  //testing variable
/**
    this.globalEventListeners = [
      ['keydown', sgLayer._onKeyDown],
      ['mousedown', sgLayer.gridonMouseDown],
      ['mousemove', sgLayer.gridonMouseMove],
      ['mouseup', sgLayer.gridonMouseUp]]
**/
    // <================== Class Variable Definition ====================>
  };


    // <================== Button Setup ====================>
  /**
   * This function will setup the buttons into the proper format for the new (as of 0.3.9) controls API
   */
  setButtons(){
    sgLayer.newButtons = {
      activeTool: "DrawSquare",
      name: "grid",
      icon: "fas fa-wrench",
      layer: "GridLayer",
      title: "Grid Controls",
      tools: [

        {
          icon: "fas fas fa-square",
          name: "DrawSquare",
          title: "Configure the grid by drawing a square",
          onClick: sgLayer.setupDrawSquare
        },
        {
          //icon: "fas fa-gem",
          icon: "fab fa-uikit",
          name: "Poly",
          title: "Configure the grid by drawing a Hexagon",
          onClick: sgLayer.setupPoly
        },
        {
          icon: "fas fa-ruler-horizontal",
          name: "AdjustX",
          title: "Adjust the X position of the grid",
          onClick: sgLayer.setupAdjX
        },
        {
          icon: "fas fa-ruler-vertical",
          name: "AdjustY",
          title: "Adjust the Y position of the grid",
          onClick: sgLayer.setupAdjY
        },
        {
          icon: "fas fa-th",
          name: "3X3",
          title: "Configure grid by drawing a 3x3 box",
          onClick: sgLayer.setup3X3
        },
        {
          icon: 'fas fa-table',
          name: "KnownSq",
          title: "Configure the grid with Known X/Y Squares",
          onClick: sgLayer.knownXY
        },
        {
          //icon: "fas fa-window-restore",
          icon: "fas fa-undo",
          name: "reset",
          title: "Reset Grid",
          onClick: e => {
            this.resetDialog(e);
          }
        }
      ]
    }
  }

    // <================== End Button Setup ====================>

  // Should be noted from here on out it gets dicey.
  // I copied functions from foundry.js because I dont know how to reference them so some things I dont entierly understand.


    // <================== Listeners Section ====================>


      _registerListeners() {
        //this.globalEventListeners.forEach((l) => canvas.stage.addListener(...l));
        //this._registerStageListeners();
        //canvas.stage.addListener(this.globalEventListeners[1])
    }

    /**
     * from foundry.js =  this adds the mousedown/mousemove/mouseup to the canvas calls their corresponding functions.
     */
    _addListeners() {
      console.log("Grid Scale | Drawing Layer | **** Running add listeners ****");
      //this.globalEventListeners.forEach((l) => window.addEventListener(...l));
      //console.log(t);
      //t.on("mousedown", sgLayer._onMouseDown).on("mouseup", this._onMouseUp);
      //window.addEventListener('mousedown', sgLayer.gridonMouseDown);
      canvas.stage.addListener('mousedown', sgLayer.gridonMouseDown);
    }


      /**
       * from foundry.js =  this removes the mousedown/mousemove/mouseup to the canvas and calls their corresponding functions.
       */
      _removeListeners() {
        console.log("Grid Scale | Drawing Layer | **** Running remove listeners ****");
        //console.log(t);
        //t.off("mousedown", sgLayer._onMouseDown).off("mousemove", this._onMouseMove).off("mouseup", this._onMouseUp);
        //sgLayer.globalEventListeners.forEach((l) => window.removeEventListener(...l));
        canvas.stage.removeListener('mousedown', sgLayer.gridonMouseDown);
        canvas.stage.removeListener("mousemove",sgLayer.gridonMouseMove);
        canvas.stage.removeListener("mouseup",sgLayer.gridonMouseUp);
      }


        /**
         * adds only the mouse move listener used to drawing the square.
         */
        _addMoveListener() {
          let t = canvas.stage;
          console.log("Grid Scale | Drawing Layer | **** Adding mouseMoveListener ****")
          //t.on("mousemove", sgLayer._onMouseMove);
          canvas.stage.addListener("mousemove",sgLayer.gridonMouseMove);
          canvas.stage.addListener("mouseup",sgLayer.gridonMouseUp);
        }

    // <================== Ends Listeners Section ====================>


    // <================== Start Mouse Actions  ====================>

  /**
   * @private
   */
  gridonMouseDown(e) {
    sgLayer.testVar2 = e;
   //console.log(e);
    //#console.log ("HOW DO YOU DO THIS SHIT AGAIN!!!!!!!!!!!!!!!")
//    if (e.data.button != 0) return;
    //console.log(sgLayer._getMousePos());
    let tDI = sgLayer._getMousePos(e);
    //sgLayer.testVar2 = e;
    //console.log(e);
    //console.log(tDI);
    //console.log
    //sgLayer.testVar1 = tDI;
    switch (sgLayer.currentTool){     //this switch statement checks the value of the active tool from gridControls then picks the right function on mouse click.
      case "resetGrid":
        break;
      case "adjX":
        sgLayer.newsetXOff(tDI);      //Broke out the xoffset from getPositionData and created a new function which does this.
        break;
      case "adjY":
        sgLayer.newsetYOff(tDI);     //Broke out the Yoffset from getPositionData and created a new function which does this.
      break;
      case "adjXT":
        //dL.newsetXOff(tDI);     //Broke out the Yoffset from getPositionData and created a new function which does this.
      break;
      case "adjYT":
        //dL.newsetYOff(tDI);     //Broke out the Yoffset from getPositionData and created a new function which does this.
      break;
      case "size":
      case "3x3":
      case "Poly":
      case "aGrid":     //this switch is used to add the mousemove listener for drawing the grid square
        sgLayer.testVar1 = tDI;
        sgLayer._addMoveListener();
        //sgLayer.testVar1 = tDI;
        //console.log(dL.testVar1)
        break;
      case "test2":     //test buttons case. move along.
          console.log("&&^^Calling Mouse Testing^^&&");
          console.log(tDI.x + "" + tDI.y);
          console.log(sgLayer.getTopLeft(tDI.x,tDI.y));
          sgLayer._removeListeners();
          break;
      default:
        console.log(sgLayer.currentTool)
        sgLayer._removeListeners();
        console.log("Grid Scale | Drawing Layer | &&^^NO mouse expression matched^^&&")
        //If something gets here then one or more listener enabler/disabler didnt work.
      }
  }


    /**
     * should only be active for drawing the grid square.
     * But in case it is active at some other point there is a if statement that checks for actie tool and if it needs drawn
     * @param {*} t
     */
    gridonMouseMove(t) {
      //console.log("MouseMove?")
      //console.log("Grid Scale | Drawing Layer | Mose has moved")
      //console.log("Grid Scale | Drawing Layer | This is T")
      //console.log(t);
      let e = sgLayer.testVar1;
      let i = sgLayer._getMousePos();
      //console.log("Grid Scale | Drawing Layer | This is e")
      //console.log(e);
      //console.log("Grid Scale | Drawing Layer | This is i")
      //console.log(i);
      //console.log(i)
      if (sgLayer.currentTool == "aGrid" || sgLayer.currentTool == "Poly" || sgLayer.currentTool == "3x3" ||sgLayer.currentTool == "size" && sgLayer.needsDrawn == true) {
        if (sgLayer.currentTool == "Poly") {sgLayer.configurePoly(e,i,t)}
        else {sgLayer.configureSquare(e,i,t)}
      }
    }



      /**
       * Used after finishing drawing the square.
       * @param {*} t
       */
      gridonMouseUp(t) {
        //console.log("Mouse Up?")
        let tDI = sgLayer._getMousePos();
        sgLayer._removeListeners();
        if (sgLayer.needsDrawn == true) {      //this triggers after finishing drawing the square. Resets some things, clears the square and switches back on the game listeners.
          //dL.needsDrawn = false, dL.currentTool = null, dL.drawChild.clear(), dL.enableGameListeners() ,dL.setGrid();
          if (sgLayer.currentTool == "Poly") {
            sgLayer.needsDrawn = false;
            sgLayer.setHexGrid();
            sgLayer.textSample.visible = false;
            sgLayer.testVar1 = null;
          } else {
            sgLayer.needsDrawn = false;
            sgLayer.drawChild.clear();
            sgLayer.setGrid();
            sgLayer.textSample.visible = false;
            sgLayer.testVar1 = null;
          }
        }
      }

  /**
   * @private
   */
  _getMousePos(e) {
    console.log("Grid Scale | Getting mouse position");
    const mouse = canvas.app.renderer.plugins.interaction.mouse.global;
    //const mouse = e.data.global;
    const t = canvas.stage.worldTransform;

    function calcCoord(axis) {
      return (mouse[axis] - t['t' + axis]) / canvas.stage.scale[axis];
    }

    return {
      x: calcCoord('x'),
      y: calcCoord('y')
    };
  }

    // <================== End Mouse Actions  ====================>


    // <================== Start Setup Functions  ====================>

  setupAdjX(){
    console.log("Grid Scale | Drawing Layer | Running AdjustX")
    sgLayer.currentTool = "adjX"
    sgLayer._addListeners();
  }

  setupAdjY(){
    console.log("Grid Scale | Drawing Layer | Running AdjustY")
    sgLayer.currentTool = "adjY"
    sgLayer._addListeners();
  }

  setupDrawSquare(){
    console.log("Grid Scale | Drawing Layer | Running DrawSquare")
    sgLayer.currentTool = "size"
    //dL.activeTool = "size"
    sgLayer.callAGrid();
  }

  setup3X3(){
    console.log("Grid Scale | Drawing Layer | Running 3X3")
    sgLayer.currentTool = "3x3"
    //dL.activeTool = "size"
    sgLayer.callAGrid();
  }

  setupPoly(){
    console.log("Grid Scale | Drawing Layer | Running Poly")
    sgLayer.currentTool = "Poly"
    //dL.activeTool = "size"
    sgLayer.callAGrid();
  }

    callAGrid(){
      //console.log("&&^^Calling Testing^^&&");
      sgLayer.needsDrawn = true;
      //sgLayer._addMoveListener();
      //this.globalEventListeners.forEach((l) => window.addEventListener(...l));
      canvas.stage.addListener('mousedown', sgLayer.gridonMouseDown);
    }



    // <================== End Setup Functions  ====================>

    // <================== Start Pixi Setup Functions  ====================>

    /**
     * This function sets up  the  Pixi text  container and styling.
     * @param {*} t
     * @param {*} s
     */
    drawSomeText(t,s){
      let style = new PIXI.TextStyle({      //this  here defines the style of  the text being displayed.  Can be changed later  at runtime if needed.
            dropShadow: true,
            dropShadowDistance: 1,
            fill: "#4bf02a",
            fontSize: 35,
            lineJoin: "round",
            strokeThickness: 4
          });

      sgLayer.textSample = new PIXI.Text("I  cant  be null", style);     //this defines our PIXIchild, we have  to  give it something to display or warnings show up.  Also at this stage style is applied.
      sgLayer.textSample.x = 750;    //set initial canvas placement
      sgLayer.textSample.y = 750;    //set initial canvas placement
      sgLayer.textSample.anchor.set(0.5);    //this sets the text to be  in the middle  of the point we  specify. Otherwise it is placed to the  right of the specified point.
      sgLayer.textSample.visible = false;    //Set visible  to  false  so someone dosent see the I cant be null message. Cause that would be awkward.

      canvas.controls.addChild(sgLayer.textSample);   //finially apply the pixi object as a child to the controls layer of the canvas.
    }

    removeSomeText(){
      canvas.controls.removeChild(sgLayer.textSample);
    }


    /**
     * this function sets up the data for drawing the square when given mouse position. Enforces drawing a square, not a rectange.
     * @param {*} i
     * @param {*} e
     * @param {*} t
     */
    configureSquare(i,e,t){
      var width = Math.abs(i.x - e.x) * (i.x < e.x ? -1 : 1);
      var height = Math.abs(width) * (i.y < e.y ? -1 : 1);
      let s = [i.x > e.x ? e.x : i.x, i.y > e.y ? e.y : i.y, Math.abs(width), Math.abs(height)];
      //console.log("Grid Scale | Draw Layer | this is drawBox s")
      //console.log(s)
      sgLayer.drawBox(s);
      sgLayer.dataCoords = s;
    }

    /**
     * this function sets up the data for drawing a rectange when given mouse position.
     * @todo **Not used but may be needed later **
     * @param {*} e
     * @param {*} i
     * @param {*} t
     */
    configureRectangle(e,i,t) {
      let s = [i.x > e.x ? e.x : i.x, i.y > e.y ? e.y : i.y, Math.abs(i.x - e.x), Math.abs(i.y - e.y)];
      sgLayer.drawBox(s), t.data.coords = s;
    }

    /**
     * this draws the box requested using pixi graphics. first it clears the previous square then sets fill color and line style then draws the new one from the given coords.
     * @param {*} t
     */
    drawBox(t) {
      //console.log(dL.drawChild, "this is drawbox drawchild before")
      //console.log(t);
      this.drawChild.clear().beginFill(0x208000, 0.3).lineStyle(1, 0x66ff33, .9, 0).drawRect(...t);
      if ( t[3] > 50 ) {
        this.textSample.visible = true;
        this.textSample.x = t[0]+(t[3]/2);
        this.textSample.y = t[1]+(t[3]/2);
        this.textSample.text  =  Math.floor(t[3]);
      } else {
        this.textSample.visible = false;
      }
        //this.drawText.text("what how do?",{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
        //this.drawChild.lineStyle(3, 0xFF9829, 0.9).drawRect(...t);
      //console.log(dL.drawChild, "this is drawbox drawchild after")
    }

    /**
     * this sets up drawChild for drawing the square.
     */
    setDrawChild(){
      this.drawChild = canvas.controls.addChild(new PIXI.Graphics());
      this.drawText =  canvas.controls.addChild(new PIXI.Text());
      //this.drawChildBackup = Object.freeze(this.drawChild);
      //console.log(dL.drawChild, "this is drawbox drawchild at setup")
      //dL.drawChild = canvas.stage.addChild(new PIXI.Graphics());
    }

    /**
     * this function sets up the data for drawing the square when given mouse position. Enforces drawing a square, not a rectange.
     * @param {*} i
     * @param {*} e
     * @param {*} t
     */
    configurePoly(i,e,t){
      let sombs = canvas.scene.data.gridType
      //console.log(sombs);
      if (sombs > 1 && sombs < 4){
        var height = Math.abs(i.y - e.y) * (i.y < e.y ? -1 : 1);
        var width = Math.abs(height) * (i.x < e.x ? -1 : 1);
        let s = [i.y > e.y ? e.y : i.y, i.x > e.x ? e.x : i.x, Math.abs(height), Math.abs(width)];
        //console.log("Grid Scale | Draw Layer | this is configurePoly")
        //console.log(s)
        sgLayer.pointyPotato(s[1],s[0],s[2],s[3])
        t.data.coords = s, sgLayer.dataCoords = s;
      }
      else {
        var width = Math.abs(i.x - e.x) * (i.x < e.x ? -1 : 1);
        var height = Math.abs(width) * (i.y < e.y ? -1 : 1);
        let s = [i.x > e.x ? e.x : i.x, i.y > e.y ? e.y : i.y, Math.abs(width), Math.abs(height)];
        //console.log("Grid Scale | Draw Layer | this is configurePoly")
        //console.log(s)
        sgLayer.flatPotato(s[0],s[1],s[2],s[3])
        t.data.coords = s, sgLayer.dataCoords = s;
      }
    }

    /**
     * THis is the setup for a horizontal (flat) hex grid. Found the equations here (https://rechneronline.de/pi/hexagon.php)
     * @param {*} x
     * @param {*} y
     * @param {*} w
     * @param {*} h
     */
    flatPotato(x,y,w,h){
      let d = w;
      let a = d/2;
      let d2 = Math.sqrt(3) * a;
      let eH = Math.sqrt(3)/2*a

      //  the following variables setup a flat hex when dragged sideways. (WHY WAS THIS SO DIFFICULT REEEEEE)
      let pt1 = [x,y]
      let pt2 = [x + (a/2), y - eH]
      let pt3 = [x + (a/2) + a, y - eH]
      let pt4 = [x + w, y]
      let pt5 = [x + (a/2) + a, y + eH]
      let pt6 = [x + (a/2), y + eH]

      let whattf = [pt1[0],pt1[1],pt2[0],pt2[1],pt3[0],pt3[1],pt4[0],pt4[1],pt5[0],pt5[1],pt6[0],pt6[1],pt1[0],pt1[1]];
      //console.log(whattf);
      sgLayer.drawChild.clear().beginFill(0x478a94, 0.3).lineStyle(1, 0x7deeff, .9, 0).drawPolygon(whattf);
      if ( w > 50 ) {
        sgLayer.textSample.visible = true;
        sgLayer.textSample.x = x + (w/2);
        sgLayer.textSample.y = y;
        sgLayer.textSample.text  =  Math.floor(w);
      } else {
        sgLayer.textSample.visible = false;
      }
      //This entire thing is not efficient. But it seems to work.
    }

    /**
     * THis is the setup for a vertical (pointy) hex grid.
     * @param {*} x
     * @param {*} y
     * @param {*} w
     * @param {*} h
     */
    pointyPotato(x,y,w,h){
      let d = h;
      let a = d/2;
      let d2 = Math.sqrt(3) * a;
      let eH = Math.sqrt(3)/2*a

      let pt1 = [x,y]
      let pt2 = [x + eH, y + (a/2)]
      let pt3 = [x + eH, y + (a/2) + a]
      let pt4 = [x , y + h]
      let pt5 = [x - eH, y + (a/2) + a]
      let pt6 = [x - eH, y + (a/2)]

      let whattf = [pt1[0],pt1[1],pt2[0],pt2[1],pt3[0],pt3[1],pt4[0],pt4[1],pt5[0],pt5[1],pt6[0],pt6[1],pt1[0],pt1[1]];
      //console.log(whattf);
      sgLayer.drawChild.clear().beginFill(0x478a94, 0.3).lineStyle(1, 0x7deeff, .9, 0).drawPolygon(whattf);
      if ( h > 50 ) {
        sgLayer.textSample.visible = true;
        sgLayer.textSample.x = x;
        sgLayer.textSample.y = y + (h/2);
        sgLayer.textSample.text  =  Math.floor(h);
      } else {
        sgLayer.textSample.visible = false;
      }
    }

    /**
     *
     * @param {*} x
     * @param {*} y
     * @param {*} txt
     */
    drawCircle(x,y,txt){
      sgLayer.drawChild.beginFill(0xe74c3c, 0.3).lineStyle(1, 0x66ff33, .9, 0).drawCircle(x,y,20);
      sgLayer.drawChild.beginFill(0xf1c40f, 0.3).lineStyle(1, 0x66ff33, .9, 0).drawCircle(x,y,5);
      this.textSample.visible = true;
      this.textSample.x = x;
      this.textSample.y = y + 20;
      this.textSample.text  = txt;
    }

    /**
     * this is used to get the side points for a hexagon based off the returned center point so that offset can be determined.
     * @param {*} x
     * @param {*} y
     */
    getFlatHexPoints(x,y){
      let curWidth = canvas.scene.data.grid;
      let d = curWidth;
      let a = d/2;
      let d2 = Math.sqrt(3) * a;
      let eH = Math.sqrt(3)/2*a

      let centerPoint = canvas.grid.getCenter(x,y)
      let lP = [centerPoint[0] - a , centerPoint[1]];
      let rP = [centerPoint[0] + a , centerPoint[1]];
      let bP = [centerPoint[0] , centerPoint[1] + eH];
      let tP = [centerPoint[0] , centerPoint[1] - eH];
      let rTP = [centerPoint[0] + (a/2), centerPoint[1] - eH];
      let rBP = [centerPoint[0] + (a/2), centerPoint[1] + eH];
      let lTP = [centerPoint[0] - (a/2), centerPoint[1] - eH];
      let lBP = [centerPoint[0] - (a/2), centerPoint[1] + eH];


      let someshit = [lP[0],lP[1],rP[0],rP[1],tP[0],tP[1],bP[0],bP[1],centerPoint[0],centerPoint[1],rTP[0],rTP[1],rBP[0],rBP[1],lTP[0],lTP[1],lBP[0],lBP[1]];

      return someshit;
      /*
        How this determines offsets is to get the center of the clicked in hexagon. Following this it gets the current scenes grid size.
        Since we know the grid size and that a hexagon is a bunch of triangles we can calculate the points we need to determine the edges of the hexagon.
        We determine a left point (lP), right point (rP), top point (tP), and bottom point (bP). Once these points are figured out. When this is called
        the function that called it can see if the click is inside/outside of these points and adjust the grid accordingly.
      */
    }

    /**
     * this is used to get the side points for a hexagon based off the returned center point so that offset can be determined.
     * @param {*} x
     * @param {*} y
     */
    getPointyHexPoints(x,y){
      let curWidth = canvas.scene.data.grid;
      let d = curWidth;
      let a = d/2;
      let d2 = Math.sqrt(3) * a;
      let eH = Math.sqrt(3)/2*a

      let centerPoint = canvas.grid.getCenter(x,y)
      let lP = [centerPoint[0] - eH , centerPoint[1]];
      let rP = [centerPoint[0] + eH, centerPoint[1]];
      let bP = [centerPoint[0] , centerPoint[1] + a];
      let tP = [centerPoint[0] , centerPoint[1] - a];
      let rTP = [centerPoint[0] + eH, centerPoint[1] - (a/2)];
      let rBP = [centerPoint[0] + eH, centerPoint[1] + (a/2)];
      let lTP = [centerPoint[0] + eH, centerPoint[1] - (a/2)];
      let lBP = [centerPoint[0] + eH, centerPoint[1] + (a/2)];



      let someshit = [lP[0],lP[1],rP[0],rP[1],tP[0],tP[1],bP[0],bP[1],centerPoint[0],centerPoint[1],rTP[0],rTP[1],rBP[0],rBP[1],lTP[0],lTP[1],lBP[0],lBP[1]];

      return someshit;
      //tdlr need points to determine shift distance (see above ~731)
    }


    // <================== End Pixi Setup Functions  ====================>


    // <================== Start Custom Functions  ====================>

  /**
   * from foundry.js = I think this reutrns the top left coords of the grid square that contains the given x/y coords.
   * @param {*} x
   * @param {*} y
   */
  getTopLeft(x, y) {
    const s = canvas.dimensions.size;
    return [x, y].map(c => Math.round(c - (s /2)));
  }


  /**
   * from foundry.js = I think this reutrns the coords of the grid square center that contains the given x/y coords.
   * @param {*} t
   * @param {*} e
   */
  getNearestCenter(t, e) {
    const i = canvas.dimensions.size;
    return sgLayer.getTopLeft(t, e).map(t => t + i / 2)
  }


  /**
   * Render a configuration sheet to configure the default Drawing settings
   */
  configureDefault() {
    let d = null;
    new SquareConfig(d).render(true);
  }

  /* -------------------------------------------- */



caclByXnY(x,y) {
    let  canD = canvas.dimensions;
    let pixels = ((canD.sceneHeight / x)+(canD.sceneWidth / y)) / 2
    let curScene = game.scenes.get(canvas.scene.data._id);
    //console.log(curScene);
    curScene.update({grid: pixels});
    return pixels;
 }

   /**
    *
    * @param {*} p1
    * @param {*} p2
    * @param {*} p3
    * @param {*} cP
    */
   findTheBestSide(p1,p2,p3,cP){
     //console.log("Grid Scale | Drawing Layer | ^^^^^ Choose Best side ^^^^^");
     if (cP < p1 + 5 && cP > p1 - 5){
     //  console.log("left (top) most point")
       return p1
     }
     else if(cP < p2 + 5 && cP > p2 - 5){
     //  console.log("Middle (middle) most point")
       return p2
     }
     else {
     //  console.log("right (bottom) most point")
       return p3
     }
    }



      /**
       *
       * @param {*} n1
       * @param {*} n2
       * @param {*} clickN
       * @param {*} gS
       */
      findTheBest(n1,n2,clickN,gS){
      //  console.log("this is clickN " + clickN)
      //  console.log("this is n1 " + n1)
      //  console.log("this is n2 " + n2)
        let arry = null;
        let abs1 = n1 - clickN;
        let abs2 = n2 - clickN;
      //  console.log("this is abs1 " + abs1)
      //  console.log("this is abs2 " + abs2)
        if (Math.abs(abs1) < Math.abs(abs2)) {
          console.log("Grid Scale | Drawing Layer | ^^^^^ ChoseABS1 ^^^^^");
          if (n1 < clickN){
            //console.log("Grid Scale | Drawing Layer | ^^^^^ N1 was LT Click ^^^^^");
            arry = [Math.abs(abs1),-Math.abs(gS/2)]
            return arry;
          }
          else{
            //console.log("Grid Scale | Drawing Layer | ^^^^^ N1 was GT Click ^^^^^");
            arry = [-Math.abs(abs1),-Math.abs(gS/2)]
            return arry;
          }
        }
        else {
          //console.log("Grid Scale | Drawing Layer | ^^^^^ ChoseABS2 ^^^^^");
          if (n2 < clickN){
            //console.log("Grid Scale | Drawing Layer | ^^^^^ N2 was LT Click ^^^^^");
            arry = [Math.abs(abs2),Math.abs(gS/2)]
            return arry;
          }
          else{
            //console.log("Grid Scale | Drawing Layer | ^^^^^ N2 was GT Click ^^^^^");
            arry = [-Math.abs(abs2),Math.abs(gS/2)]
            return arry;
          }
        }

      }



    // <================== End Custom Functions  ====================>


    // <================== Start Grid Setting Functions  ====================>

  /**
   * this function takes in a mouse click then calls getTopLeft
   * to find the top left corner of the grid square that the click was in then gets the offset in a positive number.
   * @param {*} s
   */
  async newsetXOff(s) {
    // Added the logic so it wont constantly shift in the positive direction. Instead finds the closest side the clicked point and will move the grid in either + or - to get there.

    //sgLayer._removeListeners();     //removing listeners to so as to not get any more data and mess up the calculations
    //console.log("%%%%%%This is S")
    //console.log(s)
    let curScene = game.scenes.get(canvas.scene.data._id);      //getting current scenes ID from the canvas
    let curGrid = curScene.data.grid;      //getting current grid size from the canvas
    let curOffset = curScene.data.shiftX;     //getting the current xOffset incase it is not = 0 we need to add out new offset number to it.
    //console.log("The current X offset is = " + curOffset);
    let curGridType = canvas.scene.data.gridType;
    let hexPValues = null;
    switch(curGridType){  // This switch was added to determine what type of grid is in use and then apply the correct adjustment calculations.
    case 0:
      console.log("why was i created")
    break;
    case 1:
        console.log("Grid Scale | Drawing Layer | Adjust X Square")
      let closeTopL = canvas.grid.getTopLeft(s.x, s.y);     //getting X/Y of grid corner
      let oppX = closeTopL[0] + curGrid;
      let sG = s.x + curGrid;
      let absTopL = Math.abs(closeTopL[0] - s.x);
      let absTopR = Math.abs(oppX - s.x);

      if (absTopL > absTopR) {
        let xOff = curOffset - Math.floor(absTopR);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
        console.log("&& xOff is " + xOff);
        await curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
        sgLayer.garbageDialog("X Offset",xOff);
      } else {
        console.log("is closer to left side of square");
        let xOff = curOffset + Math.floor(absTopL);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
        console.log("&& xOff is " + xOff);
        await curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
        sgLayer.garbageDialog("X Offset",xOff);
      }
    break;
    case 2:
    case 3:
      console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust X")
      hexPValues = sgLayer.getPointyHexPoints(s.x,s.y)
      //console.log(hexValues);
      let absPL = Math.abs(hexPValues[0] - s.x);
      let absPR = Math.abs(hexPValues[2] - s.x);
      //console.log(absPL);
      //console.log(absPR);
      if (absPR < absPL) {
        console.log("is closer to right side of hex");
        let xOff = curOffset - Math.floor(absPR);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
        console.log("&& xOff is " + xOff);
        //let potat = hexValues[2] + xOff;
        //dL.drawCircle(potat, hexValues[3]);
        await curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
        sgLayer.garbageDialog("X Offset",xOff);
      } else {
        console.log("is closer to left side of hex");
        let xOff = curOffset + Math.floor(absPL);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
        console.log("&& xOff is " + xOff);
        //let potat = hexValues[0] + xOff;
        //dL.drawCircle(potat, hexValues[1]);
        await curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
        sgLayer.garbageDialog("X Offset",xOff);
    }
    break;
    case 4:
    case 5:
    console.log("Grid Scale | Drawing Layer | Flat Hex Adjust X")
    hexPValues = sgLayer.getFlatHexPoints(s.x,s.y)
    //console.log(hexPValues);
    //console.log(s.x + " " + s.y);
    let prefSide = sgLayer.findTheBestSide(hexPValues[5],hexPValues[7],hexPValues[9],s.y)
      if (prefSide == hexPValues[5]){
              console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust X | Chose Top points")
        sgLayer.setDatXOffset(hexPValues[14],hexPValues[10],s)
      }
      else if (prefSide == hexPValues[1]){
                  console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust X | Chose Middle POints")
        sgLayer.setDatXOffset(hexPValues[2],hexPValues[0],s)
      }
      else {
              console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust X | Chose Bottom Points")
        sgLayer.setDatXOffset(hexPValues[16],hexPValues[12],s)
      }
    break;
    default:
    console.log("to pass the butter")
    }
  }

  /**
   * this function takes in a mouse click then calls getTopLeft
   * to find the top left corner of the grid square that the click was in then gets the offset in a positive number.
   * @param {*} s
   */
  async newsetYOff(s) {
    // Added the logic so it wont constantly shift in the positive direction. Instead finds the closest side the clicked point and will move the grid in either + or - to get it right.

    //console.log("%%%%%%This is S")
    //console.log(s)
    sgLayer._removeListeners();     //removing listeners to so as to not get any more data and mess up the calculations
    let curScene = game.scenes.get(canvas.scene.data._id);      //getting current scenes ID from the canvas
    //console.log(curScene);
    let curGrid = curScene.data.grid;      //getting current grid size from the canvas
    let curOffset = curScene.data.shiftY;     //getting the current xOffset incase it is not = 0 we need to add out new offset number to it.
    //console.log("The current Y offset is = " + curOffset);
    let curGridType = canvas.scene.data.gridType;

    switch(curGridType){  // This switch was added to determine what type of grid is in use and then apply the correct adjustment calculations.
      case 0:
        console.log("why was i created")
      break;
      case 1:
            console.log("Grid Scale | Drawing Layer | Square Adjust Y")
        let closeTopL = canvas.grid.getTopLeft(s.x, s.y);     //getting X/Y of grid corner
        let oppY = closeTopL[1] + curGrid;
        let sG = s.y + curGrid;
        let absTop = Math.abs(closeTopL[1] - s.y);
        let absBot = Math.abs(oppY - s.y);
        //dL.drawCircle(s.x,s.y);
        //console.log(s.x);
        //console.log(s.y);
          if (absTop < absBot) {
            console.log("Is closer to top of square");
            let yOff = curOffset + Math.floor(absTop);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
            console.log("&& yOff is " + yOff);
            //dL.drawCircle(s.x,s.y + yOff)
            await curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
            sgLayer.garbageDialog("Y Offset",yOff);
          } else {
            console.log("is closer to bottom of square");
            let yOff = curOffset - Math.floor(absBot);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
            console.log("&& yOff is " + yOff);
            //dL.drawCircle(s.x,s.y - yOff)
            await curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
            sgLayer.garbageDialog("Y Offset",yOff);
          }
        break;
      case 2:
      case 3:
      console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust Y")
      let hexPValues = sgLayer.getPointyHexPoints(s.x,s.y)
      //console.log(hexPValues);
      //console.log(s.x + " " + s.y);
      let prefSide = sgLayer.findTheBestSide(hexPValues[0],hexPValues[8],hexPValues[2],s.x)
        if (prefSide == hexPValues[0]){
          sgLayer.setDatYOffset(hexPValues[15],hexPValues[17],s)
        } else if (prefSide == hexPValues[8]){
          sgLayer.setDatYOffset(hexPValues[5],hexPValues[7],s)
        } else {
          sgLayer.setDatYOffset(hexPValues[11],hexPValues[13],s)
        }
        break;
      case 4:
      case 5:
        console.log("Grid Scale | Drawing Layer | Flat Hex Adjust Y")
        let hexValues = sgLayer.getFlatHexPoints(s.x,s.y)
        //console.log(hexValues);
        let absT = Math.abs(hexValues[5] - s.y);
        let absB = Math.abs(hexValues[7] - s.y);
        /*
        console.log(hexValues[5]);
        console.log(hexValues[7]);
        console.log(s.y);
        console.log(absT);
        console.log(absB);
        */
        if (absT < absB) {
          console.log("is closer to Top of hex");
          let yOff = curOffset + Math.floor(absT);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
          console.log("&& yOff is " + yOff);
          //let potat = hexValues[5] + yOff;
          //dL.drawCircle(hexValues[4], potat);
          await curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
          sgLayer.garbageDialog("Y Offset",yOff);
        } else {
          console.log("is closer to Bottom of hex");
          let yOff = curOffset - Math.floor(absB);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
          console.log("&& xOff is " + yOff);
          //let potat = hexValues[7] + yOff;
          //dL.drawCircle(hexValues[6], potat);
          await curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
          sgLayer.garbageDialog("Y Offset",yOff);
        }
        break;
      default:
        console.log("to pass the butter")
    }
  }

  async adjustMapScale(gridPix) {
    let curScene = game.scenes.get(canvas.scene.data._id);
    let adjustment = 50 / gridPix;
    let heightAdjust = Math.round(canvas.scene.data.height * adjustment)
    let widthAdjust = Math.round(canvas.scene.data.width * adjustment)
    await curScene.update({grid: 50, width: widthAdjust, height: heightAdjust});
  }

  async setDatYOffset(p1,p2,s){
    let curScene = game.scenes.get(canvas.scene.data._id);
    let curGrid = canvas.grid.size;
    let curOffset = curScene.data.shiftY;
    let hexPValues = sgLayer.getPointyHexPoints(s.x,s.y)
    let absPT = Math.abs(p1 - s.y);
    let absPB = Math.abs(p2 - s.y);
    //something is fucky here.
    let magicNumber = sgLayer.findTheBest(p1,p2,s.y,curGrid);
    //console.log("Grid Scale | Drawing Layer | ****MAGICNUMBER****")
    //console.log(magicNumber);
    let center = canvas.grid.getCenter(s.x,s.y);
    //dL.drawCircle(center[0],center[1],"center");
    let updatedPoint = center[1] + magicNumber[1]
    //dL.drawCircle(center[0],updatedPoint,"endpoint");
    //dL.drawCircle(center[0],updatedPoint + magicNumber[0]);
    let yOff = curOffset + magicNumber[0];
    //setTimeout(function(){  curScene.update({shiftY: yOff}); },3000);
    yOff = Math.round(yOff);
    await curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
    sgLayer.setGrid("Y Offset",yOff);
  }

  async setDatXOffset(p1,p2,s){
    let curScene = game.scenes.get(canvas.scene.data._id);
    let curGrid = canvas.grid.size;
    let curOffset = curScene.data.shiftX;
    let hexPValues = sgLayer.getFlatHexPoints(s.x,s.y)
    let absPT = Math.abs(p1 - s.x);
    let absPB = Math.abs(p2 - s.x);
    //console.log(absPT)
    //console.log(absPB)
    //something is fucky here.
    let magicNumber = sgLayer.findTheBest(p1,p2,s.x,curGrid);
    console.log("Grid Scale | Drawing Layer | ****MAGICNUMBER****")
    console.log(magicNumber);
    let center = canvas.grid.getCenter(s.x,s.y);
    //dL.drawCircle(center[0],center[1],"center");
    let updatedPoint = center[0] + magicNumber[1]
    //dL.drawCircle(updatedPoint,center[1],"endpoint");
    //dL.drawCircle(updatedPoint + magicNumber[0], center[1]);
    let xOff = curOffset + magicNumber[0];
    //setTimeout(function(){  curScene.update({shiftX: xOff}); },3000);
    console.log("This is the xOff Variable");
    console.log(xOff);
    xOff = Math.round(xOff);
    await curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
    sgLayer.setGrid("X Offset", xOff);
  }


  /**
   * this function resets the grid to a 100px grid with 0 X/Y Offset, also sets the grid color to pink to make it easier to work with.
   */
  async resetGrid(){
    sgLayer._removeListeners();
    console.log("Grid Scale | Drawing Layer | ^^^^^ Resetting Grid ^^^^^");
    let curScene = game.scenes.get(canvas.scene.data._id);
    //console.log(curScene);
    await curScene.update({grid: 100, shiftX: 0, shiftY: 0, gridColor: "#ff09c1", gridAlpha: 1 });
  }


  /**
   * this will set the grid square size then depending on the tool selected may adjust the offset in X/Y
   * @param {*} s
   */
  async setGrid(s) {
    let adjY1 = canvas.dimensions.height;     //needed for adjustment of x/y later.
    let adjX1 = canvas.dimensions.width;     //needed for adjustment of x/y later.
    sgLayer.preGridScale = [adjX1, adjY1];           //needed for adjustment of x/y later.
    let curScene = game.scenes.get(canvas.scene.data._id);     //This gets the scene object for the current scene by asking the canvas for the current scenes ID then reutrning that to the game.scenes.get
    //console.log("Grid Scale | Drawing Layer | ^^^^^ this is datacoords ^^^^^")
    console.log(sgLayer.dataCoords);
    let gridPix = Math.floor(sgLayer.dataCoords[3]);      //getting the grid pixel size
    //console.log("Grid Scale | Drawing Layer | ^^^^^ Current Tool ^^^^^")
    //console.log(dL.currentTool);
    //console.log(gridPix);
    if (sgLayer.currentTool == "3x3") gridPix = gridPix / 3;
    if (gridPix >= 50) {
      //ui.notifications.info("This is the Grid Size : " + gridPix);      //notify user of offset
      await curScene.update({grid: gridPix});      //this will update the current scene, this time it is the grid square size
      sgLayer.garbageDialog("scale", gridPix);
    }
    if (gridPix < 50 ) {
      sgLayer._removeListeners();
      //ui.notifications.info("Grid Size must be 50px  or greater");
      this.drawChild.clear();
      sgLayer.scaleAdjustDialog(gridPix);
    }
    sgLayer._removeListeners();
    //dL.drawChild = null;
    if (sgLayer.currentTool == "aGrid") {    //This is here for future work on an automatic scale/offset function. When I can get it to work right. It scales properly but offsets are wrong.
      setTimeout(function(){sgLayer.autoAdjustOffset(gridPix, curScene, adjY1, adjX1); },1000);     //after 1.5 second call setYOff
    }
    sgLayer.currentTool = null;
  }

  /**
   * this is called when automatic adjustment of X/Y with grid square is selected.
   * @param {*} gridPix
   * @param {*} curScene
   * @param {*} adjY1
   * @param {*} adjX1
   */
  autoAdjustOffset (gridPix, curScene,adjY1, adjX1) {
    let adjY2 = canvas.dimensions.height;     //needed for adjustment of x/y
    let adjX2 = canvas.dimensions.width;     //needed for adjustment of x/y
    console.log(adjX1 + "" + adjY1);
    console.log("***** This is the map prior to adjustment");
    console.log(adjX2 + "" + adjY2);
    console.log("***** This is the map after the adjustment");
    let adjustedY = Math.abs(adjY1 - adjY2);
    let adjustedX = Math.abs(adjX1 - adjX2);
    console.log("this is the difference in the Y " + adjustedY);
    console.log("this is the difference in the X " + adjustedX);
    console.log("this is the original X coord " + sgLayer.testVar1.x);
    console.log("this is the original Y coord " + sgLayer.testVar1.y);
    adjustedX = sgLayer.testVar1.x - adjustedX;
    adjustedY = sgLayer.testVar1.y - adjustedY;
    console.log("this is the difference in the X " + adjustedX);
    console.log("this is the difference in the Y " + adjustedY);
    let varPass = {x:adjustedX,y:adjustedY};
    //dL.newsetXOff(varPass);
    sgLayer.newsetYOff(varPass);
  }


  /**
   * this will set the grid square size then depending on the tool selected may adjust the offset in X/Y
   * @param {*} s
   */
  async setHexGrid(s) {
    let adjY1 = canvas.dimensions.height;     //needed for adjustment of x/y later.
    let adjX1 = canvas.dimensions.width;     //needed for adjustment of x/y later.
    sgLayer.preGridScale = [adjX1, adjY1];           //needed for adjustment of x/y later.
    let curScene = game.scenes.get(canvas.scene.data._id);     //This gets the scene object for the current scene by asking the canvas for the current scenes ID then reutrning that to the game.scenes.get
    let gridPix = Math.floor(sgLayer.dataCoords[3]);      //getting the grid pixel size
    //console.log("Grid Scale | Drawing Layer | ^^^^^ GridPix ^^^^^")
    //console.log(gridPix);
    if (gridPix >= 50) {
      //ui.notifications.info("This is the Grid Size : " + gridPix);      //notify user of offset
      this.drawChild.clear();
      await curScene.update({grid: gridPix});      //this will update the current scene, this time it is the grid square size
      sgLayer.garbageDialog("hex scale", gridPix);
    }
    if (gridPix < 50 ) {
      sgLayer._removeListeners();
      //ui.notifications.info("Grid Size must be 50px  or greater");
      this.drawChild.clear();
      sgLayer.scaleAdjustDialog(gridPix);
    }
    sgLayer._removeListeners();
    sgLayer.currentTool = null;
  }

    // <================== End Grid Setting Functions  ====================>

    // <================== Start Dialog Displaying Functions  ====================>

    /**
     * Renders a completely useless dialog to confirm grid settings
     * @param {*} event  the event that spawned the dialog
     */
    garbageDialog(desc,num) {
      let start = "<p>The grid ";
      let potato = start.concat(desc," was set to ",num,"</p>");
      const confirmDialog = new Dialog({
        height: 800,
        width: 800,
        title: "Grid Changed",
        content: potato,
        buttons: {
            yes: {
                icon: `<i class="fas fa-check"></i>`,
                label: "ok",
            },
        },
        default: "ok"
      });

      confirmDialog.render(true);
    }


  /**
   * Renders a dialog to confirm the user wants to reset the grid
   * @param {*} event  the event that spawned the dialog
   */
  resetDialog(event) {
    const confirmDialog = new Dialog({
      height: 800,
      width: 800,
      title: "Reset grid?",
      content: "<p>Reset grid to defaults?</p>",
      buttons: {
          yes: {
              icon: `<i class="fas fa-check"></i>`,
              label: "Reset",
              callback: () => {
                sgLayer.resetGrid();
              }
          },
          no: {
              icon: `<i class="fas fa-times"></i>`,
              label: "Cancel"
          }
      },
      default: "no"
    });

    confirmDialog.render(true);
  }

  /**
   * Renders a dialog to confirm the user wants to reset the grid
   * @param {*} event  the event that spawned the dialog
   */
  scaleAdjustDialog(gridPix) {
    let start = "The map grid is ";
    let end = start.concat(gridPix,", do you want to adjust the map scale to bring it up to meet the minimum 50px?</p>");
    const confirmDialog = new Dialog({
      height: 800,
      width: 800,
      title: "Adjust Map Scale?",
      content: end,
      buttons: {
          yes: {
              icon: `<i class="fas fa-check"></i>`,
              label: "Yes",
              callback: () => {
                sgLayer.adjustMapScale(gridPix);
              }
          },
          no: {
              icon: `<i class="fas fa-times"></i>`,
              label: "No"
          }
      },
      default: "no"
    });

    confirmDialog.render(true);
  }



  /**
   * Handle a Compendium Pack creation request
   * @param event
   * @private
   */
  async knownXY() {
    const templatePath = 'modules/scaleGrid/templates/known-xy.html';
    //event.preventDefault();
    const html = await renderTemplate(templatePath, null);
    new Dialog({
      title: "Set Grid",
      content: html,
      buttons: {
        create: {
          icon: '<i class="fas fa-check"></i>',
          label: "Set the grid",
          callback: dlg => {
            const form = dlg.find('#compendium-create'),
                  data = validateForm(form[0]);
                  //console.log(data);
                  //sgLayer.testVar3 = data;
                  sgLayer.caclByXnY(data.xNum,data.yNum);
          //  Compendium.create(data).then(pack => {
            //  this.render();
            //});
          }
        }
      }
    }).render(true);
  }

    // <================== End Dialog Displaying Functions  ====================>


  /**
   * Initialize the ScaleGridLayer. Attach the button to the controls, draw the square, and the draw text.
   */
  initialize() {
    Hooks.on('getSceneControlButtons', controls => {
      //console.log("Grid Scale | Testing User role = " + game.user.data.role)
      if (game.user.data.role == 4) {
        controls.push(sgLayer.newButtons);
      }
    });
    // only draw objects when canvas is ready
    Hooks.on('canvasReady', _canvas => {
      sgLayer.setDrawChild();
      sgLayer.drawSomeText();
    })
  }

} // ends extendedCanvas class


//// Last bit to render and set function definitos

let sgLayer = new ScaleGridLayer();

sgLayer.setButtons();
sgLayer.initialize();

// Add a releaseAll function to the GridLayer class so it can pass through the Canvas.tearDown method -- to be fixed in a future Foundry release
GridLayer.prototype.releaseAll = function() {};

console.log("Grid Scale | ** Finished Loading **");
