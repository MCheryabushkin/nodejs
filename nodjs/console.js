

function consoleToJSON() {
    const cons = {}

    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i].split('=');

        cons[arg[0]] = arg[1] ? arg[1] : true;
    }

    return cons;
}

console.log(consoleToJSON());