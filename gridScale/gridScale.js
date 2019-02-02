/**
 * @author UberV
 * @version 0.0.2
 */

 class GridControls extends Application {
   constructor(t) {
     super(t),this.toolBtnIds = [["gs-closeToolbar", false],["gs-size", false],["gs-adjX", false],["gs-adjY", false]], this.tData = null,this.activeControl = "", this.controls = this.configure()
   console.log("**** Entered Grid Controls ****");
   console.log(this.controls);
   console.log(this.toolBtnIds);
   console.log("***above is the tool ids")


   }
   static get defaultOptions() {
     const t = super.defaultOptions;
     console.log("##### This is the super.defaultoptions")
     console.log(t);
     return t.id = "gridCont", t.template = "public/modules/gridScale/gridScale.html", t.popOut = !1, t
   }

   get activeTool() {
     return this.controls[this.activeControl].activeTool
   }
   get activeLayer() {
     return this.controls[this.activeControl].layer
   }
   configure() {
     const t = {
       gridC: {
         name: "Basic Grid Controls",
         icon: "fas fa-wrench",
         tools: {
           resetGrid: {
             name: "Reset Grid",
             icon: "fas fa-window-restore"
           },
           size: {
             name: "Set GridSquare Size",
             icon: "fas fa-compress"
           },
           adjX: {
             name: "Adjust X",
             icon: "fas fa-ruler-horizontal"
           },
           adjY: {
             name: "Adjust Y",
             icon: "fas fa-ruler-vertical"
           }
         },
         activeTool: "placeholder"
       }
     };
     return t;
   }
   getData() {
     const t = {
       active: canvas && canvas.ready,
       controls: this.controls
     };
     for (let [e, i] of Object.entries(t.controls)) {
       i.status = this.activeControl === e ? "active" : "";
       for (let [t, e] of Object.entries(i.tools)) e.status = i.activeTool === t ? "active" : ""
     }
     return t
   }

iDontKnowAnymore(f){
  console.log("called after clicking tool button");
  switch (f){
    case "resetGrid":
      console.log("&&^^Calling Grid Reset^^&&")
      eCanvas.resetGrid();
      //gC.closeButton();
      break;
    case "size":
      console.log("&&^^Calling Grid Size^^&&")
        eCanvas._addListeners();
      break;
    case "adjX":
      console.log("&&^^Calling Adjust X^^&&")
      eCanvas._addListeners();
      break;
    case "adjY":
      console.log("&&^^Calling Adjust Y^^&&");
      eCanvas._addListeners();
      break;
    default:
      console.log("&&^^NO expression matched^^&&")
  }
}

potatoFunction(t) {
  console.log("!!!!!!!!!!!! LOGGING POTATO !!!!!!!!!!!!!")
  console.log(t);
}

closeButton(){
  console.log("*THis is the close button*")
   let mbGrid = document.getElementById("gs-gridC");
   mbGrid.className = "grid-control ";
   //this.render();
}

   activateListeners(t) {
     //console.log("what the fuck is this")
     //console.log(t)
     gC.tData = t;
     //this gets called after updating the class maybe????
     t.find(".grid-control").click(t => {
       let f =  $(t.currentTarget).hasClass("grid-control active");
       console.log(f);
       let e = $(t.currentTarget).attr("data-control");
       //console.log("Wait is this e??");
       //console.log(e);
       //console.log(this.activeTool);
       //console.log(this.activeControl = e, this.render());
       this.activeControl !== e && (this.activeControl = e, this.render())
     }),
      t.find(".grid-tool").click(t => {
       let e = $(t.currentTarget).attr("data-tool"),
         i = this.controls[this.activeControl];
       //i.activeTool = e,console.log(e),console.log(i.tools[e]), i.tools[e].onClick instanceof Function && i.tools[e].onClick(), this.render()
       i.activeTool = e, gC.potatoFunction(e),gC.iDontKnowAnymore(e), this.render()
     })

   }
 }


class extendedCanvas extends Canvas {
  constructor() {
    super();
    console.log("********* Loading the Grid Scale Functions ***************");
    let isActive = false;     //a variable not used
    //this.select = null;     //copied from foundry.js no real idea what it does.
    let firstX = null;      //variable to store the first clicks x coord
    let firstY = null;      //variable to store the first clicks y coord
    let secondX = null;     //variable to store the second clicks x coord
    let secondY = null;     //variable to store the second clicks y coord
    // <================== Class Variable Definition ====================>
  }

