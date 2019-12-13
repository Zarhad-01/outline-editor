# App-Eng-CW
An Outline Editor.

key features, how to use them, details your design and implementation rationale, and lists unfinished and future work.

## Key Features

### Save and load
Loading will always occur whenever the page starts up.
Saving can either be done by pressing on the save button or by using the keyboard shortcut `Ctrl` + `S`.

### Select Paragraph
Every time the user clicks on a paragraph, it will gain the "selected" class and appear highlighted. Once this has happened you can use any of the buttons or keyboard shortcuts to edit the document.

### Create new line
This generates a new line at the bottom of the page that is of the lowest indentation level.

### Create new indented line 
This generates a new line that is indented one further from the selected line and will focus on this new line.

### Create new line on same level 
This creates a new line of the same indentation level and just below the selected area.

### Drag and Drop
The website allows for drag and drop functionality.
You can only drag and drop within the scope that the selected area is in.

### Expand and Collapse
You can expand and collapse any object with children elements.
This is done by pressing the expand and collapse button or by using the keyboard shortcuts. These are `Alt` + `+` and `Alt` + `-` respectively.

### Bold and italic 
You are able to make a selected region bold and/or italic.
This is done by pressing the bold and italic buttons when you have an area selected or by using the keyboard shortcuts. These are `Ctrl` + `B` and `Ctrl` + `I` respectively.


### Print
You are able to create a printable copy or PDF of the outline text area.
To do this you should press the print button or use the keyboard shortcut `Ctrl` + `P`.

### Keyboard Shortcuts


Enter - Create new line.
Ctrl + Enter - Create new Indented line.
Alt + Enter - Create new line at the bottom.
Ctrl + S - Save file
Ctrl + ↑ - Move selected line up.
Ctrl + ↓ - Move selected line down
Alt + + - Expand
Alt + - - Collapse
Ctrl + B - Make text bold
Ctrl + I - Italicize text
Ctrl + P - Print page


## Design 

### Help Window
### Layering of colours
### Light and dark mode


## Unfinished and future work

### Multiple save functionality (on a server)
### Implementing authentication
### URL sharing
