/*
 * Backbone UI: Modal
 * Source: https://github.com/backbone-ui/modal
 * Copyright © Makesites.org
 *
 * Initiated by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function (lib) {

	//"use strict";

	// Support module loaders
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define('backbone.ui.modal', ['jquery', 'underscore', 'backbone'], lib);
	} else if ( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		lib(window.jQuery, window._, window.Backbone);
	}

}(function ($, _, Backbone) {

	// support for Backbone APP() view if available...
	var APP = window.APP || null;
	var isAPP = ( APP !== null );
	var View = ( isAPP && typeof APP.View !== "undefined" ) ? APP.View : Backbone.View;

	// Shims
	// parent inheritance from Backbone.APP
	var parent=function(a,b){a=a||"",b=b||{},this.__inherit=this.__inherit||[];var c=this.__inherit[a]||this._parent||{},d=c.prototype||this.__proto__.constructor.__super__,e=d[a]||function(){delete this.__inherit[a]},f=b instanceof Array?b:[b];return this.__inherit[a]=d._parent||function(){},e.apply(this,f)};

	var Modal = View.extend({
		// every modal is a new instance...
		el: function(){ return $('<'+ this.options.tagName +' class="ui-modal '+ this.options.className +'"></'+ this.options.tagName +'>') },

		options : {
			close : true,
			overlay : true,
			blocking: false,
			wrap : true ,
			scroll : true,
			//layout : false,
			className : "modal",
			tagName : "div",
			parentTag: "body"
		},
		// events
		events: {
			"submit form" : "clickSubmit",
			"click .close" : "clickClose",
			"click .overlay:not(.blocking)" : "clickClose"
		},

		initialize: function( options ){
			_.bindAll(this, 'center', 'resize','scroll', 'clickSubmit', 'clickClose');

			var self = this;
			//  el will be created by the className if not supplied...
			// check if the element already exists in the DOM (move this to postRender?)
			if( !document.body.contains(this.el) )
				$( this.options.parentTag ).append( this.el );
			// unbind all previous modal events
			//$(this.el).unbind();

			// event handling - center window
			$(window).resize(function(){
			//    self.resize();
				self.center();
			});
			self.center();
			// on scroll, center the modal
			$(window).scroll( _.bind(this.center, this) );

			return View.prototype.initialize.call( this, options );

		},
		/*
		setup: function( template ){
			var self = this;
			// include snippets
			// - add close button
			if( this.options.close ){
				template = '<a class="close">[x]</a>' + template;
			}
			// - wrap the content
			if( this.options.wrap ){
				template = '<div class="content">'+ template +'</div>';
			}
			// - add overlay
			if( this.options.overlay ){
				template = '<div class="overlay"><!-- --></div>' + template;
			}
			// override default template with your own compiler...
			this.template = _.template( template );
			// loop through all the handlebar templates

			$(template).filter("script").each(function(){
				var id = $(this).attr('id');
				self.template[id] = Handlebars.compile( $(this).html() );
			});

			// attempt to render straight away
			this.render();

		},
		render: function(){
			if( !this.template ) return;
			var data = ( this.data ) ? this.data.toJSON() : {};
			var html = this.template( data );
			// add el to the DOM (if not available)
			if(!$(this.el).parent().length){
				$("body").find("script:first").before(this.el);
			}
			$(this.el).html( html );
			// display (in case the container is hidden)
			$(this.el).show();
			// center after rendering
			this.center();
			// check scrolling
			this.scroll( false );
		},
		*/

		postRender: function(){
			// display (in case the container is hidden)
			$(this.el).show();
			// center after rendering
			this.center();
			// check scrolling
			this.scroll( false );
		},

		update: function(){
			// render the view
			//this.render();
			// presentation updates
			//this.center();
		},
		// helpers
		center: function(){
			var scrollTop = document.getElementsByTagName("body")[0].scrollTop || document.getElementsByTagName("html")[0].scrollTop || 0;
			$(this.el).css("top", scrollTop+"px");
			/*
			// find the content container, fallback to the outter container
			var container = ($(this.el).find(".content").length ) ? $(this.el).find(".content") :  this.el;
			var width = $(container).width();
			var height = $(container).height();
			// Firefox / IE scroll the html tag - Webkit (properly) the body tag...
			var scrollTop = document.getElementsByTagName("body")[0].scrollTop || document.getElementsByTagName("html")[0].scrollTop || 0;
			var top = scrollTop + (window.innerHeight/2) - (height/2);
			var left = (window.innerWidth/2) - (width/2);
			$(container).css("top", top+"px");
			$(container).css("left", left+"px");
			// position the overlay, if any
			if($(this.el).find(".overlay").length ){
				$(this.el).find(".overlay").css("top", scrollTop+"px");
			}
			*/
		},
		resize: function( e ){
			// re-calculate proportions...
		},
		// process submit triggers
		clickSubmit: function( e ){

			// Convention: if the form has an id, try to find a method that matches the camelcase version of the id
			var id = e.target.id || false;
			if( !id ) return false;
			var method = _.camelCase(id);
			if(typeof this[method] != "undefined") this[method](e);

			return false;

		},

		onClose: function() {},

		clickClose: function( e ){
			if(e) e.preventDefault();
			// element
			var $el = $(this.el);
			// trigger close animation (optional)
			$el.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function(){
				// remove all contents
				$el.empty();
				// unbind events
				$el.unbind();
				// remove from the page
				$el.remove();
			});
			$el.addClass("close");
			// restore scrolling
			this.scroll( true );
			// user events

			this.onClose();

			return false;
		},
		scroll : function( flag ){
			if( !this.options.scroll && app ){
				// check if there's a model for the app state
				if(app.state){
					if( app.state instanceof Backbone.Model ){
						app.state.set({ scroll : flag });
					} else {
						app.state.scroll = flag;
						// trigger app.update
						if(app.update) app.update();
					}
				} else {
					app.scroll = flag;
					// hardcode a 'no-scroll' class on the body?
				}
			}
		},

		// Helpers

		// call methods from the parent
		parent: View.prototype.parent || parent,

	});


	// Utils

	// Underscore Mixin: camelCase()
	// Source: https://gist.github.com/tracend/5530356
	// Based on: http://stackoverflow.com/a/6661012
	_.mixin({
		/* Convert Dashed to CamelCase */
		camelCase : function( string ){
			return  string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
		}
	});


	// update Backbone namespace regardless
	Backbone.UI = Backbone.UI ||{};
	Backbone.UI.Modal = Modal;

	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		// update APP namespace
		if( isAPP ){
			APP.UI = APP.UI || {};
			APP.UI.Modal = Modal;
			window.APP = APP;
		}
		window.Backbone = Backbone;
	}

	// for module loaders:
	return Modal;


}));
