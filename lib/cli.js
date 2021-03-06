const fs = require("fs");
const minimist = require("minimist");
const PartyPartyParty = require("../index");

function run(launchFilePath) {
    // Process the arguments we're launched with and get rid of anything we won't be using.
    args = minimist(process.argv, {
        default: {
            "radius": 10, // 0 = regular stationary party
            "rotate": 0, // don't rotate by default
        },
        unknown: arg => {
            // Filter out node and our index.js.
            // This ensures that the args._ array will just be the files we process
            if (arg === process.execPath) return false;
            if (arg === (launchFilePath || __filename)) return false;
            return true;
        }
    });

    //TODO(somewhatabstract): Consider adding some scaling or a --fitslack option?
    //TODO(somewhatabstract): Add ability to specify lots of different files at once.
    //TODO(somewhatabstract): Add error checks and useful help text.
    if (args._.length !== 3) {
        console.log("Usage: " + (launchFilePath || __filename) + " input.png output.gif");
        console.log("Got:")
        console.log(args)
        process.exit(-1);
    }

    const inputFilename = args._[1];
    const outputFilename = args._[2];

    const outputFileStream = fs.createWriteStream(outputFilename);
    PartyPartyParty(inputFilename, outputFileStream, parseInt(args.radius),
                   parseInt(args.rotate));
}

module.exports = {
    run
}
