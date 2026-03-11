// import {readFileSync, existsSync, readdirSync} from "fs";
// import {join} from "path";
// import {homedir} from "os";

// const track = JSON.parse(readFileSync("./track.json"));
// const root = track.root.replace("~", homedir());

// for (const {name, required} of track.projects) {
//     const projectP = join(root, name);

    // if(existsSync(projectP)){

        const files = readdirSync(projectP);
        const gitOk = existsSync(join(projectP, ".git"));
        const allfilesOk = required.every(file => existsSync(join(projectP, file)));

        if (gitOk && allfilesOk ) {
        console.log("✅ dossier", name);
//     for (const file of required) {
//     console.log(file, existsSync(join(projectP, file)));
// }
    }

        // if (!gitOk) {
        //     console.log("❌", name);
        //     console.log("- le repository git n'est pas initialisé");

            const missing = [];

            for (const file of required) {
             if (!existsSync(join(projectP, file))) {
            missing.push(file);
    }
}

            if (missing.length > 0) {
            if (missing.length === 1) {
                 console.log("Il manque", missing[0]);
          } else {
            const last = missing.pop();
             console.log("Il manque", missing.join(", "), "et", last);
    }
}
//             for (const file of required) {
//             console.log("Il manque ", file);
// }

        }

   }

        // else {
        //     console.log("❌", name);
        //     console.log("- le dossier n'existe pas où n'est pas nommé correctement");
        // }
        

}
// console.log(root);

// import { readdirSync } from "fs";

// const files = readdirSync("C:/Users/DELL/Ada/projets");

// if (files.includes(".git")) {;

// console.log("git ok");}