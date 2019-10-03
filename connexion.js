class Utilisateur {
  constructor(nom, prenom, email, mdp1, mdp2) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.mdp1 = mdp1;
    this.mdp2 = mdp2;
  }
}

class Vue {

  //methode de classe
  ajouterUtilisateur(utilisateur) {
    const data = document.getElementById('data-list');
    const ligne = document.createElement('tr');
    ligne.innerHTML = `
    <td>${utilisateur.nom}</td>
    <td>${utilisateur.prenom}</td>
    <td>${utilisateur.email}</td>
    <td><a href="" class="delete">X</a></td>
    `;
    data.appendChild(ligne);
  }

  supprimerUtilisateur(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  afficherMessage(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#user-form');
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  viderChamps() {
    document.getElementById('nom').value = '';
    document.getElementById('prenom').value = '';
    document.getElementById('email').value = '';
    document.getElementById('motdepasse1').value = '';
    document.getElementById('motdepasse2').value = '';
  }

}
//Ecouteur d'évènement

document.getElementById('user-form').addEventListener('submit', function(e){
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const email = document.getElementById('email').value;
  const mdp1 = document.getElementById('motdepasse1').value;
  const mdp2 = document.getElementById('motdepasse2').value;

  const utilisateur = new Utilisateur(nom, prenom, email, mdp1, mdp2);

  const vue = new Vue();

  if (nom === '' || prenom === '' || email === '' || mdp1 === '' || mdp2 === '') {
    vue.afficherMessage('Veuillez remplir tout les champs', 'erreur')
  }
  else if(mdp1 !== mdp2) {
    vue.afficherMessage('Le mot de passe n\'est pas le même', 'erreur')
  }
  else {
    vue.ajouterUtilisateur(utilisateur);

    vue.afficherMessage('Utilisateur ajouté', 'succes');

    vue.viderChamps();
  }

  e.preventDefault();

})

//Ecouteur d'évènement pour la suppression

document.getElementById('data-list').addEventListener('click', function(e){
  const vue = new Vue();
  vue.supprimerUtilisateur(e.target);
  vue.afficherMessage('Utilisateur supprimé', 'succes');

  e.preventDefault();
})
