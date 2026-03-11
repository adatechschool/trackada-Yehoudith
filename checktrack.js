import {readFileSync, existsSync, readdirSync} from "fs";
import {join} from "path";
import {homedir} from "os";

const track = JSON.parse(readFileSync("./track.json"));
const root = track.root.replace("~", homedir());

for (const {name, required} of track.projects) {
    const projectP = join(root, name);

    if(!existsSync(projectP)){
        console.log("❌ dossier du projet", name);
        console.log("- le dossier n'existe pas où n'est pas nommé correctement");
    }

    else {  
        // console.log(name, "existe");
            const gitOk = existsSync(join(projectP, ".git"));
            if (!gitOk) {
            console.log("❌ dossier du projet", name);
            console.log("- le repository git n'est pas initialisé");}

            const missing = [];

            for (const file of required) {
                // console.log(file, existsSync(join(projectP, file)));
                if (!existsSync(join(projectP, file))) { 
                missing.push(file);   
                }
            }    
                
                if (missing.length === 1) {
                console.log("❌ dossier du projet", name);
                console.log("- il manque", missing[0]);
                } else if ( missing.length > 1 ){
                    const last = missing.pop();
                    console.log("❌ dossier du projet", name);
                    console.log("- il manque", missing.join(", "), "et", last);
                } else if (!missing.length) {
                console.log("✅ dossier du projet", name)
        }

            }
        }

        const gitOk = existsSync(join(projectP, ".git"));
        if (!gitOk) {
            console.log("- le repository git n'est pas initialisé");}
        

