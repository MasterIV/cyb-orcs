define(['basic/entity', 'core/graphic', 'lib/animation', 'geo/v2', 'basic/image'], function (Entity, graphic, Animation, V2, Image) {
	graphic.add('img/hero_gold_spritesheet.png');
	graphic.add('img/hero_silver_spritesheet.png');
	graphic.add('img/orc_red_spritesheet.png');
	graphic.add('img/orc_spritesheet.png');

	var actionSpeed = 1000;

	function CreditsCreature(size) {
		var side = Math.round(Math.random()) * 2 - 1;
		var y = Math.random() * 400;

		Entity.call(this, new V2(size / 2 + (size/2 + 90) * side, 200 + y), Zero());

		this.img = new Animation( this.getRandomPicture(), new V2(15,15), new V2(4,this.frames), 200, true );
		if (side < 0)
			this.img.state = 1;
		else
			this.img.state = 2;
		this.add(this.img);

		this.speed = -(30 + Math.random()*30) * side;
		this.maxsize = size;
		this.sitting = false;
	}

	CreditsCreature.prototype = new Entity();

	CreditsCreature.prototype.onUpdate = function(delta) {
		if (this.orc) {
			if (this.sitting) {
				if (Math.random() > .01)
					return;
				this.sitting = false;
				if (this.speed < 0)
					this.img.state = 2;
				else
					this.img.state = 1;
			} else if (Math.random() > .99) {
				this.sitting = true;
				this.img.state = 4;
				return;
			}
		}

		this.position.x += ( this.speed / 1000 ) * delta;
		if (this.speed < 0 && this.position.x < -90) {
			return this.parent.remove(this);
		}
		else if (this.speed > 0 && this.position.x > this.maxsize + 10)
			return this.parent.remove(this);
	};

	CreditsCreature.prototype.getRandomPicture = function() {
		var rand = Math.floor(Math.random() * 4);
		switch (rand) {
			case 0:
				this.orc = true;
				this.frames = 6;
				return 'img/orc_spritesheet.png';
				break;
			case 1:
				this.orc = true;
				this.frames = 6;
				return 'img/orc_red_spritesheet.png';
				break;
			case 2:
				this.orc = false;
				this.frames = 4;
				return 'img/hero_silver_spritesheet.png';
				break;
			case 3:
				this.orc = false;
				this.frames = 4;
				return 'img/hero_gold_spritesheet.png';
				break;
		}
	};

	return CreditsCreature;
});
