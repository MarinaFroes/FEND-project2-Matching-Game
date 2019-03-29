
![Favicon](/img/favicon.png) 
# Matching Game - Udacity Front-End Nanodegree Project 2

## Introduction

This Matching game is the second project of the Udacity Front-End Nanodegree and follows the "Memory Game project rubric" and the following style guides provided by Udacity:
- CSS Style Guide
- HTML Style Guide
- JavaScript Style Guide

The HTML and CSS files were validated by the followings validators  without any errors or warnings.
- [W3C HTML Validator](https://jigsaw.w3.org/css-validator/)
- [W3C CSS Validator](https://validator.w3.org/)

## Overview

This project is organized as follows:
 - index.html 
 - README.md 
 - /css
   - app.css -> style sheet 
 - /img
   - favicon.png -> my logo
   - jason-leung-479251-unspash.jpg -> background for the congratulations modal
   - confectionary.png -> background for the game
 - /js
   - app.js -> vanilla JavaScript file

## How does it work?

- Display cards on the deck
  - The deck of cards is initially composed by an empty `ul` element.
  - The `arrayOfIcons` stores the icons that will be distributed on the deck inside of `li` elements. 
  - Each icon appears once in the array. Then the `arrayOfIcons` is duplicated.
  - The `shuffles()` function reorganizes randomly the `arrayOfIcons`.
  - The `addCardsToDeck()` function creates `li` elements with their own icon inside and appends them as children to the `ul` `.deck` element.
- Open cards
  - The `openCard()` function is an event handler `onclick` on the `ul` `#deck` element and add the class `.open` to the clicked `li` element if it doesn't have this class already.
  - `openCard()` also invokes the function `countMoves()` that counts each click on closed cards, `manageTimer()` that starts the timer and `addOpenCardsToList()`. 
  - The `addOpenCardsToList()` function adds clicked card to the `arrayOfClickedCards` and invokes the `isItAMatch()` function if `arrayOfClickedCards` has 2 items.
- Check matching
  - The `isItAMatch()` function adds cards to `openCardsArray`if they match, otherwise, it invokes `notAMatch()` function.
  - `isItAMatch()` also invokes `starRating()` to update the `starCounter` based on the `moveCounter` and the `finishGame()` function if `openCardsArray` has 16 cards (which means that all the cards on the deck were matched).
  - The `notAMatch()` function removes the class `.open` from the clicked cards in order to close them again.
- Additional Features
  - The `countMoves()` function increments the value of `moveCounter` every time a card is open.
  - The `starRating()` function decrements the value of `starCounter` based on the value of `moveCounter` and invokes `finishGame()` if `starCounter` is equal to zero.
  - The `manageTimer()` function starts or stops the timer by invoking the `timer()` function.
  - The `timer()` invokes `addLeftZero()` to add left zero to minutes and seconds and updates the timer.
- Finish game
  - The `finishGame(true)` is invoked by `isItAMatch()` if `openCardsArray` has 16 cards. Then it invokes `displayModal('win')` to display the Congratulations Modal.
  - The `finishGame(false)` is invoked by `starRating()` if `starCounter` is equal to 0. Then it invokes `displayModal('lose')` to display the Try Again Modal.
  - `finishGame()` also invokes `manageTimer()` to stop the `timer()` function.
  
## How to install and use it?

Considering it uses only vanilla JavaScript, HTML and CSS, it is not necessary to install additional features. 
Just download the files and double click on the index.html file.
It works fine in Chrome (Version 73.0.3683.86), Firefox (Version 66.0.2) and Safari (Version 12.0.3).
This game works in different sizes of screens as well.


## References

- [MDN Documentation](https://developer.mozilla.org)
- Shuffle function from [Stack Overflow](http://stackoverflow.com/a/2450976)
- [CSS3 Animate](http://cssanimate.com/)
- confectionary.png - Background pattern from [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/) 
- jason-leung-479251-unsplash.jpg - by Jason Leung from [Unsplash](https://unsplash.com/)
