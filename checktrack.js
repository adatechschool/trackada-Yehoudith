import {readFileSync, existsSync} from "fs";
import {join} from "path";
import {homedir} from "os";
import chalk from "chalk";
import inquirer from "inquirer";
import { createMissing } from "./createMissing.js";

const track = JSON.parse(readFileSync("./track.json"));
const root = track.root.replace("~", homedir());
const adaYN = join(homedir(), "ada");
let totalFichiers = track.projects.length;
let fichiersOK = 0;
const existingProjects = [];
const missingProjects = [];

// Verifie si le dossier Ada existe, sinon il le met dans missingProjects
if (existsSync(adaYN)) {
    totalFichiers++;
    existingProjects.push(adaYN);
    console.log(chalk.green("✅ dossier ada"));
} else {
    missingProjects.push(adaYN);
    console.log("❌ dossier ada");
}


// Si le dossier existe, verifie si .git existe
for (const {name, required} of track.projects) {
    const projectP = join(root, name);
    const filesOfMissingProject = [];

    if(!existsSync(projectP)){

        missingProjects.push(projectP);
        filesOfMissingProject.push(".git");
        for (const file of required) {
        filesOfMissingProject.push(file);
        }
        missingProjects.push(filesOfMissingProject);
        console.log(chalk.red("❌ dossier du projet"), chalk.red(name));
        console.log("- le dossier n'existe pas où n'est pas nommé correctement");
        continue;
    }

        const erreurs = [];
    // console.log(name, "existe");
            const gitOk = existsSync(join(projectP, ".git"));
            if (!gitOk) {
                
                // filesOfExistingProject.push(gitOk);
                erreurs.push("- le repository git n'est pas initialisé");
            }
                const missingFichiers = [];
                const filesOfExistingProject = [];    

    // Verifie si les autres fichiers existe, si non, il copie le nom dans missingFichiers
            for (const file of required) {
                // console.log(file, existsSync(join(projectP, file))); //afficher les fichiers en individuels si ils sont true ou false
                if (!existsSync(join(projectP, file))) { 
                missingFichiers.push(file); 
                filesOfExistingProject.push(file);
                }
            }    
                // console.log(filesOfExistingProject);
            
    // Ecris si il manque des fichiers, si oui lesquel. Si il y a 0 erreurs, affiche que le dossier est ok
                if (missingFichiers.length === 1) {
                    // existingProjects.push(projectP);
                    erreurs.push("- il manque " + missingFichiers[0]);
            } 
                if ( missingFichiers.length > 1 ){
                    // existingProjects.push(projectP);
                    const last = missingFichiers.pop();
                    erreurs.push("- il manque " + missingFichiers.join(", ") + " et " + last);
                    }
                

                if (erreurs.length === 0) {
                fichiersOK++;
                console.log(chalk.green("✅ dossier du projet"), chalk.green(name));
            }
            else {

                 console.log(chalk.red("❌ dossier du projet"), chalk.red(name));
            for (const err of erreurs) {
                console.log(err);
                existingProjects.push(filesOfExistingProject);
            }
        }
}  

// Pourcentage de dossiers complets, et barre de progression
let pourcentage = Math.round((fichiersOK / totalFichiers) * 100 );
const bar = "██".repeat(pourcentage / 10) + "░░".repeat(10 - pourcentage / 10);
console.log(`[${bar}]`);
if (pourcentage < 100) {
console.log(chalk.red(`❌ ${pourcentage}% des projets sont initialisés correctement (${fichiersOK}/${totalFichiers})`));
} else {
console.log(chalk.green(`✅ Tous les projets sont initialisés correctement (${fichiersOK}/${totalFichiers})`));
}

// console.log(existingProjects);
console.log(missingProjects);

// Affiche le message escque l'on veut creer les dossiers et fichiers manquants, si oui, lancer le fonction createMissing
inquirer.prompt([
{
 type: "confirm",
 name: "showMissing",
 message: "Veux tu creer les dossiers et fichiers manquants ? (y/n) ",
 default: false
}
])
.then((answers) => {

 if (answers.showMissing) {
    createMissing(missingProjects);
    console.log("Création des dossiers et fichiers.");
 } else {
    console.log("Ne pas créer les dossiers et les fichiers.");
 }

});
