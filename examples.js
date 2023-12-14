const FileSystem = require("./fileSys");

const fileSystem = new FileSystem();

// Create directories and files
fileSystem.mkdir("data"); //Created new dir data
fileSystem.cd("data"); //Entered into dir data
fileSystem.mkdir("ice_cream"); //Created new dir ice_cream
fileSystem.mkdir("boring"); //Created new dir boring
fileSystem.cd("boring"); //Entered into dir boring
// fileSystem.mkdir("ice_cream1");
fileSystem.touch("cassata.txt"); //Created new file cassata.txt
fileSystem.echo("I have been written", "cassata.txt"); //Wrote 'I have been written' to cassata.txt
fileSystem.cat("cassata.txt"); //Contents of cassata.txt: " I have been written "
fileSystem.exit(); //Exited to the root directory

// Move the file cassata.txt to another directory
fileSystem.mv("/data/boring/cassata.txt", "/data/ice_cream"); //Moved cassata.txt to /data/ice_cream

fileSystem.rm("data/boring"); //Removed boring from data/boring
fileSystem.cp("data/ice_cream/cassata.txt", "."); //Copied cassata.txt to .

// List contents to check the move
fileSystem.ls(); //Contents: data, cassata.txt
