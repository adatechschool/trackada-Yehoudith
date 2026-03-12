import {readFileSync, existsSync} from "fs";
import {join} from "path";
import {homedir} from "os";
import chalk from "chalk";

const track = JSON.parse(readFileSync("./track.json"));
const root = track.root.replace("~", homedir());
const adaYN = join(homedir(), "ada");
let totalFichiers = track.projects.length;
let fichiersOK = 0;

if (existsSync(adaYN)) {
    totalFichiers++;
    console.log(chalk.green("✅ dossier ada"));
} else {
    console.log("❌ dossier ada");
}

for (const {name, required} of track.projects) {
    const projectP = join(root, name);

    if(!existsSync(projectP)){
        console.log(chalk.red("❌ dossier du projet"), chalk.red(name));
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
                fichiersOK++;
                console.log(chalk.green("✅ dossier du projet"), chalk.green(name));
            }
            else {

                 console.log(chalk.red("❌ dossier du projet"), chalk.red(name));
            for (const err of erreurs) {
                console.log(err);
            }
        }
}  
let pourcentage = Math.round((fichiersOK / totalFichiers) * 100 );
const bar = "██".repeat(pourcentage / 10) + "░░".repeat(10 - pourcentage / 10);
console.log(`[${bar}]`);
if (pourcentage < 100) {
console.log(chalk.red(`❌ ${pourcentage}% des projets sont initialisés correctement (${fichiersOK}/${totalFichiers})`));
} else {
console.log(chalk.green(`✅ Tous les projets sont initialisés correctement (${fichiersOK}/${totalFichiers})`));
}