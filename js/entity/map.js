define(['basic/entity', 'basic/image', 'geo/v2', 'entity/room', 'config/config', 'core/graphic'], function (Entity, ImageEntity, V2, Room, config, graphic) {
	graphic.add('img/tiles_background.png');
	graphic.add('img/select_arrow.png');

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

		this.target_icon = new ImageEntity(Zero(), 'img/select_arrow.png');
		this.target_dest = null;
	}

	Map.prototype = new Entity();

	Map.prototype.onDraw = function (ctx) {
		ctx.drawImage(this.canvas, 0, 0);

		if (!this.target_dest && this.unit) {
			if (this.unit.dest) {
				this.target_dest = new V2(this.unit.dest.x, this.unit.dest.y);
				this.target_icon.position.x = this.target_dest.x * size.tile.x + 23;
				this.target_icon.position.y = this.target_dest.y * size.tile.y;
				this.add(this.target_icon);
			}
		} else if (this.unit && !this.unit.dest && this.target_dest) {
			this.target_dest = null;
			this.remove(this.target_icon);
		} else if (this.unit && this.unit.dest && !this.unit.dest.equal(this.target_dest)) {
			this.target_dest.x = this.unit.dest.x;
			this.target_dest.y = this.unit.dest.y;
			this.target_icon.position.x = this.target_dest.x * size.tile.x + 23;
			this.target_icon.position.y = this.target_dest.y * size.tile.y;
		}
	};

	Map.prototype.selectUnit = function (unit) {
		if (this.unit) this.unit.deselected();
		this.unit = unit;
		this.scene.info.select(unit);
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
			if (this.unit && this.unit.checkFree(p)) this.unit.walk(p);
			return;
		}
	};

	Map.prototype.each = function (callback) {
		for (var x = 0; x < size.map.x; x++)
			for (var y = 0; y < size.map.y; y++)
				if(this.tiles[x][y] != null && typeof(this.tiles[x][y]) == "object")
					callback(this.tiles[x][y], new V2(x, y));
	};

	Map.prototype.addRoom = function (pos, layout, type) {
		var costs = 0;
		if (typeof(layout) != "undefined") {
			layout.each(function(){
				costs += type.cost;
			});
		}

		if (costs < this.scene.money || costs == 0) {
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
		}
	};

	Map.prototype.getPos = function (pos) {
		var x = Math.floor(pos.x / size.tile.x);
		var y = Math.floor(pos.y / size.tile.y);
		return new V2(x, y);
	};

	Map.prototype.getRandomTemplePosition = function() {
		var tiles = [];
		this.each(function(tile, pos) { if (tile.definition.name == 'Temple') tiles.push(pos); });

		var tries = 0;
		while(tries < 50) {
			tries++;
			var rand = Math.floor(Math.random() * tiles.length);

			// TODO: check if blocking

			return tiles[rand];
		}
		return null;
	};

	Map.prototype.getRandomSpawnPosition = function() {
		var tiles = [];
		this.each(function(tile, pos) { tiles.push(pos); });

		var tries = 0;
		while(tries < 400) {
			tries++;
			var rand = Math.floor(Math.random() * tiles.length);

			if (this.get(tiles[rand].x, tiles[rand].y).definition.name == 'Temple')
				continue;

			// TODO: check if blocking

			return tiles[rand];
		}
		return null;
	};

	return Map;
});
