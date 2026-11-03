# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | N05 |
| nomCommun |nom des espèces |texte |bsent des données | - |tomate |
| groupe |groupe |texte |liste |bsent des données |- | angyosperme|
| nombrePlant |nombre de plants |nombre |bsent des données |- |50 |
| date relevé|date à laquelle les données ont étés pris |date |absent des données|- |2026-10-24 |

**Listes de valeurs autorisées** : id:N+ numéro de la ligne; nomCommun:nom de l'espèce; groupe: angiosperme ou gymnosperme;datereleve:année-mois-jour

**Sources** :plants.json
