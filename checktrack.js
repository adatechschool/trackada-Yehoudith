import {readFileSync, existsSync, readdirSync} from "fs";
import {join} from "path";
import {homedir} from "os";

const track = JSON.parse(readFileSync("./track.json"));
const root = track.root.replace("~", homedir());

for (const {name, required} of track.projects) {
    const projectP = join(root, name);

    if(existsSync(projectP)){
        console.log(name, "existe");
    }

    else { console.log(name, "n'existe pas") };
}