# Vaujany App

Application React (Create React App) pour borne tactile : exploration de la flore et mini-jeux.

## Lancer le projet en local

Prérequis : [Node.js](https://nodejs.org/) 22 ou plus récent (testé avec Node 25) et npm.

```bash
git clone https://github.com/PaulDoazan/vaujany-app.git
cd vaujany-app
npm install
npm start
```

L'application s'ouvre sur [http://localhost:3000](http://localhost:3000) et se recharge automatiquement à chaque modification.

> Il n'y a pas de script `npm run dev` : le serveur de développement se lance avec `npm start`.

## ⚠️ Résolution d'écran : 3840 × 2160

L'application est conçue pour un écran **4K de 3840 × 2160 px** (format paysage) et ne s'adapte pas aux autres tailles. Sur un écran classique, il faut simuler cette résolution dans le navigateur :

1. Ouvrir les outils de développement (`F12` ou `Cmd + Option + I` sur Mac).
2. Activer le mode appareil (*Toggle device toolbar*, `Cmd + Shift + M` / `Ctrl + Shift + M`).
3. Choisir **Responsive** et saisir **3840** × **2160** comme dimensions.
4. Régler le zoom de l'aperçu (par exemple *Fit to window*) pour voir tout l'écran.

Les interactions sont pensées pour le tactile, mais elles fonctionnent aussi à la souris.

## Autres commandes

| Commande | Rôle |
| --- | --- |
| `npm run build` | Génère la version de production dans `build/` |
| `npm run deploy` | Build puis publie sur GitHub Pages (branche `gh-pages`) |
