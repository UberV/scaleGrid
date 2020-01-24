## Grid Scaler

## Compatibility

Requires FVTT version 0.4.0 or higher

To install a module, follow these instructions:

1. Download the zip file
2. Extract the included folder to `public/modules` in your Foundry Virtual Tabletop installation folder.
3. Restart Foundry Virtual Tabletop. 

## How to Use the plugin

Once the plugin is loaded a new wrench icon will appear below the main tool selection.

Click on this icon and you will be presented with Six more icons. (Imgur Album - https://imgur.com/a/1UZUjkT)

1. Reset Grid - This will set the grid to 100 pixel square with 0 X/Y offset. It also changes the grid color to pink to make it easier to see for setup. Now works with Hex Grids (**Warning spastic GIFs below**)
![Reset Grid](https://i.imgur.com/JHV0CjI.gif)
![Reset GridPh](https://i.imgur.com/e77hRkK.gif)
![Reset GridFG](https://i.imgur.com/mu4DrYD.gif)

2. Auto Adjust Grid - **||Currently Disabled due to issues||** This will let you draw a square on the map then have the grid size and X/Y offsets set to match the drawn square.
![Auto Adjust Grid](https://i.imgur.com/tbM3zGl.gif)

3. Set GridSquare Size - This will let you draw a square on the map then have the grid size set to match the drawn square. No offset is applied with this and should be applied manually.
![Adjust Square Grid](https://i.imgur.com/q6ouG2k.gif)

4. Adjust X - When this is selected it will let you move the grid along the X plane. Clicking the button then clicking on a vertical line in one of your grid squares will adjust the grid to line up with that point. Now works with hexes!!
![Adjust X](https://i.imgur.com/fadExiq.gif)
![Adjust X Fh](https://i.imgur.com/vowtY2y.gif)
![Adjust X Ph](https://i.imgur.com/KjdrXdY.gif)

5. Adjust Y - When this is selected it will let you move the grid along the Y plane. Clicking the button then clicking on a horizontal line in one of your grid squares will adjust the grid to line up with that point. Also now works with hexes!!
![Adjust Y](https://i.imgur.com/2c41haj.gif)
![Adjust Y Fh](https://i.imgur.com/td18AEm.gif)
![Adjust Y Ph](https://i.imgur.com/VqHPns4.gif)

6. Set GridSquare with a 3x3 Square - Draw a 3x3 grid square on the map then have the grid size set to match the drawn square. No offset is applied with this and should be applied manually.
![Adjust 3x3 Square Grid](https://i.imgur.com/kFdPVaa.gif)

7. Set GridSquare with a Hexagon - Draw hexagon on the map then have the grid size set to match the hex. No offset is applied with this and should be applied manually. Flat/Horizontal Hexes should be drawn left -> right from the midpoint, while Pointed/Vertical Hexes should be drawn from the top down.
![Draw Hex Fh](https://i.imgur.com/JuPqFoQ.gif)
![Draw Hex Ph](https://i.imgur.com/2vCRqXT.gif)

It may not be perfect but it will be close. 

### Features in planning (maybe?)

1. Fix auto-grid - Need to figure out how to deal with the scenes size changing when grid sizes change as this throws off the original click location.

### Changes in version - 0.0.8

1. Added the ability to scale the grid with Hexes and adjust the X/Y offsets using exsisting tools. 
2. Updated Readme to show new buttons/layout.

### Changes in version - 0.0.7

1. Changed how the buttons are added to the screen. Now using the API provided by foundry. From here forward new updates **WILL NOT WORK** with older versions.
2. Added a 3x3 button. This will allow users to select a 3x3 area of grid squares and have foundry calculate the grid size from that.

### Changes in version - 0.0.6

MIA - We dont talk about this version

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

1.Clean up this mess, wow...

## Notes and Mentions

This is my first foray into working with Javascript/HTML/jQuery/CSS. So its rough but I hope to polish it up. Any suggestions on code/cleanup/what can be done better just message me on discord!

### Big thanks to Atropos, Felix ( aka sly3r86 ), and Errational for their help and the code which was totally not butchered to make this.
