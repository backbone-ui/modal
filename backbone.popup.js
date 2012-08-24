// jQuery contentEditable() plugin
//
// Created by: Makis Tracend (@tracend)
// Source: https://gist.github.com/3446570
//
// Licensed under the MIT license: http://makesites.org/license/mit.txt

(function(_, Backbone) {

	Backbone.Popup = Backbone.View.extend({
		el: "#popup",
		template : {}, 
		// events
		events: {
			"click input[type='submit']" : "clickSubmit",
			"click .close" : "clickClose"
		},
		initialize: function(){
			_.bindAll(this, 'setup', 'render', 'update', 'center', 'clickSubmit', 'clickClose');
			// get the html fragment 
			html = this.options.html || "popup.html";
			
			$.get(html, this.setup);
		},
		setup: function( template ){
			var self = this;
	
			// loop through all the handlebar templates
			$(template).filter("script").each(function(){
				var id = $(this).attr('id');
				self.template[id] = Handlebars.compile( $(this).html() );
			});
	
		}, 
		render: function(){
			var self = this;
			console.log( this.data.toJSON() );
			var html = this.template[this.type]( this.data.toJSON() );
			$(this.el).html( html );
			// post-processing
			$(this.el).find("img").load(function(){
				self.center();
			});
		}, 
		update: function( data ){
			this.data = data;
			this.type = data.get("type");
			// render the view
			this.render();
			// presentation updates
			this.center();
			
			$(this.el).show();
		},
		// helpers
		center: function(){
			//
			var width = $(this.el).width();
			var height = $(this.el).height();
			var top = document.body.scrollTop + (window.innerHeight/2);
			$(this.el).css("top", top+"px");
			$(this.el).css("margin-left", "-"+width/2+"px");
			$(this.el).css("margin-top", "-"+height/2+"px");
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
			$(this.el).hide();
			// update the view
			return false;
		}
	});

})(this._, this.Backbone);