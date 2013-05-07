# Backbone.js Modal extension

A simple way to extend your website content using modal containers


## Dependendies

* [Backbone.js](http://backbonejs.org/)
* [Underscore.js](http://underscorejs.org/)

This plugin also supports [Backbone APP](http://github.com/makesites/backbone-app) which automates the rendering process of html fragments, although it is not a mandatory dependency.


## Install

Using Bower: 
```
bower install backbone.ui.modal
```


## Usage

After you include the contents of the assets folder in your app folder, the modal will be available to extend with custom options. 

For example: 
```
var MyModal = Backbone.UI.Modal.extend({
	options: {
                className: "my-modal",
                close: false
        }
});
```

Each time you instantiate modal a new container will be created with the class name ```.ui-modal``` 

```
var modal = new MyModal();

```


## Options

There are a number of things that can be set as options, towards customizing the modal for each specific case. 

The options are split to the ones we use when setting up the modal and the ones used when rendering the template (if any).

### Setup options

* ***tagName***: (default: div) The type of tag that will be used to create the container of the new modal
* ***parentTag***: (default: body) The parent container where the modal will be placed
* ***className***: (default: modal) The class name assigned to the modal container

### Template options

* ***overlay***: (default: true) If we need to overlay the contents of the webpage with a seperate container. 
* ***wrap***: (default: true) If we want to wrap all the content in a ".content" container
* ***scroll*** : (default: true) If we want to disable scrolling when the modal is loaded
* ***close***: (default: true) If we want to add a close button


## Methods

In addition to adding your own methods, especially if you want to customize the rendering of the modal, you can call or extend any of the following that are already available in the view

* ***clickSubmit*** : triggered with input submission buttons in the popup

* ***clickClose*** : closes the popup container


## Credits 

Created by Makis Tracend ([@tracend](http://github.com/tracend)).

Released at [Makesites.org](http://makesites.org)

Originally called Backbone.Modal, [published as a gist](https://gist.github.com/3446570).

Distributed under the [MIT license](http://makesites.org/licenses/MIT)

