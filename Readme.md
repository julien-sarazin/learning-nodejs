# Projet Thématique API & Webservice : Gransformer

Pour votre projet de cinquième année, vous aurez 5h, par équipe de 3 à 5, pour améliorer l'API REST conçue pendant votre semaine thématique.

## Présentation : 
Gransformer a pour but de devenir une plateforme de jeu interactive permettant aux personnes de s'affronter virtuellement via leurs bots.
Votre mission est de concevoir la partie serveur, une API REST en NodeJS permettant au personnel du réseau GES de bénéficier de ce service.

### 1 - Règles d'accès
- Les services suivant seront publiques : 
    - Permettre de consulter la liste des Users,
    - Permettre de consulter la liste des Bots **disponibles**, (qui n'ont pas de User)
    - Permettre de consulter la liste des Weapons **disponibles**, (qui n'ont pas été Achetés)
    - Permettre de consulter la liste des Challenges,
    - Permettre de consulter le Palmares d'un User,
    - Permettre de s'inscrire,
    - Permettre de s'authentifier,

- Les services nécessitant d'être authentifié seront :
    - Création/modification/supression/Détail d'un Bot,
    - Création/modification/supression/Détail d'une Weapon,
    - Création/modification/supression/Détail d'un User,
    - Création/modification/supression/Détail d'un Challenge,
    - Accepter/Refuser un Challenge,
    - Assigner un Bot à un Challenge,
    - Créditer un User
    - Consulter la liste des Bots que l'on s'est assigné,
    - Consulter la liste des Weapons que l'on a acheté,
    
    
    
### 2 - Règles fonctionnelles
   - Il existe deux types de profile sur la plateforme, des **lambdas** et des **admins**,
   - Seul les **admins** peuvent créer des **Bots** et des **Weapons**,
   
   - Une Weapon est composé :
     - d'un `nom: String`, 
     - une `description: String`, 
     - un `prix: Number` (en crédits), 
     - de `dommages: Number`,
     - d'une `capacité: Number` (nombre de munitions),
    
   - Un User peut s'assigner un bot qui n'a pas encore été assigné,
   - Un User peut acheter des Weapons tant qu'il dispose de crédits, ce qui lui retirera des crédits,
   - Seul les **admins** peuvent créditer les User de crédits,
   - Un User peut Challenge un autre User si et seulement si : 
     - les deux Users disposent de Bot,
     - les deux Users n'ont pas déjà fait de Challenge aujourd'hui,
     - que ces Bots sont équipés d'aux moins une Weapon,
     
     
   - Un Challenge est composé :
     - d'une `date: Date`, 
     - d'une `source: UserID` , 
     - d'une `target: UserID`, 
     - d'un `winner: UserID`, 
     - d'un `status: String`,
     - de `bots: [Bots]` (maximum 2)
     
   - Les status d'un challenge sont : `Pending`, `Selecting`, `Done`, `Canceled`
   - A la création du challenge, le status de celui-ci est : `Pending`
   - Un User challengé peut **accepter** ou **refuser** ce challenge, 
        - si il accepte, le status passe en `Selecting`
        - si il refuse, le status passe en `Canceled`
        
   - Lorsqu'un Challenge est en status `Selecting` les Users peuvent choisir les Bots qu'il feront combattre
   - Une fois les deux Bots assigné au Challenge, le status passe en `Done`, le winner est automatiquement nommé via le meilleur rapport `(Dammage * Vitesse d'un Bot) / (Heath de son adversaire)` et l'attribut winner est automatiquement assigné.
   - Le Palmares d'un User correspond à lister tous les challenges dont il a été le Winner.
   - Seul un Admin peut supprimer une Weapon, si elle a été acheter par un User et assigné à un Bot, il faudra mettre à jours le bot et re-créditer le user.

### 3 - Règles Techniques
- L'ensemble des échanges sera fera via le `Content-Type: application/json`.
- L'identification d'un utilisateur se fera par le biais d'un échange de Token de le header `Authorization`.
- Votre projet doit être fonctionnel "from scratch" ce qui signifie que lors de la soutenance, il peut-être demandé d'écraser l'ensemble de vos données, et de démarrer sur un repertoire vide où l'on clonera votre projet depuis un repository distant. Pensez à bien initialiser vos script de démarrage et à commit/push votre code sur un gestionnaire de versions. 

### 4 - Notation 
Le projet sera noté sur 40 et la noté ramenée sur 20.

 - Une note sur 20 concernant le respect du cahier des charges.
 - Une note sur 20 concernant la qualité de la soutenance.
   - La qualité de la soutenance sera en grande partie évaluée sur l'enregistrement de l'ensemble des signatures implémentée sur une collection POSTMAN. 

### 5 - Ordre de passage : 

- Groupes : 1, 2, 4, 5, 3, 6, 7


