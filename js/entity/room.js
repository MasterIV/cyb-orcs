define(['basic/entity', 'geo/v2', 'config/config', 'core/graphic', 'basic/image', 'entity/actionanimation'], function(Entity, V2, config, graphic, Image, Actionanimation) {
	graphic.add('img/tiles_spritesheet.png');
	graphic.add('img/doors.png');

	graphic.add('img/rooms/axe_red.png');
	graphic.add('img/rooms/axe_white.png');
	graphic.add('img/rooms/base_red.png');
	graphic.add('img/rooms/base_white.png');
	graphic.add('img/rooms/defence_red.png');
	graphic.add('img/rooms/defence_white.png');
	graphic.add('img/rooms/gold_red.png');
	graphic.add('img/rooms/gold_white.png');
	graphic.add('img/rooms/meat_red.png');
	graphic.add('img/rooms/meat_white.png');
	graphic.add('img/rooms/housing_red.png');
	graphic.add('img/rooms/housing_white.png');

	graphic.add('img/gold_icon.png');
	graphic.add('img/repair_icon.png');
	graphic.add('img/heart_icon.png');

	var ts = config.size.tile;
	var roomId = 1;

	function Door(p1, p2, map) {
		if(p1.x == p2.x) Entity.call(this, new V2(p2.x*ts.x, (p2.y-.5)*ts.y ), new V2(ts.x, ts.y));
		else Entity.call(this, new V2((p2.x-.5)*ts.x, p2.y*ts.y ), new V2(ts.x, ts.y));

		this.open = false;
		this.cooldown = 0;
		this.direction = p1.y == p2.y;

		this.points = {};
		this.points[map.get(p1.x, p1.y).id] = p1;
		this.points[map.get(p2.x, p2.y).id] = p2;
	}

	Door.prototype = new Entity();

	Door.prototype.onDraw = function(ctx) {
		ctx.drawImage(graphic['img/doors.png'],
			ts.x*this.open, ts.y*this.direction, ts.x, ts.y,
			0, 0, ts.x, ts.y);
	};

	Door.prototype.toggle = function() {
		this.open = true;
		this.cooldown = 600;
	};

	Door.prototype.onUpdate = function(delta) {
		if(this.open) {
			this.cooldown -= delta;
			this.open = this.cooldown > 0;
		}
	};

	function Room(pos, shape, definition, scene) {
		Entity.call(this, pos);
		this.scene = scene;
		this.shape = shape;
		this.definition = definition;
		this.capacity = 0;

		this.id = roomId++;
		this.lookup = {};
		this.neighbours = [];
		this.supply = 0;

		this.gold = definition.gold;
		this.heal = definition.heal;
		this.train = definition.train;
		this.ranged = definition.ranged;

		this.maxHp = 0;

		this.cooldown = definition.cooldown;
		this.delta = 0;
		this.progress = 0;

		var self = this;
		var costs = 0;

		this.shape.each(function () {
			if(definition.supply)
				self.supply += definition.supply;
			costs += definition.cost;
			self.maxHp += definition.hp;
			self.capacity++;
		});

		this.hp = this.maxHp;
		scene.housings += this.supply;

		this.add(new Image(shape.iconPos().sum(new V2(14, 14)), definition.pic, .8));
		this.overlay = new Image(shape.iconPos().sum(new V2(14, 14)), definition.pic.replace('white', 'red'), .8);
		this.add(this.overlay);

		if(definition.inflation)
			definition.cost += this.capacity = definition.inflation;

		if(costs) {
			this.add(new Actionanimation(costs, this.shape, false, graphic['img/gold_icon.png']));
			scene.money -= costs;
		}
	}

	Room.prototype = new Entity();

	Room.prototype.harm = function (damage) {
		if(this.hp < 1) return;
		this.hp = Math.max(0, this.hp - damage);
		if(this.hp < 1) this.scene.housings -= this.supply;
	};

	Room.prototype.repair = function(skill) {
		if(this.hp < 1 && skill) this.scene.housings += this.supply;
		this.add(new Actionanimation(skill, this.shape, true, graphic['img/repair_icon.png']));
		this.hp = Math.min(this.maxHp, this.hp+skill);
	};

	Room.prototype.use = function(creature) {
		if(this.hp < this.maxHp) {
			this.repair(creature.skills.repair);
			creature.train('repair');
			return;
		}

		if(this.gold) {
			this.progress += creature.skills.miner;
			creature.train('miner');
		}

		if(this.ranged) {
			this.progress += creature.skills.ranged;
			creature.train('ranged');
		}

		if(this.train) {
			creature.train('attack');
			creature.train('hp');
		}

		if(this.heal) {
			var heal = Math.round(creature.skills.hp * this.heal);
			creature.hp = Math.min(creature.hp+heal, creature.skills.hp);
			if(creature.hp < creature.skills.hp)
				this.add(new Actionanimation(heal, this.shape, true, graphic['img/heart_icon.png']));
		}
	};

	Room.prototype.onUpdate = function(delta) {
		if(this.overlay) this.overlay.alpha = 1-(this.hp/this.maxHp);
		if(this.hp > 0 && (this.gold || this.ranged)) {
			this.delta += delta;

			if(this.delta >= this.cooldown) {
				this.delta -= this.cooldown;

				if( this.gold ) {
					var additionalMoney = (this.progress * this.gold * 1000 / this.cooldown) | 0;
					this.scene.money += additionalMoney;
					this.add(new Actionanimation(additionalMoney, this.shape, true, graphic['img/gold_icon.png']));
				}

				if( this.ranged ) {
					var damage = (this.progress * this.ranged * 1000 / this.cooldown) | 0;
					var target = this.findCreatureTarget();
					if( target ) target.harm(damage);
				}

				this.progress = 0;
			}
		}
	};

	Room.prototype.findCreatureTarget = function() {
		var closest = null;
		var dist = null;

		for(var i in this.scene.viewport.entities) {
			var e = this.scene.viewport.entities[i];
			if(e.enemy) {
				var d = e.position.dist(this.position);
				if( dist == null || d < dist ) {
					dist = d;
					closest = e;
				}
			}
		}

		return closest;
	};

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
				door.toggle();
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
			0, shapes.indexOf(this.shape.shape)*ts.y*2, ts.x*3, ts.y*2,
			0, 0, ts.x*3, ts.y*2 );
	};

	return Room;
});
