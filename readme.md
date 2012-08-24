# Backbone.js Popup extension

A simple way to extend your website content using popup containers

## Dependendies

* Backbone.js
* Underscore.js
* Handlebars.js

## Usage

After you include the script in your dependency stack the popup will be available to extend with your options. Example: 
```
APP.Views.Popup = Backbone.Popup.extend({
	options: {
		html: "/assets/html/popup.html"
	}
});
```

Note that the "#popup" container needs to be available in the dom before initializing the popup view. 

It is dvised that you only intantiate the popup view once and reuse the same instance for different content. For example: 
```
this.popup = new APP.Views.Popup();

//...and later in your code...

this.popup.update(model)
```


## Options

* **html** : the html fragment that contains all the popup views (in hanglebars templates) 

## Methods

In addition to adding your own methods, you can call or extend any of the following that are already available in the view

* **update** : loads the popup with new data - a model or backbone collection is expected as the update data

* **clickSubmit** : triggered with input submission buttons in the popup

* **clickClose** : closes the popup container


## Credits 

Created by Makis Tracend (@tracend) for Makesites.org 

Distributed under the MIT license:
http://makesites.org/license/mit.txt



