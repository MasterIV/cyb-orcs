define(['basic/entity', 'config/config', 'core/graphic', 'lib/animation', 'geo/V2', 'basic/image'], function (Entity, config, graphic, Animation, V2, Image) {
	graphic.add('img/hero_gold_spritesheet.png');
	graphic.add('img/hero_silver_spritesheet.png');
	graphic.add('img/orc_red_spritesheet.png');
	graphic.add('img/orc_spritesheet.png');
	graphic.add('img/select_arrow.png');
	var ts = config.size.tile;

	function Creature(pos, map, type) {
		Entity.call(this, new V2(ts.x * pos.x, ts.y * pos.y), new V2(ts.x, ts.y));

		this.img = new Animation( 'img/orc_spritesheet.png', new V2(15,15), new V2(4,6), 200, true );
		this.add(this.img);
		this.cursor = new Image(new V2(42,-20), 'img/select_arrow.png', .5);
		this.add(this.cursor);

		this.dest = null;
		this.mapPos = pos;
		this.movement = null;
		this.speed = 160;
		this.cooldown = 0;

		this.map = map;

		this.hp = 10;
		this.skills = {
			miner: 10,
			hp: 10,
			attack: 10,
			ranged: 10,
			repair: 10
		};
	}

	Creature.prototype = new Entity();

	Creature.prototype.onClick = function() {
		this.map.selectUnit(this);
		return true;
	};

	Creature.prototype.onUpdate = function(delta) {
		this.cursor.visible = this.map.unit == this;
		this.cursor.position.y = this.img.frame*2-20;

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
			//interact with room / fight
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
