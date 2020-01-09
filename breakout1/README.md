* References

Game Progamming in C++ book

https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Paddle_and_keyboard_controls

https://dev.to/washingtonsteven/playing-with-canvas-and-es6-classes

https://codeincomplete.com/posts/javascript-game-foundations-player-input/

https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics


* TODO

strange effects when canvas size in CSS

also,
// use offsetHeight/offsetWidth or getBoundingClientRect
// because height or width work only
// if elemement as a specified size,
// not in CSS
https://stackoverflow.com/questions/294250/how-do-i-retrieve-an-html-elements-actual-width-and-height

Read a bit more about bubbling, capture and events
with the usecapture boolean
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

Collision, update tick and rounding

Paddle collision does not happen a the same this.x, related to update tick and rounding issue

Input class or component

Collider class or component

Class construction:

I feel that creating other instances in the constructor is bad, moreover when creating
objects who references the object under construction.
JS seems OK with it, I see no race conditions in the logs, but ... console.log may not
be so trustable on this.