  hookActorList(t) {
    Hooks.on('renderSceneControls', html => {     //Here we hook onto the program rendering the SceneControls html. (Should be noted dont really know what this is doing but it worked)
      let cL = document.getElementsByClassName("scene-control active").item(0).attributes.getNamedItem("data-control").value;     //this returns an HTMLobject that we then reference to at position 0. call the attributes (which is a named node map) then get the value of the named item (data-control)
      //console.log(cL);
      if (game.user.isGM) {
        gC.render(1);
      }
      //gC.enableToolbarListener();
      /*
      if (cL == "token" && game.user.isGM) {      //Checking if the scene-control active class item is = to token.
        let ul = document.getElementsByClassName("control-tools");      //getting the current control-tools HTMLobject
        //console.log(ul);
        const gridButton = $('<li class="control-tool " id="get_grid" title="Get Grid" data-tool="ggrid"><i class="fas fa-square"></i></li>');     //Here we define how the button will look, I copied the existing buttons but added an ID and changed the icon.
        let findCont = $('.control-tools:last-child');      //here we find the last child in this HTMLobject
        //console.log(findCont);
        //findCont.append(gridButton);     //here we append the lockButton to the last spot in the list of buttons
        let btnGrid = document.getElementById("get_grid")     //setting btnLock = to the elemtent of the buttons ID specified above (line 19)
        btnGrid.addEventListener("click", function() {      //adding event listener to btnGrid to check for clicks
            if (eCanvas.colorFlip("get_grid") == true) {    //Toggle button on (probably not the right way to do it) This calls a function that changes some CSS and returns true or false.
                eCanvas._addListeners();
           }      //ending toggle button if
        });     //ending addEventListener
      }     //Ending the if cl= statement
      //awwww ysssss
*/
    });     //Ending Hooks.on
  }     //ending hookActorList function

  colorFlip(btnID, t) {     //This function will flip the color of a button when passed the buttons id and return true or false if the buttons color is white (255 255 255)
    let btn = document.getElementById(btnID)      //setting btn = the btn given
    let btnColor = btn.style.color;     //getting the current color of the btn
    let btnOnColor = "#FFF";      //defining desired btn color
    let btnOnBorder = "1px solid #00ff1d";      //defining desired btn border color (green in this case)
    let btnOnBorderBottom = "1px solid #ff6400";      //defining desired btn color  !!ended up not using this?
    let btnOnBoxShadow = "0 0 10px #00ff38";      //defining desired btn boxs shadow color (green is this case)
        if (btnColor !== "rgb(255, 255, 255)") {      //this checks to see if btns color is not white and if so change the visuals and returns true
          btn.style.color = btnOnColor;     //setting btn color = to btnOnColor (white)
          btn.style.border = btnOnBorder;     //setting btn border color = to btnOnBorder (green)
          btn.style.boxShadow = btnOnBoxShadow;     //setting btn box border color = to btnOnBoxShadow (green)
          eCanvas.isActive = true;      //setting variable .isActive = true
          return true;      //returning true to the function that called this
      } else {      //this changes the visuals back to normal and returns false
        btn.style.color = "";     //blanking color
        btn.style.border = "";      //blanking color
        btn.style.boxShadow = "";     //blanking color
        eCanvas._removeListeners();     //removing the listeners for the canvas
        eCanvas.isActive = false;      //setting variable .isActive = false
        return false;     //returning false to the function that called this
   }      //ending else
 }     //end function colorFlip


// Should be noted from here on out it gets dicey. I copied functions from foundry.js because I dont know how to reference them so some things I dont entierly understand.

  getTopLeft(t, e) {      //from foundry.js = I think this reutrns the top left coords of the grid square that contains the given x/y coords.
    const i = canvas.dimensions.size;
    //console.log(i);
    return [t - t % i, e - e % i]
  }


  getNearestCenter(t, e) {       //from foundry.js = I think this reutrns the coords of the grid square center that contains the given x/y coords.
    const i = canvas.dimensions.size;
    return eCanvas.getTopLeft(t, e).map(t => t + i / 2)
  }

