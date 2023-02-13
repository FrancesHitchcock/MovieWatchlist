# Movie Watchlist Solo Project - Scrimba Module 9: Working with APIs 

## About The Project

This Project was built unaided from scratch following the Async JavaScript Section of the Working with APIs Module. The goals were to follow a Figma design spec and to use The Open Movie Database API at https://www.omdbapi.com/ to produce a web site consisting of a movie search page and a watchlist page.

The requirements of the project were as follows:

- Two pages: index.html and watchlist.html
- The index.html page forms the search page. This should call to the OMDb API using the search word (movie title or fragment) as the query parameter, and display the search results on the page. 
- Each movie displayed should include a button which saves the data to local storage.
- The watchlist.html page loads and displays data from local storage.

## Notes

- The async/await syntax was used for promises.
- Students were referred to the OMDb API site for instructions on how to use the API.
- The project required an API key to be generated and to be included in each API call.
- Displaying the search results in reality involved multiple calls to the API. The first call used the search term as parameter, and returned a list of movie objects with selected data including the movie unique id. The rendering required additional data so JavaScript logic was used to push the unique id of each movie to an array, then iterate over the array of movie ids, making a further call to the API for each id, and pushing a new movie object (consisting of required data only) to a movies array. Following the final iteration the movies were rendered to the index.html page as per Figma spec, using the data in the movies array.
- If no data is returned from the search an appropriate message is displayed.
- A loading gif is included to indicate that the data is in the process of being called.
- Although not a requirement of the project, the site was built to be responsive, using the mobile-first approach.
- A read more / read less button was used alongside the CSS line-clamp property when the blurb for each movie exceeds three lines of text.
- The site uses modular JavaScript to allow both the index.js and the watchlist.js files to access the same functions.

### User experience was considered throughout the project, and the following functionality incorporated:

- In addition to clicking the search button, the return key can also be pressed to initiate the search.
- The search input field includes the autofocus attribute.
- The search form resets on focus, but the search input field does not clear on rendering the movies.
- SessionStorage was used so that when a user returns from the watchlist page to the search page the last search results are still visible. 
- When the user clicks on the button to add a movie to the watchlist, if the movie is not already included in the watchlist the text briefly changes from "Watchlist" to "Added" to provide confirmation that the action has been successful. 

### Things I disovered during the project include:

- When you retrieve an array of objects from local storage the objects are not the same ones that you saved, even though they might look identical. This means that when checking to see if an object exists in an array from local storage you can't use .includes() or .indexOf() on the array. instead, you must ensure each object has a unique id property and filter for a matching id value.
- If two html pages both link to the same .js file this can cause problems, for example when the JavaScript tries to manipulate a DOM element that only exists on the other page. So in this project I made a separate .js file for each of the pages plus a shared.js file for functions which need to be accessed by both the main files.
- It is better to name DOM elements with the whole project in mind from the word go to avoid having to rename elements part-way through. Some of the class names in this project do not accurately describe the elements, but have been left as they are to avoid introducing errors.
- Different browsers to not share local storage data with each other.

Frances Hitchcock, 12 February 2023

Following feedback from the Scrimba Community on Discord the UX was improved by adding functionality to index.js so that the text of the watchlist button for each movie reflects whether the movie is included in the watchlist whenever the search list is rendered.

Frances Hitchcock, 13 February 2023

