# xiangqiboard.js

xiangqiboard.js is a JavaScript xiangqiboard component. It depends on [jQuery].

Please see [xiangqiboardjs.com] for documentation and examples.

## What is xiangqiboard.js?

xiangqiboard.js is a JavaScript xiangqiboard component with a flexible "just a
board" API that

xiangqiboard.js is a standalone JavaScript Xiangqi Board. It is designed to be "just
a board" and expose a powerful API so that it can be used in different ways.
Here's a non-exhaustive list of things you can do with xiangqiboard.js:

- Use xiangqiboard.js to show game positions alongside your expert commentary.
- Use xiangqiboard.js to have a tactics website where users have to guess the best
  move.
- Integrate xiangqiboard.js and [xiangqi.js] with a PGN database and allow people to
  search and playback games (see [Example 5000])
- Build a xiangqi server and have users play their games out using the
  xiangqiboard.js board.

xiangqiboard.js is flexible enough to handle any of these situations with relative
ease.

## What can xiangqiboard.js **not** do?

The scope of xiangqiboard.js is limited to "just a board." This is intentional and
makes xiangqiboard.js flexible for handling a multitude of xiangqi-related problems.

Specifically, xiangqiboard.js does not understand anything about how the game of
xiangqi is played: how a knight moves, who's turn is it, is Red in check?, etc..

Fortunately, the powerful [xiangqi.js] library deals with exactly this sort of
problem domain and plays nicely with xiangqiboard.js's flexible API. Some examples
of xiangqiboard.js combined with xiangqi.js: [5000], [5001], [5002].

Please see the powerful [xiangqi.js] library for an API to deal with these sorts
of questions.


This logic is distinct from the logic of the board. Please see the powerful
[xiangqi.js] library for this aspect of your application.



Here is a list of things that xiangqiboard.js is **not**:

- A xiangqi engine
- A legal move validator
- A PGN parser

xiangqiboard.js is designed to work well with any of those things, but the idea
behind xiangqiboard.js is that the logic that controls the board should be
independent of those other problems.

## Docs and Examples

- Docs - <https://lengyanyu258.github.io/xiangqiboardjs/docs>
- Examples - <https://lengyanyu258.github.io/xiangqiboardjs/examples>

## License

xiangqiboard.js is released under the terms of the [MIT License].

[jQuery]:https://jquery.com/
[xiangqiboardjs.com]:https://lengyanyu258.github.io/xiangqiboardjs/index.html
[xiangqi.js]:https://github.com/lengyanyu258/xiangqi.js
[Example 5000]:https://lengyanyu258.github.io/xiangqiboardjs/examples#5000
[5000]:https://lengyanyu258.github.io/xiangqiboardjs/examples#5000
[5001]:https://lengyanyu258.github.io/xiangqiboardjs/examples#5001
[5002]:https://lengyanyu258.github.io/xiangqiboardjs/examples#5002
[MIT License]:LICENSE.md
