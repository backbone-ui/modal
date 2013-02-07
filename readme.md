# Note: Development of this Extension has moved to Backbone UI: 
http://github.com/backbone-ui/modal

# Backbone.js Modal extension

A simple way to extend your website content using modal containers

## Dependendies

* [Backbone.js](http://backbonejs.org/)
* [Underscore.js](http://underscorejs.org/)
* [Handlebars.js](http://handlebarsjs.com/)
* [Backbone.APP](http://github.com/makesites/backbone-app)

## Install

Using Bower: 
```
bower install backbone.modal
```

## Usage

After you include the script in your dependency stack the popup will be available to extend with your options. Example: 
```
APP.Views.SimpleModal = APP.Views.Modal.extend({
	options: {
		html: "/assets/html/simple.html"
	}
});
```

Note that the "#popup" container needs to be available in the dom before initializing the popup view. 

It is advised that you only intantiate the popup view once and reuse the same instance for different content. For example: 
```
this.modal = new APP.Views.SimpleModal();

//...and later in your code...

this.modal.update(model)
```


## Options

* **html** : the html fragment that contains all the popup views (in hanglebars templates) 

## Methods

In addition to adding your own methods, you can call or extend any of the following that are already available in the view

* **update** : loads the popup with new data - a model or backbone collection is expected as the update data

* **clickSubmit** : triggered with input submission buttons in the popup

* **clickClose** : closes the popup container


## Credits 

Created by Makis Tracend ([@tracend](http://github.com/tracend)) for [Makesites.org](http://makesites.org)

Distributed under the [MIT license](http://makesites.org/license/mit.txt)

