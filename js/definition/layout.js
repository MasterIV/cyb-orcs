define(['config/config', 'geo/v2'], function(config, V2) {
	var ts = config.size.tile;

	function Layout(data) {
		this.shape = data;
		this.data = data.layout;
		this.icon = data.icon;

		this.each = function(callback) {
			for(var x = 0; x < 3; x++)
				for(var y = 0; y < 2; y++)
					if(data.layout[y][x])
						callback.call(this, x, y);
		};

		this.eachRel = function(pos, callback) {
			this.each(function(x, y) {
				callback.call(this, x+pos.x, y+pos.y);
			});
		};

		this.iconPos = function() {
			return new V2(this.icon[0]*ts.x, this.icon[1]*ts.y);
		}
	}

	return Layout;
});
