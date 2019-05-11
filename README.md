## Grid Scaler

## Compatibility

Requires FVTT version 0.1.0 or higher

To install a module, follow these instructions:

1. Download the zip file
2. Extract the included folder to `public/modules` in your Foundry Virtual Tabletop installation folder.
3. Restart Foundry Virtual Tabletop. 

## How to Use the plugin

Once the plugin is loaded a new wrench icon will appear below the main tool selection.

Click on this icon and you will be presented with five more icons. (Imgur Album - https://imgur.com/a/zyBWI0M)

1. Reset Grid - This will set the grid to 100 pixel square with 0 X/Y offset. It also changes the grid color to pink to make it easier to see for setup.
![Reset Grid](https://i.imgur.com/TYYH8KP.gif)

2. Auto Adjust Grid - **||Currently Disabled due to issues||** This will let you draw a square on the map then have the grid size and X/Y offsets set to match the drawn square.
![Auto Adjust Grid](https://i.imgur.com/tbM3zGl.gif)

3. Set GridSquare Size - This will let you draw a square on the map then have the grid size set to match the drawn square. No offset is applied with this and should be applied manually.
![Adjust Grid](https://i.imgur.com/6SaU3Yo.gif)

4. Adjust X - When this is selected it will let you move the grid along the X plane. Clicking the button then clicking on a horizontal line in one of your grid squares will adjust the grid to line up with that point.
![Adjust X](https://i.imgur.com/4t38xiM.gif)

5. Adjust Y - When this is selected it will let you move the grid along the Y plane. Clicking the button then clicking on a horizontal line in one of your grid squares will adjust the grid to line up with that point.
![Adjust Y](https://i.imgur.com/M6C53oa.gif)


It may not be perfect but it will be close. 

### Features in planning (maybe?)

1. Fix auto-grid - Need to figure out how to deal with the scenes size changing when grid sizes change as this throws off the original click location.

### Changes in version - 0.0.5

1. Removed auto-grid due to issues with click points changing when the scene gets updated and throwing off the calculations. Needs more calibration.
2. Changed the Adjust X/Y buttons to work with both positive and negitive values so the map/grid does not end up in a far corner somewhere.
3. Added a check for drawn grids being smaller than 50px. If smaller nothing happens, but if it is larger then a number shows up indicating grid square size.

### Changes in version - 0.0.4

1. Updated plugin to  work with foundry 2.8, now no longer on its own canvas. No Idea why I was doing it that way anyway.

### Changes in version - 0.0.3

1. Setup the ability for users to draw a square and have the grid set to its size, then depening on tool selection either apply X/Y offsets or not.
2. Removed the two click set grid square button and replaced its function with a drawn square with no offset applied.

### Changes in version - 0.0.2

1. Disabled the complete auto button from the original code. Found that while it kinda worked, it also kinda did not. So I split the functions out into separate buttons until the full auto thing can be figured out.
2. Added a new button structure under the existing controls menu. 
3. Broke apart the main getPosition function into three functions, getPostition for grid scaling - setXOff and setYOff to set the axis.

### Known issues

1. Sometimes the button to access the tools will not work. I beleive this is due to how I am calling it but am not entierly sure. ** Workaround(s) ** Reload the page, seems to work after that.
2. Cant fold the menu back into itself - Using existing code from foundry.js and was not able to get it to do what I wanted without breaking it completely. 

## Notes and Mentions

This is my first foray into working with Javascript/HTML/jQuery/CSS. So its rough but I hope to polish it up. Any suggestions on code/cleanup/what can be done better just message me on discord!

### Big thanks to Atropos and Felix ( aka sly3r86 ) for their help and the code which was totally not butchered to make this.
