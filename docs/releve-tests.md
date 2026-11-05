# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

nombre espèce: 10 espéce
nombre des gynospermes : 10+8 = 18 plants
nombre des angyospermes: 30+45+20+50+25+18+12+22 = 222 plants
les lignes à 10 plants sont: N09 = 8 plants et N10 = 10 plants
stock total:240 plants
les resultats des calculs à la main sont conformes aux resultats du code d'origine

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action                   | Attendu                                | Obtenu                               | Testeur  |
| Lister inventaire        |N01-N12                                 | N01-N12                              | ---      |
|Rechercher par code(N01)  |cacao,angiosperme,30 plants,2026-10-24| |cacao,angiosperme,30 plants,2026-10-24| KAMAGATE ABDALLAH SALIA |
|Trier gymnosperme         |N09,N10,N12                             |N09,N10,N12                           |KAMAGATE ABDALLAH SALIA|
|Synthèse des quantités    |N09,N10                                 ||N09,N10                              |FATOUMATA KONE |
| Rechercher par nom(cacao)|N01                                     |N01                                   | FATOUMATA KONE |
|Trier angiosperme         |N07,N06,N03,N08,N05,N01,N02,N04,N11     |N07,N06,N03,N08,N05,N01,N02,N04,N11   |FATOUMATA KONE|
|Quitter                   |Sortie du programme                     |Sortie du programme                   |FATOUMATA KONE |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
