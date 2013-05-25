// Backbone.js Modal extension
//
// Created by: Makis Tracend (@tracend)
// Source: https://github.com/backbone-ui/modal
//
// Licensed under the MIT license:
// http://makesites.org/licenses/MIT

(function(_, Backbone) {

	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};

	// conditioning the existance of the Backbone APP()
	var View = ( APP ) ? APP.View : Backbone.View;

	Backbone.UI.Modal = View.extend({
		// every modal is a new instance...
		el: function(){ return $('<'+ this.options.tagName +' class="ui-modal '+ this.options.className +'"></'+ this.options.tagName +'>') },

		options : {
			close : true,
			overlay : true,
			wrap : true ,
			scroll : true,
			//layout : false,
			className : "modal",
			tagName : "div",
			parentTag: "body"
		},
		// events
		events: {
			"submit" : "clickSubmit",
			"click .close" : "clickClose",
			"click .overlay" : "clickClose"
		},

		initialize: function( options ){
			_.bindAll(this, 'center', 'resize','scroll', 'clickSubmit', 'clickClose');

			var self = this;
			//  el will be created by the className if not supplied...
			$( this.options.parentTag ).append( this.el );

			// unbind all previous modal events
			//$(this.el).unbind();

			// event handling - center window
			$(window).resize(function(){
			//    self.resize();
				self.center();
			});
			self.center();

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
		clickClose: function( e ){
			if(e) e.preventDefault();
			// remove all contents
			$(this.el).empty();
			// unbind events
			$(this.el).unbind();
			// remove from the page
			$(this.el).remove();
			// restore scrolling
			this.scroll( true );

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
		}
	});

// Helpers

// Underscore Mixin: camelCase()
// Source: https://gist.github.com/tracend/5530356
// Based on: http://stackoverflow.com/a/6661012
_.mixin({
	/* Convert Dashed to CamelCase */
	camelCase : function( string ){
		return  string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
	}
});

})(this._, this.Backbone);