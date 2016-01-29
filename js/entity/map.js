define(['basic/entity', 'geo/v2'], function(Entity, V2) {
	var size = {
		tile: new V2(100, 100),
		map: new V2(20, 20)
	};

	var probability = .1;

	function getPos(pos) {
		var x = Math.floor( pos.x/size.tile.x);
		var y = Math.floor( pos.y/size.tile.y);
		return new V2(x,y);
	}

	function Map() {
		Entity.call(this, Zero(), new V2(size.map.x*size.tile.x, size.map.y*size.tile.y));

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.size.x;
		this.canvas.height = this.size.y;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.fillStyle = '#9E6B55';

		this.tiles = [];
		for(var x = 0; x < size.map.x; x++) {
			this.tiles[x] = [];

			for(var y = 0; y < size.map.y; y++) {
				this.tiles[x][y] = Math.random() < probability ? 1 : null;
				if(this.tiles[x][y])
					this.ctx.fillRect(x*size.tile.x, y*size.tile.y, size.tile.x, size.tile.y);
			}
		}

		this.layout = shapes[10];
		console.log(this.layout);

		// debug grid
		for(var x = 0; x < size.map.x; x++)
			this.ctx.fillRect(x*size.tile.x, 0, 1, size.map.y*size.tile.y);
		for(var y = 0; y < size.map.y; y++)
			this.ctx.fillRect(0, y*size.tile.y, size.map.x*size.tile.x, 1);
	}

	Map.prototype = new Entity();

	Map.prototype.onDraw = function(ctx) {
		ctx.drawImage(this.canvas, 0, 0);


		if(this.layout) {
			var pos = getPos(this.relativeMouse());
			for(var x = 0; x < 3; x++)
				for(var y = 0; y < 2; y++)
					if(this.layout[y][x]) {
						ctx.fillStyle = this.tiles[x+pos.x][y+pos.y] ? 'rgba(255,55,55,0.5)' : 'rgba(255,255,255,0.2)';
						ctx.fillRect((x+pos.x)*size.tile.x, (y+pos.y)*size.tile.y, size.tile.x, size.tile.y);
					}
		}
	};

	Map.prototype.onClick = function(pos) {
		console.log(getPos(pos));
		this.layout = shapes[Math.floor(Math.random()*shapes.length)];
	};

	Map.prototype.selectRoom = function(layout, type) {

	};

	return Map;
});
