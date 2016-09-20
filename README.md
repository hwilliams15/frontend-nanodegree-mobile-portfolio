## Website Performance Optimization portfolio project

Please use the dist directory to run the application. 

### Running
* Start Python server: ```python -m SimpleHTTPServer 8080```
* You can now go to http://localhost:8080/dist/index.html

### Ngrok
* To use ngrok, first install dependencies by running ```npm install``` in the root folder of the project.
* Run ngrok: ```node_modules/ngrok/bin/ngrok http 8080``` Use the output URL for PageSpeed Insights and append dist/index.html. For example, http://54f3a59c.ngrok.io/dist/index.html

### Grunt
* To rebuild dist directory with Grunt, just type grunt in the root folder of the project.

### Index.html Optimizations
The following optimizations were made.

* Analytics.js does not modify the DOM or CSSOM. It can be loaded asynchronously using the async attribute.
* The CSS was inlined so that the broswer will not have to download the file.
* Media type print was specified on the print.css file since it is not needed until printing.
* The Web Font loader library was used to asynchronously load the Google font.
* html-minifier was used to minify the html file.
* A viewport meta tag was added.
* A smaller pizzeria image for the page was created.

### Main.js Optimizations
* The style.left update was removed in favor of the CSS transform call.
* There was no need to reposition 200 pizzas. Only a few are shown on the screen at any point in time. The number of pizzas to create is decided by doing a calculation with the height of the page and the height of the pizzas.
```javascript
var numPizzas = Math.ceil(window.innerHeight / s) * cols;
for (var i = 0; i < numPizzas; i++) {...}
```
* getElementsByClassName is used to replace querySelectorAll giving better performance in this case.
* The x value shift calculation is done in another loop before getting to the pizza position update loop. For every scroll position, there will be 5 different values. It is better to calculate these values and store them rather than doing unnecessary computations in the pizza position update loop.
```javascript
for(var i=0;i<5;i++){
phaseValues.push(100*Math.sin(scrollTopAdjustVal + i));
  }
```

### Resize Pizzas Optimizations
* Resize pizza is just setting the width of the pizza to be a percentage of the window width. All the other stuff is not needed and overly complicated. The provided sizeSwitcher function is multiplied by the window width to get the new pizza width.
```javascript
var newWidth = sizeSwitcher(size) * windowWidth + 'px';
```
* Retrieving the random pizzas inside the for loop hurts performance. This was done before entering the loop.
* offsetWidth is a call which causes layout. It was being called every iteration of the loop. This was moved to a variable before entering the loop.
```javascript
var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
```
