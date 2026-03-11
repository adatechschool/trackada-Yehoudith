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
        continue;
    }

        const erreurs = [];
            
        // console.log(name, "existe");
            const gitOk = existsSync(join(projectP, ".git"));
            if (!gitOk) {
                erreurs.push("- le repository git n'est pas initialisé");
            }
                const missing = [];
            
            for (const file of required) {
                // console.log(file, existsSync(join(projectP, file))); afficher les fichiers en individuels si ils sont true ou false
                if (!existsSync(join(projectP, file))) { 
                missing.push(file);   
                }
            }    
                
                if (missing.length === 1) {
                    erreurs.push("- il manque " + missing[0]);
            } 
                if ( missing.length > 1 ){
                    const last = missing.pop();
                     erreurs.push("- il manque " + missing.join(", ") + " et " + last);
            }
                if (erreurs.length === 0) {
                console.log("✅ dossier du projet", name)
            }
            else {
                 console.log("❌ dossier du projet", name);
            for (const err of erreurs) {
                console.log(err);
            }
        }
}   

