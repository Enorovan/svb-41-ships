# svb-41-ships
# Projet :  
Le projet décrit l'implémentation un algorithme en swarm utilisant des grafcets et une machine à états.

L'algorithme est construit pour la simulation SVB.

Nous avons ici construit un swarm avec différents types de vaisseaux qui ont un rôle différent dans swarm.
# Algorithme Swarm  : 
  Le but principal est de détruire tous les vaisseaux ennemis, pour cela en as distribuer les déférentes tâches 
  qui mènent à ce but sur différent agents intelligents qui communiquent entre eux pour élargir le champ de détections
  et augmenter le nombre de vaisseaux détruits.

## Agents
### Attacker
  - L'agent est utilisé pour faire du repérage dans l'espace, l'attaque des ennemies repérer et il part en renfort quand il reçoit une position ennemie.
### Scout
  - L'agent est utilisé seulement pour faire du repérage dans l'espace, il détecte les positions ennemies et les transmit ou alliers.
### Reserve
  - L'agent est utilisé pour les renforts, il protège les zones qui font appel à lui, en lui envoyant la position de leur ennemie.
### Defender
 - L'agent est utilisé pour protéger une position précise, on l'affecte aux positions critiques par exemple : le vaisseau mère.
