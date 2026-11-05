// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/plants.json';

async function main() {

  
  ouvrirSaisie();
    console.log("==================================================");
    console.log("   INVENTAIRE DE LA PÉPINIÈRE");
    console.log("   Pépinière pédagogique");
    console.log("==================================================");
  

  const afficher_menu = "--------------------- MENU --------------------- \n 1. Ajouter un plant \n 2. Lister l'inventaire \n 3. Rechercher (code, nom, groupe) \n 4. Trier (nombre de plants) \n 5. Synthèse des quantités \n 0. Quitter \n Votre choix : \n";
  let chargement = await chargerJson(FICHIER_DONNEES);
  console.log(`${chargement.length} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}`);
  try{
    let arreter = false;

    while(!arreter){
      const reponse = await demander(afficher_menu );

      switch(reponse){

        case null:
          arreter = true
        break
        
        case "0":
          arreter = true
        break

        case "1":
          const reponseA = await demander("Code du plant (ex. N11) : ");
          const reponseB = await demander("Nom commun (ex. papayer) : ");
          const reponseC = await demander("Groupe botanique (angiosperme ou gymnosperme) : ");
          const reponseD = await demander("Nombre de plants (entier) : ");
          const reponseE = await demander("Date du relevé (AAAA-MM-JJ) : ");
          const reponses = {
            id: reponseA.toUpperCase(),
            nomCommun: reponseB.toLowerCase(),
            groupe: reponseC.toLowerCase(),
            nombrePlants: reponseD,
            dateReleve: reponseE
          }

        const erreurs_probables = ajouterPlant(chargement, reponses);

        if (erreurs_probables.length > 0){
          console.log("Ajout refusé")
          for(const erreur_probable of erreurs_probables){
            console.log(erreur_probable)
          }
        console.log("L'inventaire compte toujours ", chargement.length , " espèces.")
        } else {
          
          console.log(`Plant ${reponses.id} ajouté. L'inventaire compte ${chargement.length} espèce(s)`)
        }

        await enregistrerJson(FICHIER_DONNEES, chargement)
          
        break

        case "2":
          console.log(`--- Inventaire (${chargement.length}) ---`);
          console.log(listerPlants(chargement))
        break

        case "3":
          const reponseF = await demander("--- Rechercher --- \n 1. Par code \n 2. Par nom commun \n 3. Les espèces d'un groupe botanique \n Votre choix : ");
          switch (reponseF){
            case "1":
              const reponseG = await demander("Code : ");
              const trouver_plant_code = trouverParId(chargement , reponseG.toUpperCase());
              if(!trouver_plant_code){
                console.log("cet élément n'existe pas")
              } else {
                const formatage = formaterPlant(trouver_plant_code);
                console.log(formatage)                
              }
            break
            case "2":
              const reponseH = await demander("Nom commun : ");
              const trouver_plant_nomCommun = rechercherParNom(chargement , reponseH.toLowerCase());
              if(trouver_plant_nomCommun.length > 0){
                console.log(listerPlants(trouver_plant_nomCommun))
              } else {
                console.log("cet élément n'existe pas")             
              }
            break
            case "3":
              const reponseI = await demander("groupe botanique : ");
              if(!GROUPES.includes(reponseI)){
                console.log("groupe inconnu")
              } else {
                const filtres = filtrerParGroupe(chargement, reponseI)
                console.log(listerPlants(filtres))
              }
            break
            default:
              console.log("Choix inconnu : retour au menu. ")
            break
          }
        break

        case "4":
          const reponseJ = await demander("Rentrez le groupe botanique que vous voulez trier : ");
          if(GROUPES.includes(reponseJ.toLowerCase())){
            const tableau_filtre = filtrerParGroupe(chargement , reponseJ.toLowerCase());
            console.log(`${tableau_filtre.length} du groupe ${reponseJ.toLowerCase()} :`)
            console.log(listerPlants(trierParNombrePlants(tableau_filtre)))
          } else {
            console.log("Ce groupe n'est pas valide")
          }
        break

        case "5":
          console.log("--- Synthèse de l'inventaire ---");
          if(chargement.length === 0){
            console.log("inventaire vide")
          } else {
            console.log(`Nombre d'espèces : ${chargement.length}`);
            console.log(`Stock total : ${totalPlants(chargement)}`);
            console.table(syntheseParGroupe(chargement));
            console.log(`Espèce la plus abondante : ${formaterPlant(especeLaPlusAbondante(chargement))}`);
            if(stocksFaibles(chargement, SEUIL_STOCK_FAIBLE).length > 0){
              console.log(`Stocks faibles (≤ ${SEUIL_STOCK_FAIBLE} plants) : ${stocksFaibles(chargement, SEUIL_STOCK_FAIBLE).length}`);
              console.log(listerPlants(stocksFaibles(chargement, SEUIL_STOCK_FAIBLE)))
              console.log(`Rappel : le seuil de ${SEUIL_STOCK_FAIBLE} plants est un repère pédagogique de suivi, pas une recommandation de production.`)
            } else {
              console.log(`Aucun plant n'a de valeur inférieur au seuil de ${SEUIL_STOCK_FAIBLE} plants`);
            }
            


          }
        break
       
        default:
          console.log(`Choix inconnu : « ${reponse} ». Tapez un chiffre du menu.`)
        break
      }

    }

  } catch(erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur}.`)
  }
  fermerSaisie();
}

main();
