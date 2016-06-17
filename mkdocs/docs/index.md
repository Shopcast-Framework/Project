Chaque personne du groupe dispose de sa propre branche désormais.

# Interface utilisateur

Cette interface permet aux utilisateurs de Shopcast de pouvoir gérer tous leurs contenu facilement et de manière intuitive.

#### Requis

Lors de la première utilisation de l'interface, effectuer les actions suivante :
- Installer la base de données
- Créer l'utilisateur login : **shopcast** & mdp : **toto**
- Lancer la commande **npm install** à la racine

#### Utilisation

```
> cd frontend
> gulp
```
L'interface est lancé sur le port 3001. Pour accéder à l'interface -> **http://localhost:3001/signin**

# Api

L'api permet de requeter l'ensemble des données. Elle utilise le standart rest est sera vouée à le respecter. Elle est l'unique accès direct a la base de données.

### Architecture

Elle utilise le système MVC. Les vues n'ayant pas un interet particulier pour le formattage du JSON il n'y en a pas et les controlleurs retournent directement les données.

### Formattage des requetes

Les requetes se forme suivant le principes REST.
Un model a donc les routes suivantes de crée :

- **/api/model** GET retourne l'ensemble des models
- **/api/model** POST crée un nouveau model en utilisant le body de la requete
- **/api/model/:id** GET retourne le model correspondant à :id
- **/api/model/:id** DELETE supprime le model correspondant à :id
- **/api/model/:id** PUT edit le model correspondant à :id

Le body pour les requetes PUT et POST devra etre de la forme suivante :

    {
        attr1: value1,
        attr2: value2
    }

### Formattage des reponses

Les reponses sont tout au format JSON.
Chaque reponse a directement un attribut message avec comme valeur un chaine de carectere decrivant le resultat de la requete.

    {
        message : "Sucess"
        attr1 : value1
    }

### Utilisation

```
> cd midend
> gulp
```

### Modules

##### api.js

Ce module permet de créer automatiquement les routes.
Il relit chaque route defini dans le fichier config/routes.js à une fonction du controller.
Le fichier de config permet aussi de setter le middlewares.

##### orm.js

Load l'ensemble des models. A la fin du loading crée les relations entre les models.
A la fin de ce process le module recrée l'ensemble des tables inexistantes avec les bonnes colonnes.

### Middlewares

Les middlewares sont defini dans le fichier config/routes.js
A chaque requete les middlewares correspondant à la requete sont automatiquement appelés.

##### middlewares/auth.js

Permet de verifier la correcte authentification de l'utilisateur.

# Site vitrine

Ce site est template static visant à promouvoir et expliquer le principe de Shopcast.

#### Utilisation

A la racine, ouvrir la page **index.html** via votre navigateur préféré.

#### Reste à faire

- [x] Mettre en place le template.
- [ ] Traduire tous les contenus.
- [ ] Enlever les lorem ipsum.

