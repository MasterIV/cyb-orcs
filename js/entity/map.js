define(['basic/entity', 'geo/v2', 'entity/room', 'config/config', 'core/graphic'], function (Entity, V2, Room, config, graphic) {
	graphic.add('img/tiles_background.png');
	var size = config.size;
	var probability = .1;

	function Map(scene) {
		Entity.call(this, Zero(), new V2(size.map.x * size.tile.x, size.map.y * size.tile.y));
		this.scene = scene;

		this.scene = scene;
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.size.x;
		this.canvas.height = this.size.y;
		this.ctx = this.canvas.getContext("2d");

		this.tiles = [];
		for (var x = 0; x < size.map.x; x++) {
			this.tiles[x] = [];

			for (var y = 0; y < size.map.y; y++) {
				this.tiles[x][y] = Math.random() < probability ? 1 : null;
				this.ctx.drawImage(graphic['img/tiles_background.png'],
					size.tile.x * Math.floor(Math.random() * 5), size.tile.y * Number(this.tiles[x][y]), size.tile.x, size.tile.y,
					size.tile.x * x, size.tile.y * y, size.tile.x, size.tile.y);
			}
		}
	}

	Map.prototype = new Entity();

	Map.prototype.onDraw = function (ctx) {
		ctx.drawImage(this.canvas, 0, 0);
	};

	Map.prototype.selectUnit = function (unit) {
		if (this.unit) this.unit.deselected();
		this.unit = unit;
		this.unit.selected();
	};

	Map.prototype.get = function (x, y) {
		if (x < 0 || y < 0 || x >= size.map.x || y >= size.map.y)
			return 1;
		return this.tiles[x][y];
	};

	Map.prototype.onClick = function (pos) {
		var p = this.getPos(pos);
		if (!this.layout) {
			if (this.unit) this.unit.walk(p);
			return;
		}
	};

	Map.prototype.addRoom = function (pos, layout, type) {
		var self = this;
		var room = new Room(new V2(pos.x * size.tile.x, pos.y * size.tile.y), layout, type, this.scene);
		room.setParent(this);

		layout.eachRel(pos, function (x, y) {
			self.tiles[x][y] = room;
			room.addDoor(self.get(x - 1, y), new V2(x - 1, y), new V2(x, y));
			room.addDoor(self.get(x + 1, y), new V2(x, y), new V2(x + 1, y));
			room.addDoor(self.get(x, y - 1), new V2(x, y - 1), new V2(x, y));
			room.addDoor(self.get(x, y + 1), new V2(x, y), new V2(x, y + 1));
		});

		this.entities.unshift(room);
	};

	Map.prototype.getPos = function (pos) {
		var x = Math.floor(pos.x / size.tile.x);
		var y = Math.floor(pos.y / size.tile.y);
		return new V2(x, y);
	};

	return Map;
});
