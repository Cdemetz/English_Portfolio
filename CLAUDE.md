# CLAUDE.md

Instructions pour Claude Code sur ce dépôt.

## Le projet

Site CV et portfolio personnel de Clément Demetz, réalisé pour le module **R3.12 (anglais)** à l'**IUT d'Annecy**.
C'est un projet universitaire : le code doit rester simple, lisible et facile à expliquer à un enseignant.

## Langues

- **Contenu du site : en anglais** (textes, titres, boutons, attributs `alt`, `<title>`, métadonnées). C'est un cours d'anglais : soigner l'orthographe et la grammaire.
- **Messages de commit et commentaires dans le code : en anglais**, par cohérence avec le reste du projet.
- **Échanges avec moi : en français.**

## Stack technique

- HTML5, CSS3 et JavaScript vanilla uniquement.
- **Pas** de framework (React, Vue, Bootstrap, Tailwind…), **pas** de CMS, **pas** de build (npm, bundler, préprocesseur).
- Le site doit fonctionner en ouvrant simplement `index.html` dans un navigateur.
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
