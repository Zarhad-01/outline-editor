# App-Eng-CW: Outline Editor

This project is a web-based outline editor developed as a 2nd year university project. It offers a rich feature set designed to enhance productivity and document structuring through an intuitive user interface.

## How to run and use the website

To get started, ensure you have Node.js installed on your system. Follow the steps below to install dependencies and run the webserver:

1. Install the required library modules:
```
npm install
```
2. Start the webserver:
```
npm start
```
Now that the webserver is running, go to `http://localhost:8080/` in your web browser (preferably Google Chrome.)
## Key Features

- **Save and Load**: Automatic loading at startup and options for manual saving.
- **Paragraph Selection**: Click to highlight paragraphs for editing.
- **Line Creation**: Options to create new lines at the bottom, indented, or at the same level as the selected line.
- **Drag and Drop**: Reorganize content within the same indentation scope.
- **Expand and Collapse**: Manage visibility of elements with children.
- **Text Formatting**: Apply bold and italic styles.
- **Print**: Generate a printable copy or PDF.
- **Navigation and Indentation**: Keyboard shortcuts for movement and indentation adjustments.
- **Keyboard Shortcuts**: Efficient application use with various shortcuts.

## Design Highlights

- **Help Window**: A pop-up window provides crucial information and shortcut details.
- **Light and Dark Modes**: Automatic theme adjustment based on the OS setting, enhancing user experience.


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

## Planned Improvements

To further enhance the application, the following improvements are underway:

- **Code Optimization**: Introduction of helper functions to reduce repetition, improve event listener efficiency, and adhere to the DRY principle for a cleaner, more maintainable codebase.
- **Functionality Enhancements**: Streamlining operations with better function naming, error handling for localStorage, and security considerations for content loading.
- **User Experience**: Enhancing keyboard accessibility and ensuring no conflict with native browser shortcuts.
- **Feature Expansion**: Future work includes multiple save functionality on a server, implementing authentication for user management, and enabling URL sharing for collaborative editing.

## Unfinished and Future Work

While the core functionality is in place, several features remain in development:

- **Multiple Save Functionality**: Planned for server-based storage solutions.
- **Authentication**: Google Sign-In integration is under consideration.
- **Collaborative Editing**: Aiming to enable URL sharing for simultaneous document editing.

## How to Contribute

Contributions are welcome! If you're interested in improving the application or adding new features, please feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
