# App-Eng-CW
An Outline Editor.

## How to run and use the website
The website uses a number of library modules that must be installed. This can be done with one line:
```bash
npm install
```
Now to run the webserver, this can be done by running the following line:
```bash
npm start
```
Now that the webserver is running, go to `http://localhost:8080/` in your web browser (preferably Google Chrome.)
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

### Move up and down, indent left and right
You are able to move elements around using the keyboard shortcuts. 
Any movement of elements will move any children (if they exist) with the parent element. 

### Keyboard Shortcuts
I have implemented various Keyboard shortcuts as it will allow the user to have more efficient use of the application.

* `Enter` - Create new line
* `Ctrl` + `Enter` - Create new Indented line
* `Alt` + `Enter` - Create new line at the bottom
* `Ctrl` + `S` - Save file
* `Ctrl` + `B` - Make text bold
* `Ctrl` + `I` - Italicize text
* `Ctrl` + `P` - Print page
* `Alt` + `+` - Expand
* `Alt` + `-` - Collapse
* `Ctrl` + `↑` - Move selected line up
* `Ctrl` + `↓` - Move selected line down
* `Ctrl` + `←` - Indent Left
* `Ctrl` + `→` - Indent Right

## Design

### Help Window
I created a pop-up help window in order to give the user pertinent information about the application. This includes how the delete function acts as well as the keyboard shortcuts.

### Light and dark mode
I have implemented both light and dark modes as this allows for the user to decide via their OS what they wish the app to look like.
As it is done via a media query in the CSS file the end user won't even notice the option is there.

## Unfinished and future work
For the following list I plan on implementing these features in the future

### Multiple save functionality (on a server)
I did attempt at creating multiple save functionality using API in a server, however this had to be scraped due to time constraints. 

### Implementing authentication
I was planning to use Google Sign-In integration but never got around to it as I was too busy working on core functionality for the website.

### URL sharing and collaborative editing
I did want to implement this, however, due to time constraints I wasn't able to.
