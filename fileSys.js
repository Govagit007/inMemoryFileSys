class FileSystem {
  constructor() {
    this.root = {
      name: "/",
      type: "directory",
      contents: [],
      parent: null,
    };
    this.currentDirectory = this.root;
  }

  mkdir(name) {
    if (!name) {
      console.log("Enter a valid name");
      return;
    }
    const newDirectory = {
      name,
      type: "directory",
      contents: [],
      parent: this.currentDirectory,
    };
    console.log(`Created new dir ${name}`);
    this.currentDirectory.contents.push(newDirectory);
  }

  cd(path) {
    if (path === "/") {
      this.currentDirectory = this.root;
      return;
    }

    const pathComponents = path.split("/").filter(Boolean);

    let current = this.currentDirectory;

    for (const component of pathComponents) {
      if (component === "..") {
        if (current.parent) {
          current = current.parent;
          console.log(`Exited from dir ${current.name}`);
        }
      } else {
        const next = current.contents.find(
          (dir) => dir.name === component && dir.type === "directory"
        );
        if (next) {
          current = next;
          console.log(`Entered into dir ${component}`);
        } else {
          console.log("Invalid directory");
          return;
        }
      }
    }

    this.currentDirectory = current;
  }

  exit() {
    if (this.currentDirectory === this.root) {
      console.log("Already in the root directory");
    } else {
      this.currentDirectory = this.root;
      console.log("Exited to the root directory");
    }
  }

  ls() {
    const contents = this.currentDirectory.contents.map((item) => item.name);
    console.log("Contents:", contents.join(", "));
  }

  touch(fileName) {
    if (!fileName) {
      console.log("Enter a valid file name");
      return;
    }
    const newFile = {
      name: fileName,
      type: "file",
      content: "",
      parent: this.currentDirectory,
    };
    console.log(`Created new file ${fileName}`);
    this.currentDirectory.contents.push(newFile);
  }

  echo(content, fileName) {
    if (!fileName || !content) {
      console.log("Enter valid content and file name");
      return;
    }
    const file = this.currentDirectory.contents.find(
      (item) => item.name === fileName && item.type === "file"
    );
    if (file) {
      file.content = content;
      console.log(`Wrote '${content}' to ${fileName}`);
    } else {
      console.log("File not found");
    }
  }

  cat(fileName) {
    const file = this.currentDirectory.contents.find(
      (item) => item.name === fileName && item.type === "file"
    );
    if (file) {
      console.log(`Contents of ${fileName}: " ${file.content} "`);
    } else {
      console.log("File not found");
    }
  }

  mv(sourcePath, destinationPath) {
    const sourceComponents = sourcePath.split("/").filter(Boolean);
    const destinationComponents = destinationPath.split("/").filter(Boolean);

    let sourceDirectory = this.root;
    let destinationDirectory = this.root;

    // Get source directory
    for (const component of sourceComponents) {
      if (component === "..") {
        if (sourceDirectory.parent) {
          sourceDirectory = sourceDirectory.parent;
        } else {
          console.log("Invalid source path");
          return;
        }
      } else {
        const next = sourceDirectory.contents.find(
          (dir) => dir.name === component
        );
        if (next?.type === "file") {
          console.log(`file found ${next.name}`);
          break;
        } else if (next) {
          sourceDirectory = next;
        } else {
          console.log("Invalid source path");
          return;
        }
      }
    }

    // Get destination directory
    for (const component of destinationComponents) {
      if (component === "..") {
        if (destinationDirectory.parent) {
          destinationDirectory = destinationDirectory.parent;
        } else {
          console.log("Invalid destination path");
          return;
        }
      } else {
        let next = destinationDirectory.contents.find(
          (dir) => dir.name === component && dir.type === "directory"
        );
        if (!next) {
          // Create the directory if it doesn't exist
          next = {
            name: component,
            type: "directory",
            contents: [],
            parent: destinationDirectory,
          };
          console.log(`new directory ${next.name}created`);
          destinationDirectory.contents.push(next);
        }
        destinationDirectory = next;
      }
    }

    // Find the item to be moved
    const itemName = sourceComponents[sourceComponents.length - 1];
    const itemToMove = sourceDirectory.contents.find(
      (item) => item.name === itemName
    );

    if (itemToMove) {
      // Check if the item already exists in the destination directory
      const alreadyExists = destinationDirectory.contents.find(
        (item) => item.name === itemName
      );

      if (alreadyExists) {
        console.log(
          "Item with the same name already exists in the destination"
        );
        return;
      }

      // Move the item to the destination
      itemToMove.parent = destinationDirectory;
      destinationDirectory.contents.push(itemToMove);

      // Remove the item from the source directory
      sourceDirectory.contents = sourceDirectory.contents.filter(
        (item) => item !== itemToMove
      );

      console.log(`Moved ${itemName} to ${destinationPath}`);
    } else {
      console.log("Item not found in the source path");
    }
  }

  cp(sourcePath, destinationPath) {
    const sourceComponents = sourcePath.split("/").filter(Boolean);
    const destinationComponents = destinationPath.split("/").filter(Boolean);

    let sourceDirectory = this.root;
    let destinationDirectory = this.currentDirectory;
    let fileName = sourceComponents.pop();
    // console.log(fileName);
    // Get source directory
    for (const component of sourceComponents) {
      if (component === "..") {
        if (sourceDirectory.parent) {
          sourceDirectory = sourceDirectory.parent;
        } else {
          console.log("Invalid source path");
          return;
        }
      } else {
        const next = sourceDirectory.contents.find(
          (dir) => dir.name === component && dir.type === "directory"
        );
        if (next) {
          sourceDirectory = next;
        } else {
          console.log("Invalid source path");
          return;
        }
      }
    }

    // Get destination directory

    if (destinationPath !== ".") {
      for (const component of destinationComponents) {
        if (component === "..") {
          if (destinationDirectory.parent) {
            destinationDirectory = destinationDirectory.parent;
          } else {
            console.log("Invalid destination path");
            return;
          }
        } else {
          let next = destinationDirectory.contents.find(
            (dir) => dir.name === component && dir.type === "directory"
          );
          if (!next) {
            // Create the directory if it doesn't exist
            next = {
              name: component,
              type: "directory",
              contents: [],
              parent: destinationDirectory,
            };
            destinationDirectory.contents.push(next);
          }
          destinationDirectory = next;
        }
      }
    }

    // Find the item to be copied
    const itemName = fileName;
    const itemToCopy = sourceDirectory.contents.find(
      (item) => item.name === itemName
    );

    if (itemToCopy) {
      // Check if the item already exists in the destination directory
      const alreadyExists = destinationDirectory.contents.find(
        (item) => item.name === itemName
      );

      if (alreadyExists) {
        console.log(
          "Item with the same name already exists in the destination"
        );
        return;
      }

      // Create a copy of the item
      const copiedItem = { ...itemToCopy };
      copiedItem.parent = destinationDirectory;
      destinationDirectory.contents.push(copiedItem);

      console.log(`Copied ${itemName} to ${destinationPath}`);
    } else {
      console.log("Item not found in the source path...");
    }
  }

  rm(path) {
    const pathComponents = path.split("/").filter(Boolean);

    let targetDirectory = this.currentDirectory;

    // Get target directory
    for (const component of pathComponents) {
      if (component === "..") {
        if (targetDirectory.parent) {
          targetDirectory = targetDirectory.parent;
        } else {
          console.log("Invalid path");
          return;
        }
      } else {
        const next = targetDirectory.contents.find(
          (dir) => dir.name === component && dir.type === "directory"
        );

        if (next) {
          targetDirectory = next;
        } else {
          console.log("Invalid path ");
          return;
        }
      }
    }
    const parentDirectory = targetDirectory.parent;
    // console.log("target -> ", parentDirectory);

    const itemName = pathComponents[pathComponents.length - 1];
    // console.log("target -> ", targetDirectory);

    const itemToRemoveIndex = parentDirectory.contents.findIndex(
      (item) => item.name === itemName
    );

    if (itemToRemoveIndex !== -1) {
      const itemToRemove = parentDirectory.contents[itemToRemoveIndex];

      // Remove item from contents
      parentDirectory.contents.splice(itemToRemoveIndex);

      console.log(`Removed ${itemName} from ${path}`);
    } else {
      console.log("Item not found in the path");
    }
  }
}

