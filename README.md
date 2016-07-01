## learning-nodejs
A repository based on courses given to students learning nodejs

## Evaluation
Le TP compte 20 tests, 1 points par tests.

> ### Dépendances :
- mongodb
- node/npm :
- mocha : `npm install -g mocha`

Pour que votre projet soit fonctionnel, il faut installer ces dépendances.
Vous ne devez pas supprimer ces dépendances, vous pouvez cependant rajouter celles que vous souhaitez.
> ###  Installation :
 - `npm i`

 Pour connaître l'avancer de votre Evaluation vous poucez tester votre code à tout moment.

> ### Tester son code (à titre indicatif, les tests seront mis à jours ultérieument):
> - placez vous à la racine de votre projet
> - lancer la commande `mocha`
(ne fonctionne pas sur windows, sans git bash)

## Sujet

Vous devez construire une API qui gère un portail évenementiel.
Cette API propose :

- de créer des évènements
- de créer un compte
- de modifier ses informations personelles
- de se connecter (login)
- de se déconnecter (logout)
- de rejoindre un évenement
- de quitter d'un évènement

Les règles fonctionnelles sont les suivantes :
- un utilisateur doit contenir au mininmum un email et un passord,
- un utilisateur doit être authentifié pour créer un évènement,
- un utilisateur doit être authentifié pour modifier ses informations personelles,
- les informations personelles de l'utilisateur (password) ne doivent jamais être transmises sauf lors de sa création,
- un utilisateur est automatiquement ajouté comme participant lorsqu'il créé un évènement,
- un utilisateur doit être authentifié pour rejoindre un évènement
- un utilisateur doit être authentifié pour quitter un évènement,
- le créateur d'un évènement n'a pas le droit de quitter son propre évènement.
- un évènement doit contenir au minimum un titre
- un évènement ne peut être supprimé que si le seul participant est son créateur.


