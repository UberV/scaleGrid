## Grid Scaler

## !!Forgot to remove some logging, will be removed in next update!!

## Compatibility

Requires FVTT version 0.1.0 or higher

To install a module, follow these instructions:

1. Download the zip file
2. Extract the included folder to `public/modules` in your Foundry Virtual Tabletop installation folder.
3. Restart Foundry Virtual Tabletop. 

## How to Use the plugin

Once the plugin is loaded a new wrench icon will appear below the main tool selection.

Click on this icon and you will be presented with four more icons.

1. Reset Grid - This will set the grid to 100 pixel square with 0 X/Y offset. It also changes the grid color to pink to make it easier to see for setup.
https://i.imgur.com/db1G0kV.gif

2. Set GridSquare Size - This will set the grid square size when clicking twice in opposite corners of a grid square on your map. 
https://i.imgur.com/GBSEvBC.gif

3. Adjust X - When this is selected it will let you move the grid along the X plane. Clicking the button then clicking on a horizontal line in one of your grid squares will adjust the grid to line up with that point.
https://i.imgur.com/H5RcjNO.gif

4. Adjust Y - When this is selected it will let you move the grid along the Y plane. Clicking the button then clicking on a horizontal line in one of your grid squares will adjust the grid to line up with that point.
https://i.imgur.com/YIDDjXU.gif

It may not be perfect but it will be close. 

### Features in planning (maybe?)

1. Instead of clicking on two point, actually draw a square on the canvas then use that as reference points. Would make it easier for maps with no pre-existing grid lines.
2. Create a new Menu button which will put this tool and the following idea in their own space. (kinda working)
3. Create an X/Y adjustment button which will take a reference click and move the grid to the click in the requested axis. (done!)
4. Add better points of reference for clicks (or #1 on this list).

### Changes in this version - 0.0.2

1. Disabled the complete auto button from the original code. Found that while it kinda worked, it also kinda did not. So I split the functions out into separate buttons until the full auto thing can be figured out.
2. Added a new button structure under the existing controls menu. 
3. Broke apart the main getPosition function into three functions, getPostition for grid scaling - setXOff and setYOff to set the axis.

### Known issues

1. Sometimes the button to access the tools will not work. I beleive this is due to how I am calling it but am not entierly sure. ** Workaround(s) ** Reload the page, seems to work after that.
2. Cant fold the menu back into itself - Using existing code from foundry.js and was not able to get it to do what I wanted without breaking it completely. 

## Notes and Mentions

This is my first foray into working with Javascript/HTML/jQuery/CSS. So its rough but I hope to polish it up. Any suggestions on code/cleanup/what can be done better just message me on discord!

### Big thanks to Atropos and Felix ( aka sly3r86 ) for their help and the code which was totally not butchered to make this.
