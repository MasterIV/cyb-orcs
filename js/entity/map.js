define(['basic/entity', 'geo/v2'], function(Entity, V2) {
	var size = {
		tile: new V2(100, 100),
		map: new V2(20, 20)
	};

	var probability = .1;

	function Map() {
		Entity.call(this, Zero(), new V2(size.map.x*size.tile.x, size.map.y*size.tile.y));

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.size.x;
		this.canvas.height = this.size.y;
		this.ctx = this.canvas.getContext("2d");

		this.tiles = [];
		for(var x = 0; x < size.map.x; x++) {
			this.tiles[x] = [];

			for(var y = 0; y < size.map.y; y++) {
				this.tiles[x][y] = Math.random() < probability ? 1 : null;
			}
		}
	}

	Map.prototype = new Entity();

	Map.prototype.selectRoom = function(layout, type) {

	};

	return Map;
});
