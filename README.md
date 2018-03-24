# react-vn

## Visual Novel / Text Adventure Player and Editor

[![Build Status](https://travis-ci.org/washingtonsteven/react-vn.svg?branch=master)](https://travis-ci.org/washingtonsteven/react-vn)

### About

This is a Visual Novel / Text Adventure Player and Editor for use on the web. It is React based (hence the name), and the project is scaffolded with [Create React App](https://github.com/facebook/create-react-app). As such, edits to the codebase can use a lot of the tools that the CRA team has made available.

### Getting started

This application is split up into two parts, the Editor and the Player. You use the Editor to edit/write your story, and export a .json containing all your story's data. You can then host the .json along with the Player Bundle to share your story.

#### Editing your story: Online

Not available yet! I'm going to host this soon! Until then, see the next section to edit your story offline:

#### Editing your story: Offline

You can host your own version of the editor (even locally) to generate your `story.json`:

1.  Clone the repo && `cd react-vn`
2.  `yarn install`
3.  `yarn build`
4.  `npx serve -s build`
5.  Go to http://localhost:5000
6.  Follow the prompts to edit your story, and in the editor you can click "Export" to get your story.json

#### Sharing your story

1.  Acquire a Player Bundle
2.  Place your `story.json` (Ensure that it is named `story.json` exactly) in the `data` folder
3.  Host your Player Bundle (upload via FTP or similar)

#### Getting a Player Bundle

The Player Bundle is the engine that drives your story. It is a mix of HTML, Javascript, and CSS to make the whole thing work. Basically, it's just a website!

There are two way to get it:

1.  **Download a release** (not yet available)

    * Check the releases tab for the latest .zip player bundle

2.  Build your own:
    * Clone the repo
    * `yarn install`
    * `yarn playerbuild`
    * Your player bundle is in `/player_build`

See above for how to Share your Story

### Editor Walkthrough

_This is slightly out of date as of 2018-03-19_

#### Player/Story

First screen you see is the 'Player' or 'Story' screen. Here you can click the buttons to advance the (frankly amazing) 'story'. At times you may be prompted to enter some data, and other times you will add items to your inventory.

#### Editor

Click 'Edit' to get to the story editor. Here you can add new 'Nodes' (pages of text) and each node can have a number of 'NodeLinks'.

Node Content is plain text. You can use `#{varName}` to access data stored from Input NodeLinks (see below). There is currently no way to access the inventory in Node Content

There are 3 types of NodeLinks

* Default - These just take you to a destination page
* Input - These prompt you for some data (which will be stored in the Story's state), before moving to the next node
* Inventory - These will increment (or decrement) the number of a certain item in the user's inventory. There is no bound checking, so it's possible to have -1 of something.

Click "Save & Continue" or "Save & Quit" to save the story, and click "Play" to play it immediately! You can also hit "Back to List" to return to the Node List without saving.

Click "Export" to get a .json file with your story in it.

### Upcoming Features

* Finishing this README.
* Hosting on Netlify
* More here: https://trello.com/b/CZ9sbVSJ
