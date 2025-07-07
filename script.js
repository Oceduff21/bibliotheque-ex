let livre = new Object ();

// exemple de livres

livre1 = {
titre: "1984",
auteur: "George Orwell",
isbn: "1234567890",
categorie: "Fiction",
disponible: true 
};

livre2 = {
titre: "Le Meilleur des Mondes",
auteur: "Aldous Huxley",
isbn: "0987654321",
categorie: "Science Fiction",
disponible: false
};


let tLivres = [] ; // Tableau pour stocker les livres 
function ajouterLivre (unlivre) {
    tLivres.push(unlivre);
}

    ajouterLivre(livre); // Ajoute le nouveau livre au tableau

ajouterLivre(livre1) ; ajouterLivre(livre2); // Ajoute le livre au tableau


// Fonction pour trouver les livres

function rechercherLivre (titre, ISBN) {
    if (ISBN === undefined || ISBN === "") { // Si l'ISBN n'est pas fourni ou est vide
        return(tLivres.find(livre => livre.titre === titre)); // Recherche par titre uniquement
    } else if (titre === undefined || titre === "") { // Si le titre n'est pas fourni ou est vide 
        return(tLivres.find(livre => livre.isbn === ISBN)); // Recherche par ISBN uniquement

    } else {
        return tLivres.find(livre => livre.titre === titre && livre.isbn === ISBN);   // Recherche par titre et ISBN    
    }
}

// Fonction pour modifier les livres

function modifierLivre (ISBN, livreModifie) {
    let livre = rechercherLivre("", ISBN);
    if (livre) {
        ndx = tLivres.indexOf(livre);
        tLivres[ndx] = livreModifie; // Met à jour le livre trouvé avec les nouvelles informations
        return true; // Retourne true si la modification a réussi
    } else {
        return false; // Si le livre n'est pas trouvé, retourne false
    }
}

function supprimerLivre (ISBN) {
    let livre = rechercherLivre("", ISBN);
    if (livre) {
        ndx = tLivres.indexOf(livre);
        tLivres.splice(ndx, 1); // Supprime le livre trouvé du tableau
        return true; // Retourne true si la suppression a réussi
    } else {
        return false;
    }
}



//gestion des usagers

let usager = new Object ();

let usagers = [] ; // Tableau pour stocker les usagers
function ajouterUsager (unUsager) {
    usagers.push(unUsager);
}

ajouterUsager(usager); // Ajoute le nouvel usager au tableau

// Fonction pour trouver les usagers
function rechercherUsager (nom, prenom) {
    if (prenom === undefined || prenom === "") { // Si le prénom n'est pas fourni ou est vide
        return(usagers.find(usager => usager.nom === nom)); // Recherche par nom uniquement
    } else if (nom === undefined || nom === "") { // Si le nom n'est pas fourni ou est vide
        return(usagers.find(usager => usager.prenom === prenom)); // Recherche par prénom uniquement
    } else {
        return usagers.find(usager => usager.nom === nom && usager.prenom === prenom); // Recherche par nom et prénom
    }
}   

// Fonction pour modifier les usagers
function modifierUsager (nom, prenom, usagerModifie) {
    let usager = rechercherUsager(nom, prenom);
    if (usager) {
        ndx = usagers.indexOf(usager);
        usagers[ndx] = usagerModifie; // Met à jour l'usager trouvé avec les nouvelles informations
        return true; // Retourne true si la modification a réussi
    } else {
        return false; // Si l'usager n'est pas trouvé, retourne false
    }
}       

// Fonction pour valider les usagers
function validerUsager (nom, prenom) {
    let usager = rechercherUsager(nom, prenom);
    if (usager) {
        usager.valide = true; // Marque l'usager comme valide
        return true; // Retourne true si la validation a réussi
    } else {
        return false; // Si l'usager n'est pas trouvé, retourne false
    }
}   

//fonction pour emprunter un livre
function emprunterLivre (ISBN, nomUsager, prenomUsager) {
    let livre = rechercherLivre("", ISBN);
    let usager = rechercherUsager(nomUsager, prenomUsager);
    if (livre && usager && usager.valide) {
        if (livre.disponible) {
            livre.disponible = false; // Marque le livre comme emprunté
            return true; // Retourne true si l'emprunt a réussi
        } else {
            return false; // Si le livre n'est pas disponible, retourne false
        }
    } else {
        return false; // Si le livre ou l'usager n'est pas trouvé, retourne false
    }
}

// Fonction pour retourner un livre
function retournerLivre (ISBN) {
    let livre = rechercherLivre("", ISBN);
    if (livre) {
        livre.disponible = true; // Marque le livre comme disponible
        return true; // Retourne true si le retour a réussi
    } else {
        return false; // Si le livre n'est pas trouvé, retourne false
    }
}

//fonction pour vérifier les retards 
function verifierRetard (ISBN, dateRetour) {
    let livre = rechercherLivre("", ISBN);
    if (livre && !livre.disponible) {
        let dateEmprunt = new Date(livre.dateEmprunt); // Supposons que la date d'emprunt est stockée dans l'objet livre
        let dateLimite = new Date(dateEmprunt);
        dateLimite.setDate(dateLimite.getDate() + 30); // Ajoute 30 jours à la date d'emprunt pour la limite de retour
        return dateRetour > dateLimite; // Retourne true si la date de retour est dépassée
    } else {
        return false; // Si le livre n'est pas trouvé ou est disponible, retourne false
    }
}   

//statistiques et rapports 

function LivresLesPlusEmpruntes() {
    let livresEmpruntes = tLivres.filter(livre => !livre.disponible);
    livresEmpruntes.sort((a, b) => b.emprunts - a.emprunts); // Trie les livres par nombre d'emprunts décroissant
    return livresEmpruntes.slice(0, 5); // Retourne les 5 livres les plus empruntés
}

function categoriesLesPlusPopulaires() {
    let categories = {};
    tLivres.forEach(livre => {
        if (categories[livre.categorie]) {
            categories[livre.categorie]++;
        } else {
            categories[livre.categorie] = 1;
        }
    });
    let categoriesArray = Object.entries(categories);
    categoriesArray.sort((a, b) => b[1] - a[1]); // Trie les catégories par nombre de livres décroissant
    return categoriesArray.slice(0, 5); // Retourne les 5 catégories les plus populaires
}

// Fonction pour générer un rapport de bibliothèque
function genererRapportMensuelBibliotheque() {
    let rapport = {
        totalLivres: tLivres.length,
        livresEmpruntes: tLivres.filter(livre => !livre.disponible).length,
        usagersValides: usagers.filter(usager => usager.valide).length,
        categoriesPopulaires: categoriesLesPlusPopulaires(),
        livresLesPlusEmpruntes: LivresLesPlusEmpruntes()
    };
    return rapport;
}


