CSCI344-Project-4
=================


###### Assignment:
For this project, we'll try to get a sense of the overall sentiment of twitter using Node.js and Redis.

Your goal is to track the number of occurrences of words that have a positive emotional connotation and the number of occurrences of words that have a negative emotional connotation, and then present the results to the user (perhaps as a percentage, or some score, or maybe just a happy/sad face for the day).

The requirements are as follows:

1) You'll need to create an application that tracks words in Redis. The tracked happy/sad words should be easily changed (so store them as an array). I should be able to add my own words to the list by changing a single line of your code.

2. You should have routes in your express application that return each of the following in JSON:
  (a) the list of happy words you're tracking
  (b) the list of sad words you're tracking
  (c) the total count associated with the happy words
  (d) the total count associated with the sad words

3) You'll create a client-side application in the public directory that connects to these routes via jQuery.