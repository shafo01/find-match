# Memory Game Project
## Find and Match
This is a classic concentration game. There are a matching pair of cards. The player has to unveil each matching pair.

## Table of Contents

* [Instructions](#instructions)
* [Implementation Specifics] (#implementation specifics)
* [User Testing] (#user testing)
* [Author] (#author)
* [Acknowledgement](#acknowledgement)

## Instructions

### Prerequisites
You need to have a browser, such as Chrome, to run this game.

### To play the Game
Run this game from index.html or on github through https://shafo01.github.io/find-match/.

To start playing the game click on a card. This will start the timer. Don't worry, the timer just keep track of the number of seconds since you started playing the game. 


For every pair of cards clicked the number of moves will be increased by 1. 

If you make more than 8 or 12 incorrect moves or incorrect match  you'll lose a star or 2 stars, respectively. 

After matching all of the cards you would have successfully completed the game!!!

### JS Documentation

To view the documentation for the documentation go to js/out and click to view the index.html page in a browser of your choice. Jsdoc was used to generate the documentation for the javascript file.

### Getting Started
Clone a copy from github at https://github.com/shafo01/find-match.git

## Implementation Specifics

This game was created with Vanilla JavaScript, html and css. 

Code fonts from https://fonts.googleapis.com/css?family=Coda was used as the fonts.

 Unicode characters were used so the client doesn't have to download the images. This improve loading time - less data has to be downloaded.The Unicode characters are displayed differently on different devices. This is a positive for uniqueness but a negative for consistency in design and experience.

Gulp was used to add the prefix to the css properties. The prefixes such as -web-kit are used for cross browser compatibility.

## User Testing

So far this app was mostly tested in chrome browser on a MacBook air pc.

## Author
Shafeeza Hussain

## Acknowledgement:

To create these game I would specifically like to mention of three helpful sources:

1. A tutorial from https://3dtransforms.desandro.com/card-flip taught me how to achieve the flip card animation effect.
2. Read tutorial from w3schools about setting the timer 
3. For shuffle a code from http://stackoverflow.com/a/2450976 was provided. 