module.exports = FileSystem;

// const newFolder = new FileSystem();
// newFolder.mkdir("ReactProject");
// newFolder.mkdir("NodeProject");
// newFolder.cd("ReactProject");
// // console.log(newFolder.currentDirectory);

// newFolder.touch("app.js");
// newFolder.echo("React App is Created", "app.js");
// newFolder.cd("../NodeProject");
// newFolder.touch("server.js");
// newFolder.echo("Node Server is Created", "server.js");

// newFolder.cat("../ReactProject/app.js");
// // newFolder.cd("NodeProject");
// // newFolder.cd("../NodeProject");
// console.log(newFolder.currentDirectory);
// newFolder.exit();
// console.log(newFolder.currentDirectory);
// // newFolder.ls();

// Example usage:
const fileSystem = new FileSystem();

// Create directories and files
fileSystem.mkdir("data");
fileSystem.cd("data");
fileSystem.mkdir("ice_cream");
fileSystem.mkdir("boring");
fileSystem.cd("boring");
// fileSystem.mkdir("ice_cream1");
fileSystem.touch("cassata.txt");
fileSystem.exit();

// Move the file cassata.txt to another directory
fileSystem.mv("/data/boring/cassata.txt", "/data/ice_cream");

fileSystem.rm("data/boring");
fileSystem.cp("data/ice_cream/cassata.txt", ".");

// List contents to check the move
fileSystem.ls();
console.log(fileSystem.currentDirectory);
