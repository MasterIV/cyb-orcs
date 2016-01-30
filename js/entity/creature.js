define(['basic/entity', 'config/config', 'core/graphic', 'lib/animation', 'geo/V2'], function (Entity, config, graphic, Animation, V2) {
	graphic.add('img/hero_gold_spritesheet.png');
	graphic.add('img/hero_silver_spritesheet.png');
	graphic.add('img/orc_red_spritesheet.png');
	graphic.add('img/orc_spritesheet.png');
	var ts = config.size.tile;

	function Creature(pos, map, type) {
		Entity.call(this, new V2(ts.x * pos.x, ts.y * pos.y), new V2(ts.x, ts.y));

		this.img = new Animation( 'img/orc_spritesheet.png', Zero(), new V2(4,4), 200, true );
		this.add(this.img);

		this.dest = null;
		this.mapPos = pos;
		this.movement = null;
		this.speed = 200;

		this.map = map;

		//this.skill = null;
		//this.hp = null;
		//this.attack = null;
		//this.randomPos = {};
		//this.randomPosition();
	}

	Creature.prototype = new Entity();

	Creature.prototype.onUpdate = function(delta) {
		if(this.movement) {
			this.position.x += ( this.movement.x / 1000 ) * delta;
			this.position.y += ( this.movement.y / 1000 ) * delta;

			var difX = Math.abs( this.mapPos.x * ts.x - this.position.x );
			var difY = Math.abs( this.mapPos.y * ts.y - this.position.y );

			if(difX >= ts.x || difY >= ts.y ) {
				this.mapPos.x = Math.round(this.position.x / ts.x);
				this.mapPos.y = Math.round(this.position.y / ts.y);
				this.position.x = this.mapPos.x*ts.x;
				this.position.y = this.mapPos.x*ts.y;
				this.movement = null;
			}
		} else if(this.dest) {
			if(this.mapPos.equal(this.dest)) {
				this.dest = null;
			} else {
				var next = this.map.get(this.mapPos.x, this.mapPos.y).findPath(this.mapPos, this.dest);
				if( next ) {
					this.movement = this.mapPos.dif(next).prd(this.speed);
					if( this.movement.x < 0 ) this.img.state = 1;
					if( this.movement.x > 0 ) this.img.state = 2;
					if( this.movement.y < 0 ) this.img.state = 3;
					if( this.movement.y > 0 ) this.img.state = 0;
				}
			}
		}
	};

	Creature.prototype.walk = function(dest) {
		//console.log()

		var target = this.map.get(dest.x, dest.y);
		if(target == null || typeof(target) != "object") return;
		var current = this.map.get(this.mapPos.x, this.mapPos.y);
		if(!current.lookup[target.id]) return;
		this.dest = dest;
	};

	Creature.prototype.attack = function () {

	};

	return Creature;
});
