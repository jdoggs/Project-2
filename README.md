This project combines two assignments using socket.io
Using the concept of "thirst" I created two pages that interpret the concept literally and figuratively.
The page for counting glasses of water intake is derivative of the exercise for counting cups of coffee. 
I chose to count water because, I actually could use an app for that - sitting at the computer for hours, I often forget to drink water! For this page, I included links to information about water intake and health from the CDC and a statistics page on global conditions for clean drinking water.

The Chat page relates to my contemplation on "thirst" and the wide range of meaning it can have. I added a date that would update everyday to organize the inputs.
In thinking about intentions for the user - I was ultimately envisioning creating a framework for the chat page that would shape into a collective long poem (https://poets.org/text/anatomy-long-poem).

The background images are from pexels and are tagged for public use. 
However, the styling for this project is the result of a lot of trial and error while trying to get more familiar with CSS. The images are really placeholders at this point. I tried to work with gradients again for this project but was unsuccessful.
I also need to get a better grasp of navigation between pages. With some help, I was able to turn the links on the landing page into buttons. However, I wasn't able to find a way to return to the landing page without using the back arrow from the browser.

CHAT APP - Single Page
----------------------
## NOTE on the socket.io update:
* The videos associated with this code use an older version of socket.io --> v2.0.
* Now, we are using a later version socket.io --> v4.0
* What this means in terms of the code is that, we USED to use
`let io = require('socket.io').listen(server);`
as the way to set up the socket on the server side.
* From NOW, we will use this instead -->
`let io = require('socket.io');
io = new io.Server(server);`

### SETUP
* Run `npm install` to load the necessary node packages
* Open two broswer windows both pointing to `localhost:3000`

### NEXT STEPS
* Save a user's name once at the beginning
* Let other user's know when someone is typing
