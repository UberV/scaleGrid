/**
 * @author UberV
 * @version 0.0.8
 */

class DrawingLayer extends CanvasLayer {
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
    let newButtons = null;  //testing variable
    let currentTool = null;  //testing variable
    // <================== Class Variable Definition ====================>
  }

  setButtons(){     //This function will setup the buttons into the proper format for the new (as of 0.3.9) controls API
    dL.newButtons = {
    activeTool: "reset",
    name: "grid",
    icon: "fas fa-wrench",
    layer: "GridLayer",
    title: "Grid Controls",
    tools: [
      {
        icon: "fas fa-window-restore",
        name: "reset",
        title: "Reset Grid",
        onClick: dL.resetGrid
      },
      {
        icon: "fas fas fa-square",
        name: "DrawSquare",
        title: "Configure the grid by drawing a square",
        onClick: dL.setupDrawSquare
      },
      {
        icon: "fas fa-ruler-horizontal",
        name: "AdjustX",
        title: "Adjust the X position of the grid",
        onClick: dL.setupAdjX
      },
      {
        icon: "fas fa-ruler-vertical",
        name: "AdjustY",
        title: "Adjust the Y position of the grid",
        onClick: dL.setupAdjY
      },
      {
        icon: "fas fa-boxes",
        name: "3X3",
        title: "Configure grid by drawing a 3x3 box",
        onClick: dL.setup3X3
      },
      {
        icon: "fas fa-gem",
        name: "Poly",
        title: "Configure the grid by drawing a Hexagon",
        onClick: dL.setupPoly
      }
    ]
    }
  }

    // Should be noted from here on out it gets dicey. I copied functions from foundry.js because I dont know how to reference them so some things I dont entierly understand.

    setupAdjX(){
      console.log("Grid Scale | Drawing Layer | Running AdjustX")
      dL.currentTool = "adjX"
      dL._addListeners();
    }

    setupAdjY(){
      console.log("Grid Scale | Drawing Layer | Running AdjustY")
      dL.currentTool = "adjY"
      dL._addListeners();
    }

    setupDrawSquare(){
      console.log("Grid Scale | Drawing Layer | Running DrawSquare")
      dL.currentTool = "size"
      //dL.activeTool = "size"
      dL.callAGrid();
    }

    setup3X3(){
      console.log("Grid Scale | Drawing Layer | Running 3X3")
      dL.currentTool = "3x3"
      //dL.activeTool = "size"
      dL.callAGrid();
    }

    setupPoly(){
      console.log("Grid Scale | Drawing Layer | Running Poly")
      dL.currentTool = "Poly"
      //dL.activeTool = "size"
      dL.callAGrid();
    }

      getTopLeft(x, y) {      //from foundry.js = I think this reutrns the top left coords of the grid square that contains the given x/y coords.
        const s = canvas.dimensions.size;
        return [x, y].map(c => Math.round(c - (s /2)));
      }

      drawSomeText(t,s){    // This function sets up  the  Pixi text  container and styling.
        let style = new PIXI.TextStyle({      //this  here defines the style of  the text being displayed.  Can be changed later  at runtime if needed.
              dropShadow: true,
              dropShadowDistance: 1,
              fill: "#4bf02a",
              fontSize: 35,
              lineJoin: "round",
              strokeThickness: 4
            });

        dL.textSample = new PIXI.Text("I  cant  be null", style);     //this defines our PIXIchild, we have  to  give it something to display or warnings show up.  Also at this stage style is applied.
        dL.textSample.x = 750;    //set initial canvas placement
        dL.textSample.y = 750;    //set initial canvas placement
        dL.textSample.anchor.set(0.5);    //this sets the text to be  in the middle  of the point we  specify. Otherwise it is placed to the  right of the specified point.
        dL.textSample.visible = false;    //Set visible  to  false  so someone dosent see the I cant be null message. Cause that would be awkward.

        canvas.controls.addChild(dL.textSample);   //finially apply the pixi object as a child to the controls layer of the canvas.
      }

      removeSomeText(){
        canvas.controls.removeChild(dL.textSample);
      }

      getNearestCenter(t, e) {       //from foundry.js = I think this reutrns the coords of the grid square center that contains the given x/y coords.
        const i = canvas.dimensions.size;
        return dL.getTopLeft(t, e).map(t => t + i / 2)
      }

      _addListeners() {     //from foundry.js =  this adds the mousedown/mousemove/mouseup to the canvas calls their corresponding functions.
        console.log("Grid Scale | Drawing Layer | **** Running add listeners ****");
        let t = canvas.stage;
        //console.log(t);
        t.on("mousedown", dL._onMouseDown).on("mouseup", this._onMouseUp);
      }

      _removeListeners() {       //from foundry.js =  this removes the mousedown/mousemove/mouseup to the canvas and calls their corresponding functions.
        console.log("Grid Scale | Drawing Layer | **** Running remove listeners ****");
        let t = canvas.stage;
        //console.log(t);
        t.off("mousedown", dL._onMouseDown).off("mousemove", this._onMouseMove).off("mouseup", this._onMouseUp);
      }

      _addClickListeners() {    //this is our click listener adds mouse down and up events.
        let t = canvas.stage;
        console.log("Grid Scale | Drawing Layer | **** Adding ClickListener ****")
        t.on("mousedown", dL._onMouseDown).on("mouseup", dL._onMouseUp);
    }

      _addMoveListener() {      //adds only the mouse move listener used to drawing the square.
        let t = canvas.stage;
        console.log("Grid Scale | Drawing Layer | **** Adding mouseMoveListener ****")
        t.on("mousemove", dL._onMouseMove);
      }

      _onMouseDown(t) {     //from foundry.js =  Modified to call the getPositionData function on click
    //console.log(t);
    let tDI = t.data.getLocalPosition(this);
    t.data.initial = tDI;
    //console.log("Grid Scale | Drawing Layer | Current Tool");
    //console.log(dL.currentTool);
    switch (dL.currentTool){     //this switch statement checks the value of the active tool from gridControls then picks the right function on mouse click.
      case "resetGrid":
        break;
      case "adjX":
        dL.newsetXOff(tDI);      //Broke out the xoffset from getPositionData and created a new function which does this.
        break;
      case "adjY":
        dL.newsetYOff(tDI);     //Broke out the Yoffset from getPositionData and created a new function which does this.
      break;
      /*
      case "adjXT":
        dL.newsetXOff(tDI);     //Broke out the Yoffset from getPositionData and created a new function which does this.
      break;
      case "adjYT":
        dL.newsetYOff(tDI);     //Broke out the Yoffset from getPositionData and created a new function which does this.
      break;
      */
      case "size":
      case "3x3":
      case "Poly":
      case "aGrid":     //this switch is used to add the mousemove listener for drawing the grid square
        dL._addMoveListener();
        dL.testVar1 = tDI;
        //console.log(dL.testVar1)
        break;
        case "test2":     //test buttons case. move along.
          console.log("&&^^Calling Mouse Testing^^&&");
          console.log(tDI.x + "" + tDI.y);
          console.log(dL.getTopLeft(tDI.x,tDI.y));
          dL._removeListeners();
          break;
      default:
        console.log(dL.currentTool)
        dL._removeListeners();
        dL.enableGameListeners();
        console.log("Grid Scale | Drawing Layer | &&^^NO mouse expression matched^^&&")
        //If something gets here then one or more listener enabler/disabler didnt work.
    }
    }


    callAGrid(){     //this is the auto adjust button, disables foundrys mousedown, adds our own then sets drawn to true for later.
         //console.log("&&^^Calling Testing^^&&");
           dL.disableGameListeners();     //when called this disables foundrys listeners.
           dL.needsDrawn = true;
           dL._addClickListeners();   //this adds our own "click" listener (mousedown and up)
    }


      disableGameListeners() {    //turns off foundrys listeners for mouse down.
        console.log("Grid Scale | Drawing Layer | Turning off game foundry mouse down");
        let t = canvas.stage;
        let f = t._events;
        //console.log(f);
        t.off("mousedown", canvas._onMouseDown);
      }

      enableGameListeners() {     //turns on foundrys listeners for mouse down.
        console.log("Grid Scale | Drawing Layer | Turning On game foundry mouse down");
        let t = canvas.stage;
        let f = t._events;
        //console.log(f);
        t.on("mousedown", canvas._onMouseDown);
      }



      _onMouseMove(t) {     //should only be active for drawing the grid square. But in case it is active at some other point there is a if statement that checks for actie tool and if it needs drawn.
    //console.log("MouseMove?")
    //console.log("Grid Scale | Drawing Layer | Mose has moved")
    let e = t.data.initial;
    let i = t.data.getLocalPosition(this);
    //console.log(i)
    if (dL.currentTool == "aGrid" || dL.currentTool == "Poly" || dL.currentTool == "3x3" ||dL.currentTool == "size" && dL.needsDrawn == true) {
      if (dL.currentTool == "Poly") {dL.configurePoly(e,i,t)}
      else {dL.configureSquare(e,i,t)}
    }
    }

      _onMouseUp(t) {          //Used after finishing drawing the square.
    //console.log("Mouse Up?")
    let tDI = t.data.getLocalPosition(this);
    if (dL.needsDrawn == true) {      //this triggers after finishing drawing the square. Resets some things, clears the square and switches back on the game listeners.
        //dL.needsDrawn = false, dL.currentTool = null, dL.drawChild.clear(), dL.enableGameListeners() ,dL.setGrid();
        if (dL.currentTool == "Poly") {dL.needsDrawn = false, dL._removeListeners() ,dL.enableGameListeners() ,dL.setHexGrid(), dL.textSample.visible = false;}
        else {
              dL.needsDrawn = false, dL.drawChild.clear() , dL.enableGameListeners() ,dL.setGrid(), dL.textSample.visible = false;
            }
    }
    }

    setOffset (s) {     //not used anymore, leaving in until I am sure its not needed
      let curScene = game.scenes.get(canvas.scene.data._id);
      let closeTopL = eC.getTopLeft(dL.firstX, dL.firstY);     //Gets the top left coords for the nearest grid square based off the first set of clicks.
      let xOff = s - Math.floor(Math.max(dL.firstX, closeTopL[0]) - Math.min(dL.firstX, closeTopL[0]));     //determins the xOffset by subtracting the smaller of the x coords from the larger of the two then rounds down.
      let yOff = Math.floor(Math.max(dL.firstY, closeTopL[1]) - Math.min(dL.firstY, closeTopL[1]));     //determins the xOffset by subtracting the smaller of the x coords from the larger of the two then rounds down.
      ui.notifications.info("Custom Button | Drawing Layer | These are the X " + yOff + " and Y " + xOff + " Offset");     //This was how i was going to let the user know of the Grid Size along with X/Y offset before Atropos pointed out the scene API and scene.update
      curScene.update({shiftX: yOff});      //this will update the current scene, this time it is the xOffset
      curScene.update({shiftY: xOff});      //this will update the current scene, this time it is the yOffset
      dL.firstX = dL.firstY = dL.secondX = dL.secondY = null;     //nulling out the specified values.
    }

      getPositionData (t,f) {     //This function will set the class X/Y variables then when the second set is filled will calculate the grid square size/X and Y offset, then set them for the current scene.    *** not used anymore. leaving in until I am sure its not needed. ***
        if (dL.firstX == null || dL.firstY == null) {     //checking to see if the class firstX/Y variables are = null, if so then store the currently passed x/y canvas coords to their corresponding variables
          dL.firstX = t.x, eC.firstY = t.y;     //storing the variables
          //console.log(t.x);
          //console.log(t.y);
        } else {      //this executes if the first set of variables are not = to null
          dL.secondX = t.x, eC.secondY = t.y;     //record the second set of mouse down clicks in the corresponding variables
          dL._removeListeners();
          //console.log("*** First Click X = " + eCanvas.firstX + "First Click Y = " + eCanvas.firstY + " | Second Click X = " + eCanvas.secondX + " Second Click Y = " + eCanvas.secondY);
          let xPix = Math.max(dL.firstX, dL.secondX) - Math.min(dL.firstX, dL.secondX);     // storing the number of X pixels between the two mouse clicks
          //console.log(xPix);
          let yPix = Math.max(dL.firstY, dL.secondY) - Math.min(dL.firstY, dL.secondY);     // storing the number of Y pixels between the two mouse clicks
          //console.log(yPix);
          let bigPix = Math.floor(Math.max(xPix, yPix));      //This will store the biggest number of pixels between the X or Y and use that as the Grid Size, may need to be changed in the future.
          //console.log(bigPix);
          let curScene = game.scenes.get(canvas.scene.data._id);      //This gets the scene object for the current scene by asking the canvas for the current scenes ID then reutrning that to the game.scenes.get
          //console.log(canvas.scene.data.grid);
          curScene.update({grid: bigPix});      //this will update the current scene, this time it is the grid square size
          //curScene._onUpdate({grid: bigPix});
          //console.log(canvas.scene.data.grid);
          let mPoint = {x:(dL.firstX + dL.secondX)/2,y:(dL.firstY + dL.secondY)/2};     //I was tring to determine the midpoint for some reason. May still be needed
          //console.log(mPoint);
          //eCanvas.colorFlip("get_grid");      //calling colorFlip to switch off/toggle the button
            dL.firstX = dL.firstY = dL.secondX = dL.secondY = null;     //nulling out the specified values.
          if (false == true) {    //This is here for future work on an automatic scale/offset function. When I can get it to work right. It scales properly but offsets are wrong.
            var potato = {x: dL.firstX,y: dL.firstY};     //creating an object of X/Y from first click to try and determine offset. (called functions expect object)
            setTimeout(function(){eC.setXOff(potato); },1000);     //after 1 second call setXOff
            setTimeout(function(){eC.setYOff(potato); },1500);     //after 1.5 second call setYOff
          }
        }     //ends else
      }     //ends getPositionData function

    newsetXOff(s) {      //this function takes in a mouse click then calls getTopLeft to find the top left corner of the grid square that the click was in then gets the offset in a positive number.
                        // Added the logic so it wont constantly shift in the positive direction. Instead finds the closest side the clicked point and will move the grid in either + or - to get there.

      dL._removeListeners();     //removing listeners to so as to not get any more data and mess up the calculations
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
          curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
        } else {
          console.log("is closer to left side of square");
          let xOff = curOffset + Math.floor(absTopL);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
          console.log("&& xOff is " + xOff);
          curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
        }
      break;
      case 2:
      case 3:
        console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust X")
        hexPValues = dL.getPointyHexPoints(s.x,s.y)
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
          curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
        } else {
          console.log("is closer to left side of hex");
          let xOff = curOffset + Math.floor(absPL);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
          console.log("&& xOff is " + xOff);
          //let potat = hexValues[0] + xOff;
          //dL.drawCircle(potat, hexValues[1]);
          curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
      }
      break;
      case 4:
      case 5:
      console.log("Grid Scale | Drawing Layer | Flat Hex Adjust X")
      hexPValues = dL.getFlatHexPoints(s.x,s.y)
      //console.log(hexPValues);
      //console.log(s.x + " " + s.y);
      let prefSide = dL.findTheBestSide(hexPValues[5],hexPValues[7],hexPValues[9],s.y)
        if (prefSide == hexPValues[5]){
                console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust X | Chose Top points")
          dL.setDatXOffset(hexPValues[14],hexPValues[10],s)
        }
        else if (prefSide == hexPValues[1]){
                    console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust X | Chose Middle POints")
          dL.setDatXOffset(hexPValues[2],hexPValues[0],s)
        }
        else {
                console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust X | Chose Bottom Points")
          dL.setDatXOffset(hexPValues[16],hexPValues[12],s)
        }
      break;
      default:
      console.log("to pass the butter")
      }




    }

    newsetYOff(s) {      //this function takes in a mouse click then calls getTopLeft to find the top left corner of the grid square that the click was in then gets the offset in a positive number.
                        // Added the logic so it wont constantly shift in the positive direction. Instead finds the closest side the clicked point and will move the grid in either + or - to get it right.

      //console.log("%%%%%%This is S")
      //console.log(s)
      dL._removeListeners();     //removing listeners to so as to not get any more data and mess up the calculations
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
            curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
          } else {
            console.log("is closer to bottom of square");
            let yOff = curOffset - Math.floor(absBot);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
            console.log("&& yOff is " + yOff);
            //dL.drawCircle(s.x,s.y - yOff)
            curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
              }
      break;
      case 2:
      case 3:
      console.log("Grid Scale | Drawing Layer | Pointy Hex Adjust Y")
      let hexPValues = dL.getPointyHexPoints(s.x,s.y)
      //console.log(hexPValues);
      //console.log(s.x + " " + s.y);
      let prefSide = dL.findTheBestSide(hexPValues[0],hexPValues[8],hexPValues[2],s.x)
        if (prefSide == hexPValues[0]){
          dL.setDatYOffset(hexPValues[15],hexPValues[17],s)
        }
        else if (prefSide == hexPValues[8]){
          dL.setDatYOffset(hexPValues[5],hexPValues[7],s)
        }
        else {
          dL.setDatYOffset(hexPValues[11],hexPValues[13],s)
        }



      break;
      case 4:
      case 5:
        console.log("Grid Scale | Drawing Layer | Flat Hex Adjust Y")
        let hexValues = dL.getFlatHexPoints(s.x,s.y)
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
          curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
        } else {
          console.log("is closer to Bottom of hex");
          let yOff = curOffset - Math.floor(absB);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
          console.log("&& xOff is " + yOff);
          //let potat = hexValues[7] + yOff;
          //dL.drawCircle(hexValues[6], potat);
          curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
        }
      break;
      default:
      console.log("to pass the butter")
      }




    }

    setDatYOffset(p1,p2,s){
      let curScene = game.scenes.get(canvas.scene.data._id);
      let curGrid = canvas.grid.size;
      let curOffset = curScene.data.shiftY;
      let hexPValues = dL.getPointyHexPoints(s.x,s.y)
      let absPT = Math.abs(p1 - s.y);
      let absPB = Math.abs(p2 - s.y);
      //something is fucky here.
      let magicNumber = dL.findTheBest(p1,p2,s.y,curGrid);
      //console.log("Grid Scale | Drawing Layer | ****MAGICNUMBER****")
      //console.log(magicNumber);
      let center = canvas.grid.getCenter(s.x,s.y);
      //dL.drawCircle(center[0],center[1],"center");
      let updatedPoint = center[1] + magicNumber[1]
      //dL.drawCircle(center[0],updatedPoint,"endpoint");
      //dL.drawCircle(center[0],updatedPoint + magicNumber[0]);
      let yOff = curOffset + magicNumber[0];
      //setTimeout(function(){  curScene.update({shiftY: yOff}); },3000);
      curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
    }

    setDatXOffset(p1,p2,s){
      let curScene = game.scenes.get(canvas.scene.data._id);
      let curGrid = canvas.grid.size;
      let curOffset = curScene.data.shiftX;
      let hexPValues = dL.getFlatHexPoints(s.x,s.y)
      let absPT = Math.abs(p1 - s.x);
      let absPB = Math.abs(p2 - s.x);
      //console.log(absPT)
      //console.log(absPB)
      //something is fucky here.
      let magicNumber = dL.findTheBest(p1,p2,s.x,curGrid);
      //console.log("Grid Scale | Drawing Layer | ****MAGICNUMBER****")
      //console.log(magicNumber);
      let center = canvas.grid.getCenter(s.x,s.y);
      //dL.drawCircle(center[0],center[1],"center");
      let updatedPoint = center[0] + magicNumber[1]
      //dL.drawCircle(updatedPoint,center[1],"endpoint");
      //dL.drawCircle(updatedPoint + magicNumber[0], center[1]);
      let xOff = curOffset + magicNumber[0];
      //setTimeout(function(){  curScene.update({shiftX: xOff}); },3000);
      curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
    }



    resetGrid(){      //this function resets the grid to a 100px grid with 0 X/Y Offset, also sets the grid color to pink to make it easier to work with.
      dL._removeListeners();
      console.log("Grid Scale | Drawing Layer | ^^^^^ Resetting Grid ^^^^^");
      let curScene = game.scenes.get(canvas.scene.data._id);
      //console.log(curScene);
      curScene.update({grid: 100})
      curScene.update({shiftX: 0})
      curScene.update({shiftY: 0})
      curScene.update({gridColor: "#ff09c1"})
      curScene.update({gridAlpha: 1})
    }

      configureSquare(i,e,t){     //this function sets up the data for drawing the square when given mouse position. Enforces drawing a square, not a rectange.
        var width = Math.abs(i.x - e.x) * (i.x < e.x ? -1 : 1);
        var height = Math.abs(width) * (i.y < e.y ? -1 : 1);
        let s = [i.x > e.x ? e.x : i.x, i.y > e.y ? e.y : i.y, Math.abs(width), Math.abs(height)];
        //console.log("Grid Scale | Draw Layer | this is drawBox s")
        //console.log(s)
        dL.drawBox(s), t.data.coords = s, dL.dataCoords = s;
      }


    configureRectangle(e,i,t) {     // this function sets up the data for drawing a rectange when given mouse position. **Not used but may be needed later **
      let s = [i.x > e.x ? e.x : i.x, i.y > e.y ? e.y : i.y, Math.abs(i.x - e.x), Math.abs(i.y - e.y)];
      dL.drawBox(s), t.data.coords = s;
    }

    drawBox(t) {      //this draws the box requested using pixi graphics. first it clears the previous square then sets fill color and line style then draws the new one from the given coords.
    //console.log(dL.drawChild, "this is drawbox drawchild before")
    //console.log(t);
      this.drawChild.clear().beginFill(0x208000, 0.3).lineStyle(1, 0x66ff33, .9, 0).drawRect(...t);
      if ( t[3] > 50 ) {
      this.textSample.visible = true;
      this.textSample.x = t[0]+(t[3]/2);
      this.textSample.y = t[1]+(t[3]/2);
      this.textSample.text  =  Math.floor(t[3]);
    } else {this.textSample.visible = false;}
      //this.drawText.text("what how do?",{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
      //this.drawChild.lineStyle(3, 0xFF9829, 0.9).drawRect(...t);
    //console.log(dL.drawChild, "this is drawbox drawchild after")
    }

      setGrid(s) {      //this will set the grid square size then depending on the tool selected may adjust the offset in X/Y
        let adjY1 = canvas.dimensions.height;     //needed for adjustment of x/y later.
        let adjX1 = canvas.dimensions.width;     //needed for adjustment of x/y later.
        dL.preGridScale = [adjX1, adjY1];           //needed for adjustment of x/y later.
        let curScene = game.scenes.get(canvas.scene.data._id);     //This gets the scene object for the current scene by asking the canvas for the current scenes ID then reutrning that to the game.scenes.get
        let gridPix = Math.floor(dL.dataCoords[3]);      //getting the grid pixel size
        //console.log("Grid Scale | Drawing Layer | ^^^^^ Current Tool ^^^^^")
        //console.log(dL.currentTool);
        if (dL.currentTool == "3x3") {gridPix = gridPix / 3};
        if (gridPix >= 50) {
        curScene.update({grid: gridPix});      //this will update the current scene, this time it is the grid square size
        ui.notifications.info("This is the Grid Size : " + gridPix);      //notify user of offset
      } else {
        ui.notifications.info("Grid Size must be 50px  or greater");
        this.drawChild.clear();
      }
        dL._removeListeners();
        //dL.drawChild = null;
        if (dL.currentTool == "aGrid") {    //This is here for future work on an automatic scale/offset function. When I can get it to work right. It scales properly but offsets are wrong.
          setTimeout(function(){dL.autoAdjustOffset(gridPix, curScene, adjY1, adjX1); },1000);     //after 1.5 second call setYOff
        }
        dL.currentTool = null;
      }

      /*autoAdjustOffset (gridPix, curScene) {    //this is called when automatic adjustment of X/Y with grid square is selected.
        let adjY2 = canvas.dimensions.height;     //needed for adjustment of x/y
        let adjX2 = canvas.dimensions.width;     //needed for adjustment of x/y
        console.log(adjX2 + "" + adjY2);
        console.log("***** This is preGridScale")
        console.log(dL.preGridScale);
        let adjustedY = gridPix - Math.abs(dL.preGridScale[1] - adjY2)
        let adjustedX = gridPix - Math.abs(dL.preGridScale[0] - adjX2)
        console.log("this is adjusted Y " + adjustedY);
        console.log("this is adjusted X " + adjustedX);
        curScene.update({shiftX: adjustedX});      //this will update the current scene, this time it is the xOffset
        curScene.update({shiftY: adjustedY});      //this will update the current scene, this time it is the yOffset
      }*/

      autoAdjustOffset (gridPix, curScene,adjY1, adjX1) {    //this is called when automatic adjustment of X/Y with grid square is selected.
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
        console.log("this is the original X coord " + dL.testVar1.x);
        console.log("this is the original Y coord " + dL.testVar1.y);
        adjustedX = dL.testVar1.x - adjustedX;
        adjustedY = dL.testVar1.y - adjustedY;
        console.log("this is the difference in the X " + adjustedX);
        console.log("this is the difference in the Y " + adjustedY);
        let varPass = {x:adjustedX,y:adjustedY};
        //dL.newsetXOff(varPass);
        dL.newsetYOff(varPass);
      }

      setDrawChild(){     //this sets up drawChild for drawing the square.
        this.drawChild = canvas.controls.addChild(new PIXI.Graphics());
        this.drawText =  canvas.controls.addChild(new PIXI.Text());
        //this.drawChildBackup = Object.freeze(this.drawChild);
    //console.log(dL.drawChild, "this is drawbox drawchild at setup")
        //dL.drawChild = canvas.stage.addChild(new PIXI.Graphics());
      }


      configurePoly(i,e,t){     //this function sets up the data for drawing the square when given mouse position. Enforces drawing a square, not a rectange.
        let sombs = canvas.scene.data.gridType
        //console.log(sombs);
        if (sombs > 1 && sombs < 4){
          var height = Math.abs(i.y - e.y) * (i.y < e.y ? -1 : 1);
          var width = Math.abs(height) * (i.x < e.x ? -1 : 1);
          let s = [i.y > e.y ? e.y : i.y, i.x > e.x ? e.x : i.x, Math.abs(height), Math.abs(width)];
          //console.log("Grid Scale | Draw Layer | this is configurePoly")
          //console.log(s)
          dL.pointyPotato(s[1],s[0],s[2],s[3])
          t.data.coords = s, dL.dataCoords = s;
        }
        else {
          var width = Math.abs(i.x - e.x) * (i.x < e.x ? -1 : 1);
          var height = Math.abs(width) * (i.y < e.y ? -1 : 1);
          let s = [i.x > e.x ? e.x : i.x, i.y > e.y ? e.y : i.y, Math.abs(width), Math.abs(height)];
          //console.log("Grid Scale | Draw Layer | this is configurePoly")
          //console.log(s)
          dL.flatPotato(s[0],s[1],s[2],s[3])
         t.data.coords = s, dL.dataCoords = s;
        }
      }

      flatPotato(x,y,w,h){   // THis is the setup for a horizontal (flat) hex grid. Found the equations here (https://rechneronline.de/pi/hexagon.php)
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
        dL.drawChild.clear().beginFill(0x478a94, 0.3).lineStyle(1, 0x7deeff, .9, 0).drawPolygon(whattf);
        if ( w > 50 ) {
        dL.textSample.visible = true;
        dL.textSample.x = x + (w/2);
        dL.textSample.y = y;
        dL.textSample.text  =  Math.floor(w);
      } else {dL.textSample.visible = false;}
      //This entire thing is not efficient. But it seems to work.
    }


    pointyPotato(x,y,w,h){  // THis is the setup for a vertical (pointy) hex grid.
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
      dL.drawChild.clear().beginFill(0x478a94, 0.3).lineStyle(1, 0x7deeff, .9, 0).drawPolygon(whattf);
      if ( h > 50 ) {
      dL.textSample.visible = true;
      dL.textSample.x = x;
      dL.textSample.y = y + (h/2);
      dL.textSample.text  =  Math.floor(h);
    } else {dL.textSample.visible = false;}
  }

      setHexGrid(s) {      //this will set the grid square size then depending on the tool selected may adjust the offset in X/Y
        let adjY1 = canvas.dimensions.height;     //needed for adjustment of x/y later.
        let adjX1 = canvas.dimensions.width;     //needed for adjustment of x/y later.
        dL.preGridScale = [adjX1, adjY1];           //needed for adjustment of x/y later.
        let curScene = game.scenes.get(canvas.scene.data._id);     //This gets the scene object for the current scene by asking the canvas for the current scenes ID then reutrning that to the game.scenes.get
        let gridPix = Math.floor(dL.dataCoords[3]);      //getting the grid pixel size
        //console.log("Grid Scale | Drawing Layer | ^^^^^ GridPix ^^^^^")
        //console.log(gridPix);
        if (gridPix >= 50) {
        curScene.update({grid: gridPix});      //this will update the current scene, this time it is the grid square size
        ui.notifications.info("This is the Grid Size : " + gridPix);      //notify user of offset
      } else {
        ui.notifications.info("Grid Size must be 50px  or greater");
        this.drawChild.clear();
      }
        dL._removeListeners();
        dL.currentTool = null;
      }

      drawCircle(x,y,txt){
      dL.drawChild.beginFill(0xe74c3c, 0.3).lineStyle(1, 0x66ff33, .9, 0).drawCircle(x,y,20);
      dL.drawChild.beginFill(0xf1c40f, 0.3).lineStyle(1, 0x66ff33, .9, 0).drawCircle(x,y,5);
      this.textSample.visible = true;
      this.textSample.x = x;
      this.textSample.y = y + 20;
      this.textSample.text  = txt;
      }

      getFlatHexPoints(x,y){ //this is used to get the side points for a hexagon based off the returned center point so that offset can be determined.
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

      getPointyHexPoints(x,y){ //this is used to get the side points for a hexagon based off the returned center point so that offset can be determined.
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


      findTheBestSide(p1,p2,p3,cP){
        //console.log("Grid Scale | Drawing Layer | ^^^^^ Choose Best side ^^^^^");
        //console.log(p1 + " " + p2 + " " + p3 + " " + cP)
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

      newHookTest(){
      Hooks.on('getSceneControlButtons', controls => {
        //console.log(controls);
        controls.push(dL.newButtons);
        //console.log(controls);
        dL.setDrawChild();
        dL.drawSomeText();
      });
    }

}     //ends extendedCanvas class


//// Last bit to render and set function definitos

let dL = new DrawingLayer();

dL.setButtons();
dL.newHookTest();

console.log("Grid Scale | ** Finished Loading **");
