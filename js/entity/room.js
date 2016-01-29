define(['basic/entity', 'geo/v2'], function(Entity, V2) {
	var size = {
		tile: new V2(100, 100),
		map: new V2(20, 20)
	};

	function Room(pos, shape, definition) {
		this.position = pos;
		this.shape = shape;
		this.definition = definition;
		this.capacity = 0;

		this.doors = [];
		this.lookup = [];

		var self = this;
		this.shape.each(function () { self.capacity++; });
	}

	Room.prototype = new Entity();

	Room.prototype.addDoor = function(r, p1, p2) {
		if( r == this || this.doors.indexOf(r) > -1) return;
		this.doors.push(r);
	};

	Room.prototype.onDraw = function(ctx) {
		this.shape.each(function(x,y) {
			ctx.fillStyle = '#885';
			ctx.fillRect(x*size.tile.x, y*size.tile.y, size.tile.x, size.tile.y);

			ctx.fillStyle = '#333';
			if( x == 0 || !this.data[y][x-1] ) ctx.fillRect(x*size.tile.x, y*size.tile.y, 2, size.tile.y);
			if( x == 2 || !this.data[y][x+1] ) ctx.fillRect((x+1)*size.tile.x-2, y*size.tile.y, 2, size.tile.y);
			if( y == 0 || !this.data[y-1][x] ) ctx.fillRect(x*size.tile.x, y*size.tile.y, size.tile.x, 2);
			if( y == 1 || !this.data[y+1][x] ) ctx.fillRect(x*size.tile.x, (1+y)*size.tile.y-2, size.tile.x, 2);
		});
	};

	return Room;
});
