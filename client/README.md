COMP1101 Programming Summative Assessment 2 2018-19
===================================================

Client Side
===========

project by clvp22, Durham University.

Prelims
-------

Please only read this after reading the server side README.md

Using the webpage
-----------------

 - **starting off** - After creating your TMDb account at https://www.themoviedb.org/account/signup, the first thing you want to do is authenticate you account to the webpage. 
 Click the authenticate option on the right sidebar, this will redirect you to a TMDb page asking for your permission to allow your account to be used in the webpage.
 Click allow and you will be redirected back to the webpage if the authenticating was successful, if for whatever reason it wasn't you will be told and prompted to try again.
 - **navigating the sidebar** - On the side bar you can navigate to 5 main sections ('Trending', 'Discover', 'Genres', 'People' and 'You') excluding 'Find'. 
 'Trending' displays trending films in the main grid view. 'Discover' gives you the option to display top rated, popular, now playing and upcoming films. 
 'Genres' allows you to display popular films from different genres. 'People' displays popular people (actors and directors etc.). 
 'You' gives you the option to display favourite films or films rated by you (if you have logged in and authenticated). 
 Finally, there is an authentication button to allow you to authenticate your TMDb account with the webpage, a login and create account button that redirect you to the login and create account pages on TMDb's website respectively.
 - **page content** - At the top of the main page content we have the header which displays which section of the webpage you are in. 
 Also in the header is the search bar which will search for a film or a person (depending on which section of the webpage you are in) and display the results in the grid view.
 Directly below we have a film spotlight section displaying the most popular film at the moment, with a view button. And below that we have the grid view displaying the page contents or any query results, each film/person in the grid view also has a view button. 
 Right at the bottom is the 'Next' and 'Previous' buttons for pagination of the results.
 - **film display** - To get to the film display simply click the view button on any of the films displayed in a grid view and a pop-up display will appear. Below the film cover photo there will be basic information about the film (release date, run time etc.) along with a 'rate' and 'mark as favourite' button.
 Below that will be some of the cast with view buttons and with a 'more...' button at the bottom. Below that is some of the crew with view buttons, a 'more...' button and 'similar films...' button can be found right at the bottom.
 - **person display** - To get to the person display click the view button on any person (cast or crew) displayed in a grid view and again a pop-up display will appear. Below the title, job and popularity is a large picture side by side with a short biography of the person. Below that is some films the person is invloved in with a 'more...' button at the bottom.
 - **resizing** - Resizing the webpage may collapse the sidebar, which can the be acessed by pressing the white sidebar button in the top right corner of the page.
 
Console
-------

List of console logs:
 - When an server/api fetch is successful the console logs 'api fetch success...', the console then logs the data received in JSON format.
 - When the grid, sidebar or header are updated the console logs 'DOM updated ...'.
 - When certain errors are logged by the console but most alerted to the user with 'alert(e)', most errors alerted will be authentication errors or server disconnect errors.
 - When trying to acess a page that doesn't exist the console logs '404 not found error: page out of bounds'.
 - When an object is added to a grid view the console logs 'Object added to grid...'.
 - When the data is finished being added a grid view the console logs 'data added...'.
 - When rating a film the console logs 'Rating: {rating}' and 'film rated' if the request was successful. 'delete rating' is logged when a rating is successfuly deleted.
 - If no authentication has been done then the console could log '403 forbidden error: no active session' when trying to perform certain actions.
 - If a film is marked as favourite then the console will log 'film marked as favourite' otherwise 'film unmarked as favourite'.
 
Acknowledgment
--------------

w3 schools for using their online css style sheets

License
-------

This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.




