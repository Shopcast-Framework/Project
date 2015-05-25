# Frontend - GUI

Projet développé en NodeJs basé sur le framework web 'Express' 4.0 et Socket.IO  
Le templating utilisé est le système JADE

## Lancer le serveur

Accéder à la racine du dépôt :

> cd your_path_to_the_repository/Frontend-GUI

Ensuite, il suffit de lancer le serveur avec la commande suivante : 

> npm start

Le serveur devrait se lancer et écrire :

> `>` eip@0.0.0 start /home/guerin_f/Project/Epitech/Github/Frontend-GUI  
> `>` node ./bin/www

Et voilà ! Le serveur est lancé, maintenant il suffit d'accèder à l'url : 

**[http://localhost:3000](http://localhost:3000)**


## Avancement du projet

Le projet est actuellement une coquille vide, en attente des protocoles afin de récupérer les données : 

- L'architecture NodeJs/Express/Socket.IO fonctionnelle.
- Téléchargement des fichiers sur le serveur via websocket. 
- Design Css générale dans l'esprit flat design.
- Création de divers plugins contenu dans "libraries" -> Gestion de fichiers, Gestion du menu, Traduction, Mysql.
- Création des fichiers de traduction contenu dans "languages".
- Création des différentes vue contenu dans "views".

### Ressources

- [En savoir plus sur JADE](http://jade-lang.com/reference/includes/).
- [En savoir plus sur NodeJs](https://nodejs.org/)
- [En savoir plus sur Express](http://expressjs.com/)
- [En savoir plus sur Socket.IO](http://socket.io/)