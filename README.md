# react-to-do
to do list project built through react

Guide to build derived from: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks

*1. Getting Started*
* npm start to launch app
* Components can import modules they need. They must export themselves at the bottom of their files.
* Component functions are named with PascalCase.
* React reads JSX variables by putting them between curly braces, like {variable} in some HTML element.
* Some JSX attributes are different than HTML attributes so that they don't conflict with JavaScript reserved words. For example, class in HTML translates to className in JSX. Note that multi-word attributes are in camelCase.
* Props are written just like attributes inside component calls (this example was from index.js) and are passed into components.

*2. Beginning the To Do List - HTML structure/CSS*
* visually hidden classes/aria attributes for screen reader accessibility 

*3. Componentising the React app*
* break app into logical/repeated components
* feed in props to repeated components like a main method to different functions
* can export the function for a component in same statement: export default function Component(props) { return ( some JSX ); }

*4. Events and state*
* all browser events are onSomething in JSX
* as standard props are parent to child; to feed data b/w sibling components, callback props are used
* props can be functions,variables
* data the component itself owns, is called state - that is owned and updateable by the component unlike props that are only read
* hooks are functions that provide capabilities specifically for components like state
* make sure the browser dom and react data are synced