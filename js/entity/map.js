define(['basic/entity', 'geo/v2', 'entity/room', 'config/config'], function(Entity, V2, Room, config) {
	var size = config.size;
	var probability = .1;

	function Layout(data) {
		this.data = data;

		this.each = function(callback) {
			for(var x = 0; x < 3; x++)
				for(var y = 0; y < 2; y++)
					if(data[y][x])
						callback.call(this, x, y);
		};

		this.eachRel = function(pos, callback) {
			this.each(function(x, y) {
				callback.call(this, x+pos.x, y+pos.y);
			});
		};
	}

	function getPos(pos) {
		var x = Math.floor( pos.x/size.tile.x);
		var y = Math.floor( pos.y/size.tile.y);
		return new V2(x,y);
	}

	function Cursor() {}
	Cursor.prototype = new Entity();

	Cursor.prototype.draw = function(ctx) {
		var parent = this.parent;

		if(parent.layout) {
			var pos = getPos(parent.relativeMouse());

			parent.layout.eachRel(pos, function(x,y){
				ctx.fillStyle = parent.get(x,y) ? 'rgba(255,55,55,0.5)' : 'rgba(255,255,255,0.5)';
				ctx.fillRect(x*size.tile.x, y*size.tile.y, size.tile.x, size.tile.y);
			});
		}
	};

	function Map() {
		Entity.call(this, Zero(), new V2(size.map.x*size.tile.x, size.map.y*size.tile.y));
		this.add(new Cursor());

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

		this.selectRoom(shapes[10], null);

		// debug grid
		for(var x = 0; x < size.map.x; x++)
			this.ctx.fillRect(x*size.tile.x, 0, 1, size.map.y*size.tile.y);
		for(var y = 0; y < size.map.y; y++)
			this.ctx.fillRect(0, y*size.tile.y, size.map.x*size.tile.x, 1);
	}

	Map.prototype = new Entity();

	Map.prototype.onDraw = function(ctx) {
		ctx.drawImage(this.canvas, 0, 0);
	};

	Map.prototype.get = function(x,y) {
		if( x < 0 || y < 0 || x >= size.map.x || y >= size.map.y)
			return 1;
		return this.tiles[x][y];
	};

	Map.prototype.onClick = function(pos) {
		var p = getPos(pos);
		var self = this;
		var possible = true;

		this.layout.eachRel(p, function (x, y) {
			if (self.get(x, y)) possible = false;
		});

		if(!possible) return;
		this.addRoom(p);

		console.log(getPos(pos));
		// clear instead of setting a new one
		this.selectRoom(shapes[Math.floor(Math.random()*shapes.length)], null);
	};

	Map.prototype.addRoom = function(pos) {
		var self = this;
		var room = new Room(new V2(pos.x*size.tile.x, pos.y*size.tile.y), this.layout, this.type);
		room.setParent(this);

		this.layout.eachRel(pos, function(x,y){
			self.tiles[x][y] = room;
			room.addDoor(self.get(x-1,y), new V2(x-1,y), new V2(x,y));
			room.addDoor(self.get(x+1,y), new V2(x,y), new V2(x+1,y));
			room.addDoor(self.get(x,y-1), new V2(x,y-1), new V2(x,y));
			room.addDoor(self.get(x,y+1), new V2(x,y), new V2(x,y+1));
		});

		this.entities.unshift(room);
	};

	Map.prototype.selectRoom = function(layout, type) {
		this.layout = new Layout(layout);
		this.type = type;
	};

	return Map;
});
