## Website Performance Optimization portfolio project

Optimization of a portfolio website to achieve a Page Speed Insights score over 90 for index.html and all animations in pizza.html running at 60fps.

##Getting Started

1) Clone the Repository

```https://github.com/derekernst/frontend-nanodegree-mobile-portfolio.git ```

2) Open index.html in your browser

##Optimizations

Two areas were examined for optimization:

* index.html
* views/js/main.js

###index.html

Critical Rendering Path was optimized by:
* Implementing Grunt build tools to reduce the amount of bytes transferred across the server
* Adding media query to print.css
* Minifying images
* Inlining styles.css in index.html
* Moved the Web Font Loader to bottom of body tag
* Moved the script to asynchronously load google-analytics at the bottom of the body tag


###views/js/main.js

Scroll Animations:
* Refactored code to get rid of Forced Synchronous Layout caused by updatePositions()


Pizza slider:
* Refactored code to remove redunant components and get rid of Forced Synchronous Layout caused by determineDX()