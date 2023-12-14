# File System Implementation

## Overview
This JavaScript implementation simulates a simplified file system providing functionalities to manage directories, files, and basic operations like navigation, creation, deletion, copying, and moving of files and directories.

## Implementation
The file system is implemented using a `FileSystem` class in JavaScript.

### Data Structures Used
- `Directory`: An object representing a directory containing `name`, `type`, `contents`, and `parent` properties.
- `File`: An object representing a file containing `name`, `type`, `content`, and `parent` properties.
- `FileSystem`: Manages the file system with a root directory and current directory pointers.

## Functionalities Implemented
- `mkdir`: Creates a new directory.
- `cd`: Changes the current directory.
- `ls`: Lists contents of the current directory.
- `touch`: Creates a new file.
- `echo`: Writes text to a file.
- `cat`: Displays contents of a file.
- `exit`: Moves to the root directory.
- `mv`: Moves a file or directory to another location.
- `cp`: Copies a file or directory to another location.
- `rm`: Removes a file or directory.

## Design Decisions
- Path handling: Splitting path strings into components for traversal.
- Error handling: Validation checks for invalid paths, existing items, etc.
- Directory structure: Implemented using nested objects for directories and files.
- File content storage: Basic content storage within the `content` property.

### Setup Script (Example)
```bash
# JavaScript setup script example (assuming Node.js installed)
# Clone the repository and navigate to the directory
git clone https://github.com/your-repo.git
cd your-repo

# Install dependencies (if any)
# npm install

# Run the file system implementation (if applicable)
# node your_file_system_script.js
