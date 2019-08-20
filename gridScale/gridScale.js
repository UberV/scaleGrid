/**
 * @author UberV
 * @version 0.0.6
 */

 class CustomButtons extends Application {     //This class defines the new set of buttons that we are using for this module. Pulled from foundry.js and modified to the best of my understanding.
   constructor(t) {
     super(t),this.toolBtnIds = [["gs-closeToolbar", false],["gs-size", false],["gs-adjX", false],["gs-adjY", false]], this.iList = null,this.prevControl = null; this.tData = null, this.currentTool = null, this.activeControl = null, this.needsDrawn = false     //Added in a class wide variable for the names of the button ids but ended up not using them. May need it in the future so leaving it in.
   this.configureInitial();
   this.controls = this.configure();
   console.log("Grid Scale | **** Custom Buttons Loaded ****");
   //console.log(this.controls);
   }
   static get defaultOptions() {      //Pulled from foundry.js - Dont fully know what it does but it allows us to define our HTML template and the ID for the HTML OL.
     const t = super.defaultOptions;
     return t.id = "gridCont", t.template = "public/modules/gridScale/gridScale.html", t.popOut = !1, t     //Dont know what t.popout means.
   }

   get activeTool() {     //returns the active control (in thise case there is only one control called gridC.) then the active tool (one of the four specified below)
     return this.controls[this.activeControl].activeTool
   }
   get activeLayer() {      //used to return the layer that the tool should work on. This is a left over from foundry.js that I did not want to remove incase it broke something.
     return this.controls[this.activeControl].layer
   }

   configure(){
     let t = this.iList;
     //console.log("Grid Scale | $$$$ THis is this.iList");
     //console.log(t);
     return t;
   };

 configureInitial(){
  let t = {};
 this.iList = t;
}

   getData() {      //No idea what this does, never messed with it.
     const t = {
       active: canvas && canvas.ready,
       controls: this.controls
     };
     for (let [e, i] of Object.entries(t.controls)) {
       i.status = this.activeControl === e ? "active" : "";
       for (let [t, e] of Object.entries(i.tools)) e.status = i.activeTool === t ? "active" : ""
     }
     return t
   }      //end no idea


potatoFunction(t) {     //needed logging function, got potato
  console.log("Grid Scale | !!!!!!!!!!!! LOGGING POTATO !!!!!!!!!!!!!")
  //  alert("!!!!POTATO!!!!")
  //console.log(t);
}

toggleSidebar() {      //meant to toggle visibility of toolbar but could not get it to work right. Will try again later.
  let arse = document.getElementById("sidebar");
  if (arse.style.display === "none") {
  arse.style.display = "block";
} else {
  arse.style.display = "none";
}
}

modifyiList(){
    let t = cB.iList
    t["closeToolbar"] = {};
    t["closeToolbar"]["name"] = "Close Button";
    t["closeToolbar"]["icon"] = "fas fa-hand-point-left"
    t["closeToolbar"]["tools"] = {};
    /*
    t["potato"] = {};
    t["potato"]["name"] = "I AM POTATO";
    t["potato"]["icon"] = "fas fa-expand"
    t["potato"]["tools"] = {};
    t["potato"]["tools"]["test"] = {};
    t["potato"]["tools"]["test"]["name"] = "TestingButton";
    t["potato"]["tools"]["test"]["icon"] = "fas fa-hand-rock";
    t["potato"]["tools"]["test"]["prog"] = cB.potatoFunction     //dont need to user () after function for this?
    t["potato"]["activeTool"] = ""
    t["potato"]["tools"]["toggle"] = {};
    t["potato"]["tools"]["toggle"]["name"] = "Toggle Sidebar";
    t["potato"]["tools"]["toggle"]["icon"] = "fas fa-long-arrow-alt-left";
    t["potato"]["tools"]["toggle"]["prog"] = cB.toggleSidebar     //dont need to user () after function for this?
    t["potato"]["activeTool"] = ""
    */
    //console.log("Grid Scale | this is modified T ^^^^^")
    //console.log(t);
    this.configure();
    cB.render();
  }


   activateListeners(t) {     //this is some magical stuff, I think this gets called after this gets rendered but dont really know. Ultimatly this is what controls the buttons and what they do.
     cB.tData = t;
     let potato = $(".grid-control active");
     potato.toggleClass("grid-control ");
     //console.log("Grid Scale | ***this is activateListeners T,f,e, thisActiveControl")
     //console.log(t)
     //this gets called after updating the class maybe????
     t.find(".grid-control").click(t => {
       let f =  $(t.currentTarget).hasClass("grid-control active");
       //console.log(this.controls);
       let e = $(t.currentTarget).attr("data-control");
       let myT = $(t.currentTarget);
       this.activeControl = e;
       if (myT.hasClass("grid-control active") == true){
         console.log("Grid Scale | This is already active, deactivating")
         $(t.currentTarget).attr("class", "grid-control ")
       }else{
         this.prevControl !== null && (this.prevControl.attr("class", "grid-control "));
       $(t.currentTarget).toggleClass("grid-control active");
       this.prevControl = $(t.currentTarget);
     }
     }) ,
      t.find(".grid-tool").click(t => {     //returns the grid-tool that has been clicked.
       let e = $(t.currentTarget).attr("data-tool"),      //jquery i think. Returns the current data-tools target
         i = this.controls[this.activeControl];
      i.activeTool = e, this.currentTool = e  //modified end statement which calls potato function and swtich to determine what to do. Dont know what exactly .render does.
       console.log("Grid Scale | Here is the current control and tool = "+ this.activeControl + " | " + this.currentTool);
       //console.log(this.controls);
       //console.log(this.controls[this.activeControl]["tools"][this.currentTool]["prog"]())
       this.controls[this.activeControl]["tools"][this.currentTool]["prog"]();
     })

   }
 }
