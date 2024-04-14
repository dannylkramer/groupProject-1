<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#link-to-deployed-application">Link to Deployed Application</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
Blog Demo

![Project Blog Post Demo](/assets/blogPostDemo.gif)


This project was designed to teach us about a two page website that takes input and outputs dynamic blog posts using local storage. This simple blog post app is a great example to explore the document object model's power.

Here's why we're doing this:
* Sets the stage for more advanced JavaScript tasks
* Experience organizational file structure with a multi page site
* Showcase the importance of local storage
* Explore Document Object Model's power


<!-- GETTING STARTED -->
## Getting Started

Please follow these steps if you'd like to clone the repo so you can can see the files yourself

### Prerequisites

Please have a GitHub account and set up your SSH key so you may git pull the latest changes to the repository. It's
reccomended to install Visual Studio code as well.

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:stvrmrz/Challenge-04-Blog.git
   ```
3. Open the repo 
   ```sh
   cd Challenge-04-Blog
   ```
4. Open with VS Code
   ```sh
   code .
   ```

<!-- USAGE EXAMPLES -->
## Link to Deployed Application

_Here is a link to my [Deployed Blog Web Page](https://stvrmrz.github.io/Challenge-04-Blog/)_

<!-- ROADMAP -->
## Roadmap

GIVEN a personal blog
- [x] WHEN I load the app,
      THEN I am presented with the landing page containing a form with labels and inputs for username, blog title, and blog content.
- [x] WHEN I submit the form,
      THEN blog post data is stored to localStorage.
- [x] WHEN the form submits,
      THEN I am redirected to the posts page.
- [x] WHEN I try to submit a form without a username, title, or content,
      THEN I am presented with a message that prompts me to complete the form.
- [x] WHEN I view the posts page,
      THEN I am presented with a header, with a light mode/dark mode toggle, and a "Back" button.
- [x] WHEN I click the light mode/dark mode toggle,
      THEN the page content's styles update to reflect the selection.
- [x] WHEN I click the "Back" button,
      THEN I am redirected back to the landing page where I can input more blog entries.
- [x] WHEN I view the main content,
      THEN I am presented with a list of blog posts that are pulled from localStorage.
- [x] WHEN I view localStorage,
      THEN I am presented with a JSON array of blog post objects, each including the post author's username, title of the post, and post's content.
- [x] WHEN I take a closer look at a single blog entry in the list,
      THEN I can see the title, the content, and the author of the post.
- [x] WHEN I view the footer,
      THEN I am presented with a link to the developer's portfolio.

See the [closed issues](https://github.com/stvrmrz/Challenge-04-Blog/issues/1) for a full list of features.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Steve Ramirez - [@stvrmrz](https://twitter.com/stvrmrz) - stevearamirez@gmail.com

Project Link: [https://github.com/stvrmrz/Challenge-04-Blog](https://github.com/stvrmrz/Challenge-04-Blog)

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Here are some of the resources that I used that I want to give credit to:

* [othneildrew Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
* [lipsum](https://www.lipsum.com/)
* [stack overflow](https://stackoverflow.com/questions/5392882/why-is-chrome-showing-a-please-fill-out-this-field-tooltip-on-empty-fields)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
* [w3schools](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
* [CSS Tricks)](https://css-tricks.com/dark-modes-with-css/)