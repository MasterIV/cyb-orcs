define(['basic/entity', 'geo/v2', 'basic/text', 'basic/image', 'core/graphic', 'config/fonts', 'basic/morph', 'definition/easing'],
	function(Entity, V2, Text, Image, graphic, font, Morph, Easing) {
	graphic.add('img/unit_info.png');

	function UnitInfo() {
		Entity.call(this, new V2(0, -123), new V2(296, 123));
		this.add(new Image(Zero(),'img/unit_info.png' ));
		this.add( this.name = new Text(new V2(148, 26), '', font.center));

		var top = 66;
		var left = 28;
		var sp = 58;

		this.add(this.attack = new Text(new V2(left, top)));
		this.add(this.hp = new Text(new V2(left+sp, top)));
		this.add(this.ranged = new Text(new V2(left+sp*2, top)));
		this.add(this.miner = new Text(new V2(left+sp*3, top)));
		this.add(this.repair = new Text(new V2(left+sp*4, top)));

		this.visible = false;
		this.creature = null;
	}

	UnitInfo.prototype = new Entity();

	UnitInfo.prototype.draw = function(ctx) {
		if( !this.visible ) return;

		for(var i in skills)
			this[i].text = this.creature.levels[i];

		Entity.prototype.draw.call(this, ctx);

		if( this.creature ) {
			var p = (276 * this.creature.hp / this.creature.skills.hp) | 0;
			ctx.fillStyle = 'green';
			ctx.fillRect(this.position.x+10, this.position.y+46, p, 9);
		}
	};

	UnitInfo.prototype.select = function(creature) {
		this.creature = creature;
		this.name.text = creature.name;

		for(var i in skills)
			this[i].text = creature.levels[i];

		if(!this.visible)
			this.add(new Morph( { position: { y: 0 } }, 800, Easing.INOUTCUBIC ));

		this.visible = true;
	};

	return UnitInfo;
});