// End Custom Menu

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
    let testVar1 = null;  //testing variable
    let testVal2 = null;  //testing variable
    let testVal3 = null;  //testing variable
    // <================== Class Variable Definition ====================>
  }

  defineButtons(){
    let t = cB.iList
    //console.log("Grid Scale | Drawing Layer | this is current iList")
    //console.log(t);
    t["gridC"] = {};
    t["gridC"]["name"] = "Basic Grid Controls";
    t["gridC"]["icon"] = "fas fa-wrench"
    t["gridC"]["tools"] = {};
    t["gridC"]["tools"]["resetGrid"] = {};
    t["gridC"]["tools"]["resetGrid"]["name"] = "Reset Grid";
    t["gridC"]["tools"]["resetGrid"]["icon"] = "fas fa-window-restore";
    t["gridC"]["tools"]["resetGrid"]["prog"] = dL.resetGrid;    //dont need to user () after function for this?
    /*
    t["gridC"]["tools"]["aGrid"] = {};
    t["gridC"]["tools"]["aGrid"]["name"] = "Auto Draw Grid";
    t["gridC"]["tools"]["aGrid"]["icon"] = "fas fa-square";
    t["gridC"]["tools"]["aGrid"]["prog"] = dL.callAGrid;    //dont need to user () after function for this?
    */
    t["gridC"]["tools"]["size"] = {};
    t["gridC"]["tools"]["size"]["name"] = "Draw Grid";
    t["gridC"]["tools"]["size"]["icon"] = "fas fa-compress";
    t["gridC"]["tools"]["size"]["prog"] = dL.callAGrid;     //dont need to user () after function for this?
    t["gridC"]["tools"]["adjX"] = {};
    t["gridC"]["tools"]["adjX"]["name"] = "Adjust X";
    t["gridC"]["tools"]["adjX"]["icon"] = "fas fa-ruler-horizontal";
    t["gridC"]["tools"]["adjX"]["prog"] = dL._addListeners;     //dont need to user () after function for this?
    t["gridC"]["tools"]["adjY"] = {};
    t["gridC"]["tools"]["adjY"]["name"] = "Adjust Y";
    t["gridC"]["tools"]["adjY"]["icon"] = "fas fa-ruler-vertical";
    t["gridC"]["tools"]["adjY"]["prog"] = dL._addListeners;   //dont need to user () after function for this?
    t["gridC"]["activeTool"] = ""
    /*
    t["testing"] = {};
    t["testing"]["name"] = "Testing Grid Controls";
    t["testing"]["icon"] = "fas fa-bullseye"
    t["testing"]["tools"] = {};
    t["testing"]["tools"]["adjXT"] = {};
    t["testing"]["tools"]["adjXT"]["name"] = "Adjust X";
    t["testing"]["tools"]["adjXT"]["icon"] = "fas fa-ruler-horizontal";
    t["testing"]["tools"]["adjXT"]["prog"] = dL._addListeners;     //dont need to user () after function for this?
    t["testing"]["tools"]["adjYT"] = {};
    t["testing"]["tools"]["adjYT"]["name"] = "Adjust Y";
    t["testing"]["tools"]["adjYT"]["icon"] = "fas fa-ruler-vertical";
    t["testing"]["tools"]["adjYT"]["prog"] = dL._addListeners;   //dont need to user () after function for this?
    t["testing"]["tools"]["mkTXT"] = {};
    t["testing"]["tools"]["mkTXT"]["name"] = "Add Text";
    t["testing"]["tools"]["mkTXT"]["icon"] = "fas fa-ruler-vertical";
    t["testing"]["tools"]["mkTXT"]["prog"] = dL.drawSomeText;   //dont need to user () after function for this?
    t["testing"]["tools"]["rmTXT"] = {};
    t["testing"]["tools"]["rmTXT"]["name"] = "Remove Text";
    t["testing"]["tools"]["rmTXT"]["icon"] = "fas fa-ruler-vertical";
    t["testing"]["tools"]["rmTXT"]["prog"] = dL.removeSomeText;   //dont need to user () after function for this?
    t["testing"]["activeTool"] = ""
    */
    console.log("Grid Scale | Drawing Layer | Menu Buttons Updated")
    //console.log(t);
    cB.configure();
    //this.drawChild = this.drawChildBackup = canvas.grid.addChild(new PIXI.Graphics());
    //cB.render();
  }

    // Should be noted from here on out it gets dicey. I copied functions from foundry.js because I dont know how to reference them so some things I dont entierly understand.

      getTopLeft(t, e) {      //from foundry.js = I think this reutrns the top left coords of the grid square that contains the given x/y coords.
        const i = canvas.dimensions.size;
        //console.log(i + "" + t + "" + e);
        let x = t - t % i
        //console.log(x);
        let y = e - e % i
        //console.log(y);
        return [x,y]
      }

      drawSomeText(t,s){    // This function sets up  the  Pixi text  container and styling.
        let style = new PIXI.TextStyle({      //this  here defines the style of  the text being displayed.  Can be changed later  at runtime if needed.
              dropShadow: true,
              dropShadowDistance: 1,
              fill: "#4bf02a",
              fontSize: 40,
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
    //console.log("Mouse Down?");
    let tDI = t.data.getLocalPosition(this);
    t.data.initial = tDI;
    switch (cB.currentTool){     //this switch statement checks the value of the active tool from gridControls then picks the right function on mouse click.
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
      case "aGrid":     //this switch is used to add the mousemove listener for drawing the grid square
        dL._addMoveListener();
        break;
        case "test2":     //test buttons case. move along.
          console.log("&&^^Calling Mouse Testing^^&&");
          console.log(tDI.x + "" + tDI.y);
          console.log(dL.getTopLeft(tDI.x,tDI.y));
          dL._removeListeners();
          break;
      default:
        console.log(cB.currentTool)
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
    let e = t.data.initial;
    let i = t.data.getLocalPosition(this);
    if (cB.activeTool == "aGrid" || cB.activeTool == "size" && dL.needsDrawn == true) {
    dL.configureSquare(e,i,t);
    }
    }

      _onMouseUp(t) {          //Used after finishing drawing the square.
    //console.log("Mouse Up?")
    let tDI = t.data.getLocalPosition(this);
    if (dL.needsDrawn == true) {      //this triggers after finishing drawing the square. Resets some things, clears the square and switches back on the game listeners.
        //dL.needsDrawn = false, cB.currentTool = null, dL.drawChild.clear(), dL.enableGameListeners() ,dL.setGrid();
              dL.needsDrawn = false, cB.currentTool = null, dL.enableGameListeners() ,dL.setGrid();
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

    setXOff(s) {      //this function takes in a mouse click then calls getTopLeft to find the top left corner of the grid square that the click was in then gets the offset in a positive number.
      dL._removeListeners();     //removing listeners to so as to not get any more data and mess up the calculations
      //console.log("%%%%%%This is S")
      //console.log(s)
      let curScene = game.scenes.get(canvas.scene.data._id);      //getting current scenes ID from the canvas
      let curOffset = curScene.data.shiftX;     //getting the current xOffset incase it is not = 0 we need to add out new offset number to it.
      //console.log("The current X offset is = " + curOffset);
      let closeTopL = dL.getTopLeft(s.x, s.y);     //getting X/Y of grid corner
      //console.log("%%%%%%This is Close top left of clicked square.")
      //console.log(closeTopL)
      let xOff = curOffset + Math.floor(Math.max(s.x, closeTopL[0]) - Math.min(s.x, closeTopL[0]));     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
      ui.notifications.info("This is the X offset : " + xOff);      //notify user of offset.
      curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
    }

    setYOff(s) {      //this function takes in a mouse click then calls getTopLeft to find the top left corner of the grid square that the click was in then gets the offset in a positive number.
      //console.log("%%%%%%This is S")
      //console.log(s)
      dL._removeListeners();     //removing listeners to so as to not get any more data and mess up the calculations
      let curScene = game.scenes.get(canvas.scene.data._id);      //getting current scenes ID from the canvas
      //console.log(curScene);
      let curOffset = curScene.data.shiftY;     //getting the current xOffset incase it is not = 0 we need to add out new offset number to it.
      //console.log("The current Y offset is = " + curOffset);
      let closeTopL = dL.getTopLeft(s.x, s.y);     //getting X/Y of grid corner
      //console.log("%%%%%%This is Close top left of clicked square.")
      //console.log(closeTopL)
      let yOff = curOffset + Math.floor(Math.max(s.y, closeTopL[1]) - Math.min(s.y, closeTopL[1]));    //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
      ui.notifications.info("This is the Y offset : " + yOff);      //notify user of offset.
      curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
    }

    newsetXOff(s) {      //this function takes in a mouse click then calls getTopLeft to find the top left corner of the grid square that the click was in then gets the offset in a positive number.
                        // Added the logic so it wont constantly shift in the positive direction. Instead finds the closest side the clicked point and will move the grid in either + or - to get there.

      dL._removeListeners();     //removing listeners to so as to not get any more data and mess up the calculations
      //console.log("%%%%%%This is S")
      //console.log(s)
      let curScene = game.scenes.get(canvas.scene.data._id);      //getting current scenes ID from the canvas
      let curGrid = curScene.data.grid;      //getting current grid size from the canvas
      let curOffset = curScene.data.shiftX;     //getting the current xOffset incase it is not = 0 we need to add out new offset number to it.
      //console.log("The current X offset is = " + curOffset);
      let closeTopL = dL.getTopLeft(s.x, s.y);     //getting X/Y of grid corner
      let oppX = closeTopL[0] + curGrid;
      let sG = s.x + curGrid;
      let absTopL = Math.abs(closeTopL[0] - s.x);
      let absTopR = Math.abs(oppX - s.x);

      if (absTopL > absTopR) {
        let xOff = curOffset - Math.floor(absTopR);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
        //console.log("&& xOff is " + xOff);
        curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
      } else {
        //console.log("is closer to left side of square");
        let xOff = curOffset + Math.floor(absTopL);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
        //console.log("&& xOff is " + xOff);
        curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
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
      let closeTopL = dL.getTopLeft(s.x, s.y);     //getting X/Y of grid corner
      let oppY = closeTopL[1] + curGrid;
      let sG = s.y + curGrid;
      let absTop = Math.abs(closeTopL[1] - s.y);
      let absBot = Math.abs(oppY - s.y);

      if (absTop < absBot) {
        //console.log("Is closer to top of square");
        let yOff = curOffset + Math.floor(absTop);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
        //console.log("&& yOff is " + yOff);
        curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
      } else {
        //console.log("is closer to bottom of square");
        let yOff = curOffset - Math.floor(absBot);     //Maths = Find the bigger of the two xnumbers and subtract the smaller one. round down and then add it to the current scene offset
        //console.log("&& yOff is " + yOff);
        curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
      }

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
        let adjY1 = canvas.dimensions.paddingX;     //needed for adjustment of x/y later.
        let adjX1 = canvas.dimensions.width;     //needed for adjustment of x/y later.
        dL.preGridScale = [adjX1, adjY1];           //needed for adjustment of x/y later.
        let curScene = game.scenes.get(canvas.scene.data._id);     //This gets the scene object for the current scene by asking the canvas for the current scenes ID then reutrning that to the game.scenes.get
        let gridPix = Math.floor(dL.dataCoords[3]);      //getting the grid pixel size
        if (gridPix >= 50) {
        curScene.update({grid: gridPix});      //this will update the current scene, this time it is the grid square size
        ui.notifications.info("This is the Grid Size : " + gridPix);      //notify user of offset
      } else {
        ui.notifications.info("Grid Size must be 50px  or greater");
        this.drawChild.clear();
      }
        dL._removeListeners();
        //dL.drawChild = null;
        if (cB.activeTool == "aGrid") {    //This is here for future work on an automatic scale/offset function. When I can get it to work right. It scales properly but offsets are wrong.
          setTimeout(function(){dL.autoAdjustOffset(gridPix, curScene); },1000);     //after 1.5 second call setYOff
        }
      }

      autoAdjustOffset (gridPix, curScene) {    //this is called when automatic adjustment of X/Y with grid square is selected.
        let adjY2 = canvas.dimensions.paddingX;     //needed for adjustment of x/y
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
      }

      setDrawChild(){     //this sets up drawChild for drawing the square.
        this.drawChild = canvas.controls.addChild(new PIXI.Graphics());
        this.drawText =  canvas.controls.addChild(new PIXI.Text());
        //this.drawChildBackup = Object.freeze(this.drawChild);
    //console.log(dL.drawChild, "this is drawbox drawchild at setup")
        //dL.drawChild = canvas.stage.addChild(new PIXI.Graphics());
      }

      hookActorList(t) {
        Hooks.on('renderSceneControls', html => {     //Here we hook onto the program rendering the SceneControls html. (Should be noted dont really know what this is doing but it worked)
            this.drawChild = canvas.grid.addChild(new PIXI.Graphics());
            dL.drawSomeText();
            //this.drawText =  canvas.controls.addChild(new PIXI.Text());
            cB.render(1);     //once again, this is the .render function dont fully know what it does but it shows the buttons so good enough.
        });     //Ending Hooks.on
      }     //ending hookActorList function


}     //ends extendedCanvas class


//// Last bit to render and set function definitos

let cB = new CustomButtons();
let dL = new DrawingLayer();

cB.modifyiList();
//dL.defineButtons();
dL.defineButtons();
dL.hookActorList();

console.log("Grid Scale | ** Finished Loading **");
