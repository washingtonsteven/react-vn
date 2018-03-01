# react-vn

## Visual Novel / Text Adventure Player and Editor

### Getting started

This is served up as a React app (hence, 'react' in the name). The React app was boostrapped with Create React App and then ejected. Maybe I should have forked instead? (I only ejected for sass processing and aliasing `/src`).

1. Clone the repo
2. `yarn install`
3. (Optional) Edit `story.json` in `/src/data`
4. `yarn start`

### Walkthrough

#### Player/Story
First screen you see is the 'Player' or 'Story' screen. Here you can click the buttons to advance the (frankly amazing) 'story'. At times you may be prompted to enter some data, and other times you will add items to your inventory.

#### Editor
Click 'Edit' to get to the story editor. Here you can add new 'Nodes' (pages of text) and each node can have a number of 'NodeLinks'.

Node Content is plain text. You can use `#{varName}` to access data stored from Input NodeLinks (see below). There is currently no way to access the inventory in Node Content

There are 3 types of NodeLinks
- Default - These just take you to a destination page
- Input - These prompt you for some data (which will be stored in the Story's state), before moving to the next node
- Inventory - These will increment (or decrement) the number of a certain item in the user's inventory. There is no bound checking, so it's possible to have -1 of something.

Click "Save & Continue" or "Save & Quit" to save the story, and click "Play" to play it immediately! You can also hit "Back to List" to return to the Node List without saving.

Click "Export" to get a .json file with your story in it.

### Upcoming Features

- Finishing this README.
- Fixing the `<label>` and `name`/`id` attributes in NodeLinkEditor...since there can be multiple on a page.
- More here: https://trello.com/b/CZ9sbVSJ