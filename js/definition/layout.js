define(function() {
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
	}

	return Layout;
});
