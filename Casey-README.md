# In order to have the collapsable Facets, one needs to install two packages.

## Install Tailwind.

## Install packages.
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

## Configure tailwind.config.js
Add your react components within the content property to ensure Tailwind properly scans your code for class usage.

## Add the following to src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;


# Install @react-fontawesome. There are three packages to install.

## Add SVG Core
npm i --save @fortawesome/fontawesome-svg-core

## Add Icon Packages
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons

## Add the React Component
npm i --save @fortawesome/react-fontawesome@latest