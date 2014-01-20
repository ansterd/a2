window.BowView = Backbone.View.extend({
	el: '#bow',
	template: _.template($('#tmpl_bow').html()),
	events: {
		'click .button': 'shoot',
		'click #reset' : 'resetBow',
		'keyup input' : 'enter'
	},
	
	enter: function(e) {
		if (e.which === 13) {
			$('a.button', '#bow').trigger('click');	
		}
	},
	
	resetBow: function() {
		Backbone.history.loadUrl(Backbone.history.fragment);
	},
	
	shoot: function(e) {
		var input = $('input', '#bow');
		
		var currentAction = window.location.href.split('/');
		var arrow = $(input).val();
		
		if ( arrow == "" ) {
			return;
		}
		
		if ( currentAction[3] == '#service' && currentAction.length < 5) {
			this.serviceShoot(arrow);
		} else {
			this.regionShoot(arrow);
		}
	},
	
	regionShoot: function(arrow) {
		
		var insertedOptions = arrow.split(' ');
		var command = makeInstanceCommand(insertedOptions);
		
		window.appView.instances.url = ('/instances/' 
		+ command.service_name + '/'
		+ command.instance_id + '/'
		+ command.instance_type + '/'
		+ command.instance_state + '/'
		+ command.region + '/'
		+ command.public_ip + '/'
		+ command.private_ip + '/'
		+ command.security_group
		);
		
		console.log(command);
		
		window.appView.instanceList.render();
		
	}, 
	
	serviceShoot: function(arrow) {
		var insertedOptions = arrow.split(' ');
		var command = makeServiceCommand(insertedOptions);
		
		// window.appView.serviceList.render();
		
        var results = window.appView.serviceList.rendered.where(command);
        results = _.map(results, function(item) {
                return item.toJSON();	
        });
        
        window.appView.serviceList.rendered.reset(results);
	},
	
	render: function() {
		this.removeAll();
		var tmpl = this.template();
		this.$el.append(tmpl);
	},
	
	removeAll: function() {
		this.$el.html('');
	}
	
});

function makeServiceCommand(insertedOptions) {
	var command = {};
	
	_.each(insertedOptions, function(item) {
        var parsedOption = item.split('=');
        if ( parsedOption.length === 2 ) {
                        
            switch(parsedOption[0].toLowerCase()) {
            case 'service' : 
            case 'serv' : 
            case 'ser' : command.service_name = parsedOption[1]; break;
            case 'instance-number' :
            case 'instance' : command.instance_number = Number(parsedOption[1]); break;
            // case 'alert-number' : 
            // case 'alert' : command.alert_number = Number(parsedOption[1]); break;
            case 'running' : 
            case 'run' : command.state_running = Number(parsedOption[1]); break;
            case 'pending' : 
            case 'pend' : command.state_pending = Number(parsedOption[1]); break;
            case 'stopped' :
            case 'stop' : command.state_stopped = Number(parsedOption[1]); break;
            case 'terminated' : 
            case 'term' : 
            case 'ter' : command.state_terminated = Number(parsedOption[1]); break;
            };
   		}
    });
	
	return command;	
};

function makeInstanceCommand(insertedOptions) {
	
	var command = {};
	
    _.each(insertedOptions, function(item) {
        var parsedOption = item.split('=');
        if ( parsedOption.length === 2 ) {
                        
            switch(parsedOption[0].toLowerCase()) {
            case 'service' : 
            case 'serv' : 
            case 'ser' : command.service_name = parsedOption[1]; break;
            case 'instance-id' :
            case 'id' : command.instance_id = parsedOption[1]; break;
            case 'instance-type' : 
            case 'type' : command.instance_type = parsedOption[1]; break;
            case 'instance-state' : 
            case 'state' : command.instance_state = parsedOption[1]; break;
            case 'region' : 
            case 'reg' : command.region = parsedOption[1]; break;
            case 'public-ip' :
            case 'public' : 
            case 'pub' : command.public_ip = parsedOption[1]; break;
            case 'private-ip' :
            case 'private' : 
            case 'pri' : command.private_ip =  parsedOption[1]; break;
            case 'security-group' :
            case 'security' :
            case 'sec' : command.security_group =  parsedOption[1]; break;
            };
   		}
    });
    
    return command;
};
