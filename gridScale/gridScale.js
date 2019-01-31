/**
 * @author UberV
 * @version 0.0.1
 */

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
      if (cL == "token") {      //Checking if the scene-control active class item is = to token.
        let ul = document.getElementsByClassName("control-tools");      //getting the current control-tools HTMLobject
        const gridButton = $('<li class="control-tool " id="get_grid" title="Get Grid" data-tool="ggrid"><i class="fas fa-square"></i></li>');     //Here we define how the button will look, I copied the existing buttons but added an ID and changed the icon.
        let findCont = $('.control-tools:last-child');      //here we find the last child in this HTMLobject
        //console.log(findCont);
        findCont.append(gridButton);     //here we append the lockButton to the last spot in the list of buttons
        let btnGrid = document.getElementById("get_grid")     //setting btnLock = to the elemtent of the buttons ID specified above (line 19)
        btnGrid.addEventListener("click", function() {      //adding event listener to btnGrid to check for clicks
            if (eCanvas.colorFlip("get_grid") == true) {    //Toggle button on (probably not the right way to do it) This calls a function that changes some CSS and returns true or false.
                eCanvas._addListeners();
           }      //ending toggle button if
        });     //ending addEventListener
      }     //Ending the if cl= statement
      //awwww ysssss
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
eCanvas.getPositionData(tDI);
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

  getPositionData (t) {     //This function will set the class X/Y variables then when the second set is filled will calculate the grid square size/X and Y offset, then set them for the current scene.
    if (eCanvas.firstX == null || eCanvas.firstY == null) {     //checking to see if the class firstX/Y variables are = null, if so then store the currently passed x/y canvas coords to their corresponding variables
      eCanvas.firstX = t.x, eCanvas.firstY = t.y;     //storing the variables
      //console.log(t.x);
      //console.log(t.y);
    } else {      //this executes if the first set of variables are not = to null
      eCanvas.secondX = t.x, eCanvas.secondY = t.y;     //record the second set of mouse down clicks in the corresponding variables
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
      curScene._onUpdate({grid: bigPix});
      //console.log(canvas.scene.data.grid);
      let mPoint = {x:(eCanvas.firstX + eCanvas.secondX)/2,y:(eCanvas.firstY + eCanvas.secondY)/2};     //I was tring to determine the midpoint for some reason. May still be needed
      //console.log(mPoint);
      eCanvas.colorFlip("get_grid");      //calling colorFlip to switch off/toggle the button
      setTimeout(function(){eCanvas.setOffset(bigPix); },1000);
    }     //ends else
  }     //ends getPositionData function




}     //ends extendedCanvas class

let eCanvas = new extendedCanvas();
eCanvas.hookActorList();
console.log("##### Finished loading the Grid Module #####");
