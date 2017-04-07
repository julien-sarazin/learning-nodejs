# Projet Thématique API & Webservice : Grixt

Pour votre projet de cinquième année, vous aurez 5h, par équipe de 3 à 5, pour améliorer l'API REST conçue pendant votre semaine thématique.

## Présentation : 
Grixt a pour but de devenir une plateforme de gestion de location de véhicules mise au service des personnes du réseau GES. Le principe est simple, pouvoir louer un véhicule dans un des points de retraits d'Ile de France, seul ou a plusieurs.
Votre mission est de concevoir la partie serveur, une API REST en NodeJS permettant au personnel du réseau GES de bénéficier de ce service.

### 1 - Règles d'accès
- Les services suivant seront publiques : 
    - Permettre de consulter la liste de modèles de véhicules disponibles, 
    - Permettre de consulter la liste des points de retrait/dépôt du Réseau,
    - Permette de consulter la liste des véhicules disponibles pout un point de retrait donné,
    - Permettre de s'inscrire,
    - Permettre de s'authentifier,

- Les services nécessitant d'être authentifié seront :
    - Creation/modification/supression d'un point de retrait/depot
    - Creation/modification/supression d'un véhicule
    - Location d'un véhicule
    - Retour d'un véhicule
    - Editer/supprimer un utilisateur

### 2 - Règles fonctionnelles
- un véhicule est lié à un modele de véhicule décrivant son nom, son année et le nombre de place assises,
- Un point de depot/retrait dispose d'un nombre maximum d'emplacement, d'une longitude et d'une latitude,
- Lors de la location d'un véhicule il est nécéssaire de préciser le point de retrait, le point de retour du véhicule (parmi les points disponibles fournie par la plateforme), ainsi que la date de retrait et la date de dépot.
- Lors de la location d'un véhicule, le locataire doit également préciser combien de place il désire réserver. Si cela n'atteint pas le nombre maximum de place assises, il sera possible pour un autre utilisateur de louer également cette voiture avec le nombre de place restante, si et seulement si, la date de retrait n'est pas dépassée. On assumera alors que le point/date de retrait et que le point/date de dépot sera identique au premier locataire, et ce, pour tout les locataires suivant qui voudrait partager cette voiture sur un même itinéraire.
- Il est impossible de louer un véhicule qui n'est pas disponible dans un point de retrait à la date renseignée,
- Il est impossible de rendre un véhicule dans un point de dépôt qui ne dispose pas de la capacité suffisante pour stocker le véhicule,
- Seul un administrateur peut créer un nouveau modele de véhicule,
- Seul un administrateur peut ajouter un véhicule pour un modèle donné,
- Seul un administrateur peut supprimer un véhicule, dans ce cas, si une location était en cours avec celui-ci, la location devra également être supprimée,
- Seul un utilisateur peut éditer ses propres informations (nom, prénom, adresse email)
- Seul un administrateur peut supprimer un point de depot/retrait, si et seulement si, aucune location n'a pour destination ce point de dépôt. Dans ce cas, les véhicules stockés dans ce dépôt devront eux-aussi être supprimés.
- Un véhicule peut-être loué par plusieurs utilisateurs,
- Une location à une date donnée ne peut être faite pour un utilisateur qui a déja une location de prévue à cette date.

### 3 - Règles Techniques
- L'ensemble des échanges sera fera via le `Content-Type: application/json`.
- L'identification d'un utilisateur se fera par le biais d'un échange de Token de le header `Authorization`.
- Votre projet doit être fonctionnel "from scratch" ce qui signifie que lors de la soutenance, il peut-être demandé d'écraser l'ensemble de vos données, et de démarrer sur un repertoire vide où l'on clonera votre projet depuis un repository distant. Pensez à bien initialiser vos script de démarrage et à commit/push votre code sur un gestionnaire de versions. 

### 4 - Notation 
Le projet sera noté sur 20 et la noté ramenée sur 20.

 - Une note sur 20 concernant la qualité de code et le respect du cahier des charges. (Note d'équipe)
 - Une note sur 20 concernant la qualité de la prestation orale de chacun, de la compréhension générale et des bonnes réponses *aux possibles* questions qui seront posées lors de la soutenance. (Note individuelle)

### 5 - Ordre de passage : 

- Groupes : 6, 1, 5, 2, 4, 3