  _addListeners() {     //from foundry.js =  this adds the mousedown/mousemove/mouseup to the canvas calls their corresponding functions.
    console.log("**** Running add listeners ****");
    let t = canvas.stage;
    //console.log(t);
    t.on("mousedown", eCanvas._onMouseDown).on("mousemove", this._onMouseMove).on("mouseup", this._onMouseUp);
  }

  _removeListeners() {       //from foundry.js =  this removes the mousedown/mousemove/mouseup to the canvas and calls their corresponding functions.
    console.log("**** Running remove listeners ****");
    let t = canvas.stage;
    //console.log(t);
    t.off("mousedown", eCanvas._onMouseDown).off("mousemove", this._onMouseMove).off("mouseup", this._onMouseUp);
  }


  _onMouseDown(t) {     //from foundry.js =  Modified to call the getPositionData function on click
//console.log("Mouse Down?");
let tDI = t.data.getLocalPosition(this);
//eCanvas.getPositionData(tDI);
switch (gC.activeTool){
  case "resetGrid":
    console.log("&&^^Calling mouse Grid Reset^^&&")
    //console.log(tDI);
    break;
  case "size":
    console.log("&&^^Calling mouse Grid Size^^&&")
    //console.log(tDI);
    eCanvas.getPositionData(tDI);
    break;
  case "adjX":
    console.log("&&^^Calling mouse Adjust X^^&&")
    //console.log(tDI);
    eCanvas.setXOff(tDI)
    break;
  case "adjY":
    console.log("&&^^Calling mouse Adjust Y^^&&");
    //console.log(tDI);
    eCanvas.setYOff(tDI);
    break;
  default:
    console.log("&&^^NO mouse expression matched^^&&")
}
}

  _onMouseMove(t) {     //from foundry.js = Didnt use this but may in the future
//console.log("MouseMove?")
let e = t.data.initial;
let i = t.data.getLocalPosition(this);
if (t._selectState == 20) {
let s = [i.x > e.x ? e.x : i.x, i.y > e.y ? e.y : i.y, Math.abs(i.x - e.x), Math.abs(i.y - e.y)];
(20 === t._selectState || Math.min(s[2], s[3]) >= canvas.dimensions.size / 2) && (eCanvas.drawGreenSelect(s), t._selectState = 2, t.data.coords = s)
}
}

  _onMouseUp(t) {          //from foundry.js = Didnt use this but may in the future
//console.log("Mouse Up?")
let tDI = t.data.getLocalPosition(this);
}

setOffset (s) {
  let curScene = game.scenes.get(canvas.scene.data._id);
  let closeTopL = eCanvas.getTopLeft(eCanvas.firstX, eCanvas.firstY);     //Gets the top left coords for the nearest grid square based off the first set of clicks.
  let xOff = s - Math.floor(Math.max(eCanvas.firstX, closeTopL[0]) - Math.min(eCanvas.firstX, closeTopL[0]));     //determins the xOffset by subtracting the smaller of the x coords from the larger of the two then rounds down.
  let yOff = Math.floor(Math.max(eCanvas.firstY, closeTopL[1]) - Math.min(eCanvas.firstY, closeTopL[1]));     //determins the xOffset by subtracting the smaller of the x coords from the larger of the two then rounds down.
  ui.notifications.info("These are the X " + yOff + " and Y " + xOff + " Offset");     //This was how i was going to let the user know of the Grid Size along with X/Y offset before Atropos pointed out the scene API and scene.update
  curScene.update({shiftX: yOff});      //this will update the current scene, this time it is the xOffset
  curScene.update({shiftY: xOff});      //this will update the current scene, this time it is the yOffset
  eCanvas.firstX = eCanvas.firstY = eCanvas.secondX = eCanvas.secondY = null;     //nulling out the specified values.
}

