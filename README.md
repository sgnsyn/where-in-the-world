# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

### Screenshot

![](./screenshots/Screen%20Shot%202023-05-13%20at%2016.34.14.png)


### Links

- Solution URL: (https://github.com/sgnsyn/where-in-the-world)
- Live Site URL: https://sgnsyn.github.io/where-in-the-world/

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

You can use the (min-aspect ration) and (max-aspect-ration) in css to differentiate tablet and desktop of the same width

```css
@media (min-width: 600px) and (min-aspect-ratio: 3/4) and (max-aspect-ratio: 4/3) {
  /*
  your responsive code for tablet goes in here
*/
}
@media (min-width: 600px) and (min-aspect-ratio: 4/3) and (max-aspect-ratio: 3/4) {
  /*
  your responsive for desktop goes in here
*/
}
```

You can use the browser's local storage to save theme preferance localy and apply it on upon load.

```js
localStorage.setItem("theme", themeName);
```

## Author

- Frontend Mentor - [@sgnsyn](https://www.frontendmentor.io/profile/sgnsyn)
- GitHub - [@sgnsyn](https://github.com/sgnsyn)
