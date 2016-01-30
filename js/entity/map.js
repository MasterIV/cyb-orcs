define(['basic/entity', 'geo/v2', 'entity/room', 'config/config', 'core/graphic'], function(Entity, V2, Room, config, graphic) {
	graphic.add('img/tiles_background.png');
	var size = config.size;
	var probability = .1;

	//
	//function Path() {
	//	this.nodes = [];
	//	this.position = Zero();
	//
	//	this.setParent = function(p) {
	//		this.parent = p;
	//	};
	//
	//	this.draw = function(ctx) {
	//		if(this.nodes.length) {
	//			ctx.strokeStyle = 'red';
	//			ctx.lineWidth = 5;
	//
	//			ctx.beginPath();
	//			ctx.moveTo(9.5*size.tile.x, 9.5*size.tile.x);
	//
	//			for(var i in this.nodes) {
	//				var n = this.nodes[i].sum(new V2(.5,.5));
	//				ctx.lineTo(n.x * size.tile.x, n.y * size.tile.x);
	//			}
	//
	//			ctx.stroke();
	//		}
	//	};
	//
	//	this.getPath = function(dest) {
	//		var target = this.parent.get(dest.x, dest.y);
	//		if( target == null || typeof(target) != "object" ) return;
	//
	//		this.nodes = [];
	//		var current = new V2(9,9);
	//		var room;
	//
	//		while(current && !current.equal(dest)) {
	//			room = this.parent.get(current.x, current.y);
	//			if(!room.lookup[target.id] && room.id != target.id) return;
	//			current = room.findPath(current, dest);
	//			this.nodes.push(current);
	//		}
	//	}
	//}
	//
	//var path = new Path();

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
				this.ctx.drawImage(graphic['img/tiles_background.png'],
					size.tile.x*Math.floor(Math.random()*5), size.tile.y*Number(this.tiles[x][y]), size.tile.x, size.tile.y,
					size.tile.x*x, size.tile.y*y, size.tile.x, size.tile.y);
			}
		}
		// debug grid
		//for(var x = 0; x < size.map.x; x++)
		//	this.ctx.fillRect(x*size.tile.x, 0, 1, size.map.y*size.tile.y);
		//for(var y = 0; y < size.map.y; y++)
		//	this.ctx.fillRect(0, y*size.tile.y, size.map.x*size.tile.x, 1);
	}

	Map.prototype = new Entity();

	Map.prototype.onDraw = function(ctx) {
		ctx.drawImage(this.canvas, 0, 0);
	};

	Map.prototype.selectUnit = function(unit) {
		this.unit = unit;
	};

	Map.prototype.get = function(x,y) {
		if( x < 0 || y < 0 || x >= size.map.x || y >= size.map.y)
			return 1;
		return this.tiles[x][y];
	};

	Map.prototype.onClick = function(pos) {
		var p = this.getPos(pos);
		if( !this.layout ) {
			if( this.unit ) this.unit.walk(p);
			return;
		}
	};

	Map.prototype.addRoom = function(pos, layout, type) {
		var self = this;
		var room = new Room(new V2(pos.x*size.tile.x, pos.y*size.tile.y), layout, type);
		room.setParent(this);

		layout.eachRel(pos, function(x,y){
			self.tiles[x][y] = room;
			room.addDoor(self.get(x-1,y), new V2(x-1,y), new V2(x,y));
			room.addDoor(self.get(x+1,y), new V2(x,y), new V2(x+1,y));
			room.addDoor(self.get(x,y-1), new V2(x,y-1), new V2(x,y));
			room.addDoor(self.get(x,y+1), new V2(x,y), new V2(x,y+1));
		});

		this.entities.unshift(room);
	};

    Map.prototype.getPos = function(pos) {
        var x = Math.floor( pos.x/size.tile.x);
        var y = Math.floor( pos.y/size.tile.y);
        return new V2(x,y);
    };

	return Map;
});
