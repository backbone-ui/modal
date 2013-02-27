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
		options : {
			close : false, 
			overlay : true ,
			wrap : false ,
			scroll : true,  
			html : "",
			template : "assets/html/modal.html", 
			layout : false
		}, 
		// events
		events: {
			"click input[type='submit']" : "clickSubmit",
			"click .close" : "clickClose"
		}, 
		initialize: function( options ){
			_.bindAll(this, 'setup', 'render', 'update', 'center', 'scroll', 'clickSubmit', 'clickClose');
			var self = this;
			// set the el if not defined
			if( !this.el ) this.el = $("#modal");
			
			// unbind all previous modal events
			$(this.el).unbind();
			// get the data
			this.data = this.model || this.collection || false;
			this.template = false;
			// 
			// set the template
			var template = this.options.template || false;
			
			// check if there is a layout for the modal first...
			
			// get the template
			if(template){ 
				$.get(template, this.setup);
			} else {
				// get the html fragment 
				// we fallback to the 'static' html 
				this.setup( this.options.html ); 
			}
			//bind data to changes
			if( this.data ){
				this.data.bind("change",  this.render);
				this.data.bind("reset",  this.render);
				// render now if there are already data
				if( this.data.length ) this.render();
			}
			// center window
			$(window).resize(function(){
				self.center();
			});
			self.center();
			
		},
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
			/*
			$(template).filter("script").each(function(){
				var id = $(this).attr('id');
				self.template[id] = Handlebars.compile( $(this).html() );
			});
			*/
			// attempt to render straight away
			this.render();
			
		}, 
		render: function(){
			if( !this.template ) return;
			var data = ( this.data ) ? this.data.toJSON() : {};
			var html = this.template( data );
			$(this.el).html( html );
			// display (in case the container is hidden)
			$(this.el).show();
			// center after rendering
			this.center();
			// check scrolling
			this.scroll( false );
		}, 
		update: function(){
			// render the view
			this.render();
			// presentation updates
			//this.center();
		},
		// helpers
		center: function(){
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
		}, 
		// click triggers
		clickSubmit: function( e ){
			e.preventDefault();
			
			// process request...
			
			// after sending the request, close the panel
			this.clickClose();
			
			return false;
			
		},
		clickClose: function( e ){
			e.preventDefault();
			// remove all contents
			$(this.el).empty();
			// unbind events
			$(this.el).unbind();
			// hide from the page
			$(this.el).hide();
			// check scrolling
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
					}
				} else {
					app.scroll = flag;
					// hardcode a 'no-scroll' class on the body? 
				}
			}
		}
	});

})(this._, this.Backbone);