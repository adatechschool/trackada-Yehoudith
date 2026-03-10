import {readFileSync, existsSync, readdirSync} from "fs";
import {join} from "path";
import {homedir} from "os";

const track = JSON.parse(readFileSync("./track.json"));
const root = track.root.replace("~", homedir());

for (const {name, required} of track.projects) {
    const projectP = join(root, name);

    if(!existsSync(projectP)){
        console.log("❌", name);
        console.log("- le dossier n'existe pas où n'est pas nommé correctement");
    }

    else {  
        console.log(name, "existe");
        const gitOk = existsSync(join(projectP, ".git"));
        if (!gitOk) {
            console.log("- le repository git n'est pas initialisé");

        }
};
}