# Projet Thématique API & Webservice : Grello

Pour votre projet de cinquième année, vous aurez 5h, par équipe de 4 à 5, pour améliorer l'API REST conçue pendant votre semaine thématique.

## Présentation : 

Grello a pour but de devenir une plateforme de gestion de taches réservée aux personnes du réseau GES. Votre mission est de concevoir la partie serveur, une API REST en NodeJS permettant aux futurs étudiants de bénéficier de cette plateforme

 
### 1 - Regles d'acces
- Les services suivant seront publiques : 
     - Permettre de consulter la liste des projets 
     - Permettre de s'inscrire,
     - Permettre de s'authentifier
    
- Les services nécessitant d'être authentifié seront :
    - Permettre de CRUD un projet.
    - Permettre de CRUD une équipe.
    - Permettre de CRUD les membres d'une équipe.
    - Permettre de CRUD une tache.
    - Permettre d'attribuer un rôle à un membre d'une équipe
    - Permettre de quitter une équipe
     
### 2 - Regles fonctionelles
- Un projet ne peut contenir qu'une seul équipe.
- Une équipe ne peut être que sur un seul projet.
- Un utilisateur peut-être membre de plusieurs équipes.
- Une équipe doit obligatoirement être associée à un projet.
- Une équipe ne peut-être créée que par le créateur du projet.
- Le créateur d'une équipe rejoins automatiquement celle-ci lors de sa création avec le role "Owner".
- Une tache doit obligatoirement être associée à un projet.
- Une tache ne peut être créée que par le créateur du projet ou un membre de l'équipe associée au projet.
- L'attribution/modification d'un rôle pour un membre d'une équipe ne peut se faire que par le créateur de cette équipe.
- Les roles de membres d'une équipe sont : "Owner", "Admin", "Member"
- La suppression d'un membre de l'équipe, a l'exception du role ne peut se faire que par le créateur de l'équipe, l'administrateur, ou le membre lui-même.
- La liste des taches d'un projet est accessible par tous les membres du projet
- L'assignation d'une tache à un membre de l'équipe ne peut se faire que par le créateur de l'équipe, ou l'administrateur de l'équipe
- Un utilisateur peu quitter une équipe
- Si un utilisateur quitte une équipe, les taches qui lui sont attribuées reviennent à l'administrateur de l'équipe, si aucun administrateur est désigné, les taches reviennent au créateur de l'équipe.
- La modification d'une tache ne peut se faire que par l'utilisateur assigné sur la tache, le créateur de l'équipe ou l'administrateur.
    

### 3 - Règles Techniques
- L'ensemble des échanges sera fera via le `Content-Type: application/json`.
- L'identification d'un utilisateur se fera par le biais d'un échange de Token de le header `Authorization`.
- Votre projet doit être fonctionnel "from scratch" ce qui signifie que lors de la soutenance, il peut-être demandé d'écraser l'ensemble de vos données, et de démarrer sur un repertoire vide où l'on clonera votre projet depuis un repository distant. Pensez à bien initialiser vos script de démarrage et à commit/push votre code sur un gestionnaire de versions. 

### 4 - Notation 
Le projet sera noté sur 40 et la noté ramenée sur 20.

 - Une note sur 20 concernant la qualité de code et le respect du cahier des charges. (Note d'équipe)
 - Une note sur 20 concernant la qualité de la prestation orale, de la compréhension générale et des bonnes réponses aux questions qui seront posées lors de la soutenance. (Note individuelle)



