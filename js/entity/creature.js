define(['basic/entity', 'config/config', 'core/graphic', 'lib/animation', 'geo/v2', 'basic/image'], function (Entity, config, graphic, Animation, V2, Image) {
	graphic.add('img/hero_gold_spritesheet.png');
	graphic.add('img/hero_silver_spritesheet.png');
	graphic.add('img/orc_red_spritesheet.png');
	graphic.add('img/orc_spritesheet.png');
	graphic.add('img/select_arrow.png');

	var ts = config.size.tile;
	var actionSpeed = 1000;

	function Creature(pos, map, level, type) {
		Entity.call(this, new V2(ts.x * pos.x, ts.y * pos.y), new V2(ts.x, ts.y));

		this.img = new Animation( 'img/orc_spritesheet.png', new V2(15,15), new V2(4,6), 200, true );
		this.add(this.img);
		this.cursor = new Image(new V2(42,-20), 'img/select_arrow.png', .5);
		this.cursor.visible = false;
		this.add(this.cursor);

		this.dest = null;
		this.mapPos = pos;
		this.movement = null;
		this.speed = 160;
		this.cooldown = 0;

		this.map = map;

		this.ep = {};
		this.levels = {};
		this.skills = {};

		for(var i in skills ) {
			this.levels[i] = level;
			this.ep[i] = getEp(level);
			this.skills[i] = skills[i].formel(level);
		}

		this.hp = this.skills.hp;;
	}

	Creature.prototype = new Entity();

	Creature.prototype.train = function(skill) {
		this.ep[skill]++;
		if(getLevel(this.ep[skill]) > this.levels[skill]) {
			this.levels[skill]++;
			this.skills[skill] = skills[skill].formel(this.levels[skill]);
		}
	};

	Creature.prototype.onClick = function() {
		this.map.selectUnit(this);
		return true;
	};

	Creature.prototype.selected = function() {
		this.cursor.visible = true;
		this.cursor.position.y = this.img.frame*2-10;
	};

	Creature.prototype.deselected = function() {
		this.cursor.visible = false;
	};

	Creature.prototype.onUpdate = function(delta) {
		if ( this.cursor.visible )
			this.cursor.position.y = this.img.frame*2-10;

		if(this.movement) {
			// walk to next tile
			this.position.x += ( this.movement.x / 1000 ) * delta;
			this.position.y += ( this.movement.y / 1000 ) * delta;

			var difX = Math.abs( this.mapPos.x * ts.x - this.position.x );
			var difY = Math.abs( this.mapPos.y * ts.y - this.position.y );

			if(difX >= ts.x || difY >= ts.y ) {
				this.mapPos.x = Math.round(this.position.x / ts.x);
				this.mapPos.y = Math.round(this.position.y / ts.y);
				this.position.x = this.mapPos.x*ts.x;
				this.position.y = this.mapPos.y*ts.y;
				this.movement = null;
			}
		} else if(this.dest) {
			// find path
			this.cooldown = 0;
			if(this.mapPos.equal(this.dest)) {
				this.dest = null;
			} else {
				var next = this.map.get(this.mapPos.x, this.mapPos.y).findPath(this.mapPos, this.dest);
				if( next ) {
					this.movement = next.dif(this.mapPos).prd(this.speed);
					if( this.movement.x < 0 ) this.img.state = 2;
					if( this.movement.x > 0 ) this.img.state = 1;
					if( this.movement.y < 0 ) this.img.state = 3;
					if( this.movement.y > 0 ) this.img.state = 0;
				}
			}
		} else {
			this.img.state = 4;
			this.cooldown += delta;

			if(this.cooldown >= actionSpeed) {
				this.cooldown -= actionSpeed;
				var room = this.map.get(this.mapPos.x, this.mapPos.y);
				room.use(this);
			}
		}
	};

	Creature.prototype.walk = function(dest) {
		var target = this.map.get(dest.x, dest.y);
		if(target == null || typeof(target) != "object") return;
		var current = this.map.get(this.mapPos.x, this.mapPos.y);
		if(!current.lookup[target.id] && current.id != target.id) return;
		this.dest = dest;
	};

	Creature.prototype.attack = function () {

	};

	return Creature;
});
