import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";

export function createMissing(missingProjects) {

    for (let i = 0; i < missingProjects.length; i += 2) {

        const dossier = missingProjects[i];
        const fichiers = missingProjects[i + 1];

        // créer le dossier projet s'il manque
        if (!existsSync(dossier)) {
            mkdirSync(dossier, { recursive: true });
            console.log(chalk.green("dossier créé :"), dossier);
        }

        for (const file of fichiers) {

            const DossierEtFichiers = join(dossier, file);

            if (!existsSync(DossierEtFichiers)) {
// creer les dossiers
                if (file.includes("/")) {
                    mkdirSync(DossierEtFichiers, { recursive: true });
                    console.log(chalk.green("dossier créé :"), file);
                }
// creer les .git
                else if (file === ".git") {
                    mkdirSync(DossierEtFichiers);
                    console.log(chalk.green("dossier .git créé"));
                }
// creer les fichiers
                else {
                    writeFileSync(DossierEtFichiers, "");
                    console.log(chalk.green("fichier créé :"), file);
                }

            }
        }
    }
}