  getPositionData (t,f) {     //This function will set the class X/Y variables then when the second set is filled will calculate the grid square size/X and Y offset, then set them for the current scene.
    if (eCanvas.firstX == null || eCanvas.firstY == null) {     //checking to see if the class firstX/Y variables are = null, if so then store the currently passed x/y canvas coords to their corresponding variables
      eCanvas.firstX = t.x, eCanvas.firstY = t.y;     //storing the variables
      //console.log(t.x);
      //console.log(t.y);
    } else {      //this executes if the first set of variables are not = to null
      eCanvas.secondX = t.x, eCanvas.secondY = t.y;     //record the second set of mouse down clicks in the corresponding variables
      eCanvas._removeListeners();
      //console.log("*** First Click X = " + eCanvas.firstX + "First Click Y = " + eCanvas.firstY + " | Second Click X = " + eCanvas.secondX + " Second Click Y = " + eCanvas.secondY);
      let xPix = Math.max(eCanvas.firstX, eCanvas.secondX) - Math.min(eCanvas.firstX, eCanvas.secondX);     // storing the number of X pixels between the two mouse clicks
      //console.log(xPix);
      let yPix = Math.max(eCanvas.firstY, eCanvas.secondY) - Math.min(eCanvas.firstY, eCanvas.secondY);     // storing the number of Y pixels between the two mouse clicks
      //console.log(yPix);
      let bigPix = Math.floor(Math.max(xPix, yPix));      //This will store the biggest number of pixels between the X or Y and use that as the Grid Size, may need to be changed in the future.
      //console.log(bigPix);
      let curScene = game.scenes.get(canvas.scene.data._id);      //This gets the scene object for the current scene by asking the canvas for the current scenes ID then reutrning that to the game.scenes.get
      //console.log(canvas.scene.data.grid);
      curScene.update({grid: bigPix});      //this will update the current scene, this time it is the grid square size
      //curScene._onUpdate({grid: bigPix});
      //console.log(canvas.scene.data.grid);
      let mPoint = {x:(eCanvas.firstX + eCanvas.secondX)/2,y:(eCanvas.firstY + eCanvas.secondY)/2};     //I was tring to determine the midpoint for some reason. May still be needed
      //console.log(mPoint);
      //eCanvas.colorFlip("get_grid");      //calling colorFlip to switch off/toggle the button
        eCanvas.firstX = eCanvas.firstY = eCanvas.secondX = eCanvas.secondY = null;     //nulling out the specified values.
      if (f == true) {
        var potato = {x: eCanvas.firstX,y: eCanvas.firstY};
        setTimeout(function(){eCanvas.setXOff(potato); },1000);
        setTimeout(function(){eCanvas.setYOff(potato); },1500);
      }
    }     //ends else
  }     //ends getPositionData function

setXOff(s) {
  eCanvas._removeListeners();
  //console.log("%%%%%%This is S")
  console.log(s)
  let curScene = game.scenes.get(canvas.scene.data._id);
  let curOffset = curScene.data.shiftX;
  console.log("The current X offset is = 0");
  let closeTopL = eCanvas.getTopLeft(s.x, s.y);
  //console.log("%%%%%%This is Close top left of clicked square.")
  //console.log(closeTopL)
  let xOff = curOffset + Math.floor(Math.max(s.x, closeTopL[0]) - Math.min(s.x, closeTopL[0]));
  ui.notifications.info("This is the X offset : " + xOff);
  curScene.update({shiftX: xOff});      //this will update the current scene, this time it is the xOffset
}

setYOff(s) {
  //console.log("%%%%%%This is S")
  //console.log(s)
  eCanvas._removeListeners();
  let curScene = game.scenes.get(canvas.scene.data._id);
  console.log(curScene);
  let curOffset = curScene.data.shiftY;
  console.log("The current Y offset is = 0");
  let closeTopL = eCanvas.getTopLeft(s.x, s.y);
  //console.log("%%%%%%This is Close top left of clicked square.")
  //console.log(closeTopL)
  let yOff = curOffset + Math.floor(Math.max(s.y, closeTopL[1]) - Math.min(s.y, closeTopL[1]));
  ui.notifications.info("This is the Y offset : " + yOff);
  curScene.update({shiftY: yOff});      //this will update the current scene, this time it is the xOffset
}

resetGrid(){
  eCanvas._removeListeners();
  console.log("^^^^^ Resetting Grid ^^^^^");
  let curScene = game.scenes.get(canvas.scene.data._id);
  curScene.update({grid: 100})
  curScene.update({shiftX: 0})
  curScene.update({shiftY: 0})
  curScene.update({gridColor: "#ff09c1"})
}


}     //ends extendedCanvas class

let eCanvas = new extendedCanvas();
let gC = new GridControls()
console.log(gC);
//gC.enableToolbarListener();
//gC.activateListeners();
eCanvas.hookActorList();
console.log("##### Finished loading the Grid Module #####");
