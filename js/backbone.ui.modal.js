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
	
	Backbone.UI.Modal = Backbone.View.extend({
		el: "#modal",
		options : {
			close : false, 
			overlay : true , 
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
			_.bindAll(this, 'setup', 'render', 'update', 'center', 'clickSubmit', 'clickClose');
			var self = this;
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
			//console.log( this.data );
			var html = this.template( this.data.toJSON() );
			$(this.el).html( html );
			// display (in case the container is hidden)
			$(this.el).show();
			// center after rendering
			//this.center();
		}, 
		update: function(){
			// render the view
			this.render();
			// presentation updates
			this.center();
			
		},
		// helpers
		center: function(){
			//
			console.log()
			var width = $(this.el).width();
			var height = $(this.el).height();
			var top = document.body.scrollTop + (window.innerHeight/2) - (height/2);
			var left = (window.innerWidth/2) - (width/2);
			$(this.el).css("top", top+"px");
			$(this.el).css("left", left+"px");
			//$(this.el).css("width", width+"px");
			//$(this.el).css("height", height+"px");
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
			return false;
		}
	});

})(this._, this.Backbone);