define(['basic/entity', 'geo/v2', 'config/config', 'core/graphic'], function(Entity, V2, config, graphic) {
	graphic.add('img/tiles_spritesheet.png');
	graphic.add('img/doors.png');
	var ts = config.size.tile;
	var roomId = 1;

	function Door(p1, p2, map) {
		if(p1.x == p2.x) Entity.call(this, new V2(p2.x*ts.x, (p2.y-.5)*ts.y ), new V2(ts.x, ts.y));
		else Entity.call(this, new V2((p2.x-.5)*ts.x, p2.y*ts.y ), new V2(ts.x, ts.y));

		this.open = false;
		this.direction = p1.y == p2.y;

		this.points = {};
		this.points[map.get(p1.x, p1.y).id] = p1;
		this.points[map.get(p2.x, p2.y).id] = p2;
	}

	Door.prototype = new Entity();

	Door.prototype.onDraw = function(ctx) {
		ctx.drawImage(graphic['img/doors.png'],
			0, ts.y*this.direction, ts.x, ts.y,
			0, 0, ts.x, ts.y);
	};

	function Room(pos, shape, definition) {
		Entity.call(this, pos);
		this.shape = shape;
		this.definition = definition;
		this.capacity = 0;

		this.id = roomId++;
		this.lookup = {};
		this.neighbours = [];

		var self = this;
		this.shape.each(function () { self.capacity++; });
	}

	Room.prototype = new Entity();

	Room.prototype.addDoor = function(r, p1, p2) {
		if( r == this || r == null || typeof(r) != "object" || (this.lookup[r.id] && this.lookup[r.id].dist == 1)) return;
		var door = new Door(p1, p2, this.parent);
		r.connect(this, door);
		this.connect(r, door);
		this.parent.add(door);
	};

	Room.prototype.connect = function(r, door) {
		for(var id in this.lookup)
			r.distance(id, this.lookup[id].dist+1, door);
		this.distance(r.id, 1, door);
		this.neighbours.push({room: r, door: door });
	};

	Room.prototype.distance = function(id, dist, door) {
		if( !this.lookup[id] || this.lookup[id].dist > dist) {
			if( !this.lookup[id] ) this.lookup[id] = {};
			this.lookup[id].dist = dist;
			this.lookup[id].door = door;

			for(var i in this.neighbours)
				this.neighbours[i].room.distance(id, dist+1, this.neighbours[i].door);
		}
	};

	Room.prototype.findPath = function(from, dest) {
		var destRoom = this.parent.get(dest.x, dest.y);
		if( destRoom == this ) {
			if(dest.x < from.x && this == this.parent.get(from.x-1, from.y))
				return new V2(from.x-1, from.y);
			else if (dest.x > from.x && this == this.parent.get(from.x+1, from.y))
				return new V2(from.x+1, from.y);
			else if (dest.y > from.y && this == this.parent.get(from.x, from.y+1))
				return new V2(from.x, from.y+1);
			else if (dest.y < from.y && this == this.parent.get(from.x, from.y-1))
				return new V2(from.x, from.y-1);
		} else {
			if(!this.lookup[destRoom.id]) return null;
			var door = this.lookup[destRoom.id].door;
			var entrance = door.points[this.id];
			if(from.equal(entrance)) {
				for(var i in door.points)
					if(i != this.id)
						return door.points[i];
			} else {
				return this.findPath(from, entrance);
			}
		}
	};

	Room.prototype.onDraw = function(ctx) {
		ctx.drawImage(graphic['img/tiles_spritesheet.png'],
			0, shapes.indexOf(this.shape.data)*ts.y*2, ts.x*3, ts.y*2,
			0, 0, ts.x*3, ts.y*2 );
	};

	return Room;
});
