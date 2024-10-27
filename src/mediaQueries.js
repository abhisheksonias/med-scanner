// mediaQueries.js

export const device = {
    mobileS: `(max-width: 320px)`,
    mobileM: `(max-width: 375px)`,
    mobileL: `(max-width: 425px)`,
    tablet: `(max-width: 768px)`,
    laptop: `(max-width: 1024px)`,
    laptopL: `(max-width: 1440px)`,
    desktop: `(max-width: 2560px)`,
  };
  
  // You can also export specific styling for frequently used media queries
  export const mobileOnly = `@media (max-width: 768px)`;
  export const tabletOnly = `@media (min-width: 768px) and (max-width: 1024px)`;
  