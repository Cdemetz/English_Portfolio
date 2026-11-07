# CLAUDE.md

Instructions pour Claude Code sur ce dépôt.

## Le projet

Site CV et portfolio personnel de Clément Demetz, réalisé pour le module **R3.12 (anglais)** à l'**IUT d'Annecy**.
C'est un projet universitaire : le code doit rester simple, lisible et facile à expliquer à un enseignant.

## Consignes du devoir (R3.12)

Source : diaporama du cours R3.12, parties 5 « Website + Portfolio » et 6 « Evaluation ». Ces consignes passent avant les préférences de design.

- **Rendu : fin de la semaine 48** (entre le 23 et le 29 novembre 2026, jour exact à confirmer).
- **Dépôt :** dossier `~/public_html/portfolio` sur le serveur OVH de l'IUT. Le site est servi depuis un sous-dossier : tous les liens et chemins doivent être **relatifs** (jamais de `/` au début).
- **Technique évaluée :** CSS + JS. Pas de CMS ni de framework back.

### Partie 1 – Resume : contenu obligatoire

Tout le contenu du CV PDF doit se retrouver sur le site, pas forcément dans le même ordre ni avec les mêmes rubriques :
- nom, phrase courte qui dit qui je suis, « About me », photo (facultative) ;
- tech skills, soft skills, langues avec leur niveau ;
- expériences de la plus récente à la plus ancienne : entreprise + ville/pays, missions, compétences acquises ; les SAÉ en font partie ;
- formation : citer le diplôme français puis son équivalence (BUT = « Bachelor's Degree of Technology » ; Bac = « French Baccalaureate » + explication, car il n'a pas d'équivalent exact) ;
- 2 références ;
- loisirs / centres d'intérêt / blog ;
- une boîte « contact me » ou les coordonnées ;
- liens vers GitHub, LinkedIn et les autres profils actifs ;
- un accès rapide au portfolio depuis l'accueil ;
- **bouton CV PDF obligatoire** : il **affiche** d'abord le PDF (rangé dans `assets/cv/`) dans le navigateur, puis permet de le télécharger.

### Partie 2 – Portfolio (page Work)

- Les projets sont présentés **différemment des expériences** : tuiles avec image, détails dans une fenêtre pop-up.
- Pour chaque projet : date, contexte, ce que j'ai fait personnellement, type de travail (université / équipe / perso), technologies, organisation du projet, capture d'écran et/ou lien.
- **Projets obligatoires :** ce site lui-même (avec ses infos techniques) et le projet universitaire de BUT2 présenté comme étude de cas.
- Les meilleurs projets en premier (pas forcément dans l'ordre chronologique). Les projets non terminés, perso ou non rémunérés sont acceptés.
- **Filtre par technologie** : c'est ce qui donne les 3 points (une simple rubrique « technos » = 2 pts, des technos citées seulement dans le texte = 1 pt).
- Sans JavaScript, tous les projets et leurs détails doivent rester visibles.

### Grille d'évaluation (/40)

| Critère | Points |
|---|---|
| Présentation générale, contenu, boîte « contact me », qualité de l'anglais | 10 |
| CV PDF corrigé et optimal | 5 |
| Ergonomie du site | 5 |
| Graphisme | 5 |
| Portfolio : technologies (filtre 3 / rubrique 2 / dans le texte 1) | 3 |
| Portfolio : date, contexte et présentation des projets | 3 |
| Expériences et projets en 2 parties distinctes | 2 |
| Portfolio : ce site + projet BUT2 en étude de cas | 2 |
| Portfolio : type de travail (université, équipe, perso…) | 2 |
| Portfolio : captures d'écran / liens | 2 |
| Bouton CV PDF (afficher avant de télécharger) | 1 |

## Langues

- **Contenu du site : en anglais** (textes, titres, boutons, attributs `alt`, `<title>`, métadonnées). C'est un cours d'anglais : soigner l'orthographe et la grammaire. La qualité de l'anglais est notée.
- **Ponctuation anglaise : pas d'espace avant `? ; : !`.**
- **Messages de commit et commentaires dans le code : en anglais**, par cohérence avec le reste du projet.
- **Échanges avec moi : en français.**

## Stack technique

- HTML5, CSS3 et JavaScript vanilla uniquement.
- **Pas** de framework (React, Vue, Bootstrap, Tailwind…), **pas** de CMS, **pas** de build (npm, bundler, préprocesseur).
- Le site doit fonctionner en ouvrant simplement `index.html` dans un navigateur, et une fois déposé dans un sous-dossier du serveur OVH (chemins relatifs uniquement).
- Pas de dépendance externe sans me demander (une police Google Fonts est acceptable si je la valide).

## Structure

```
index.html          Page d'accueil (Home)
about.html          Présentation (About)
experience.html     Parcours et expériences / CV (Experience)
work.html           Projets / réalisations (Work)
interests.html      Centres d'intérêt (Interests)
contact.html        Contact
assets/
  css/variables.css   Variables CSS (couleurs, typographie, espacements) — source unique des valeurs de design
  css/base.css        Reset, typographie, styles globaux, mise en page
  css/components.css  Composants réutilisables (header, nav, boutons, cartes, footer…)
  js/main.js          Tout le JavaScript du site
  img/                Images
  cv/                 CV téléchargeable (PDF)
```

Ordre de chargement des CSS dans chaque page : `variables.css`, puis `base.css`, puis `components.css`.

## Conventions

### HTML
- HTML sémantique : `header`, `nav`, `main`, `section`, `article`, `footer`, une seule `<h1>` par page, hiérarchie de titres respectée.
- `<html lang="en">`, `<meta charset="UTF-8">`, `<meta name="viewport">`, un `<title>` et une `<meta name="description">` propres à chaque page.
- Le header et le footer sont identiques sur les 6 pages : toute modification doit être reportée partout. Le lien de la page courante porte `aria-current="page"`.
- Indentation de 2 espaces.

### CSS
- Aucune couleur, taille de police ou espacement « en dur » : utiliser les variables de `variables.css`.
- Approche mobile-first, avec des media queries pour les écrans plus larges.
- Noms de classes clairs en anglais et en kebab-case (ex. `project-card`, `site-header`).
- Pas de `!important` sauf cas justifié.

### JavaScript
- JS vanilla moderne (`const`/`let`, fonctions fléchées, `addEventListener`), pas de jQuery.
- Le site doit rester utilisable si le JavaScript est désactivé (le JS améliore, il n'est pas indispensable).
- Pas d'erreur dans la console.

### Accessibilité
- Attribut `alt` pertinent sur chaque image (vide `alt=""` si décorative).
- Contraste suffisant (WCAG AA), focus clavier visible, navigation possible au clavier.
- Les liens et boutons ont un texte explicite.

### Images
- Formats web légers (WebP ou JPG compressé), noms de fichiers en minuscules sans espaces ni accents.

## Façon de travailler

- Faire des changements ciblés : ne pas réécrire ce qui n'est pas concerné par la demande.
- Avant d'ajouter une nouvelle page, une bibliothèque ou de changer la structure, me demander.
- Ne jamais inventer d'informations personnelles (expériences, diplômes, dates, coordonnées) : utiliser un texte provisoire clairement marqué `[TODO: ...]` et me le signaler.
- Après une modification visible, vérifier le rendu sur mobile et sur ordinateur.
- Commits courts et descriptifs en anglais, à l'impératif (ex. « Add projects section to portfolio »).
