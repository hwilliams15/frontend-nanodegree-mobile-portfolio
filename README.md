## Website Performance Optimization portfolio project

# Running 
Please use the dist directory to run the application. 
To run as localhost, go to (http://localhost:8080/dist/index.html).

To use ngrok,
1. Start Python server: ```python -m SimpleHTTPServer 8080```
2. Run ngrok: ```python -m SimpleHTTPServer 8080```Use the output URL for PageSpeed Insights and append dist/index.html. For example: http://54f3a59c.ngrok.io/dist/index.html

# Index.html Optimizations
The following optimizations were made.
1. Analytics js does not modify the DOM or CSSOM. It can be loaded asynchronously using the async attribute.
2. The CSS was inlined so that the browswer will not have to download the file.
3. Media type print was specified on the print.css file since it is not needed until printing.
4. The Web Font loader library was used to asynchronously load the Google font.
5. html-minifier was used to minify the html file.
6. A viewport meta tag was added.
7. A smaller pizzeria image for the page was created. 

# Main.js Optimization
1. The style.left update was removed in favor of the CSS transform call.
2. There was no need to reposition 200 pizzas. Only a few are shown on the screen at any point in time. The number of pizzas to create is decided by doing a calculation with the height of the page and the height of the pizzas.
3. getElementsByClassName is used to replace querySelectorAll giving better performance in this case.
4. The sin calculation is done in another loop before getting to the pizza position update loop. For every scroll position, there will be 5 different values. It is better to calculate these values and store them rather than doing unnecessary computations in the pizza position update loop.

# Resize pizzas
1. Resize pizza is just setting the width of the pizza to be a percentage of the window width. All the other stuff is not needed.
2. I also removed retrieving the random pizzas out of the for loop which hurts performance
