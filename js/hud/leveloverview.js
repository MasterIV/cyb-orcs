define(['basic/entity', 'basic/image', 'basic/text', 'config/fonts', 'core/graphic', 'geo/v2', 'geo/rect'],
	function(Entity, ImageEntity, TextEntity, font, g, V2, Rect) {

	g.add('img/gold.png');
	g.add('img/enemies.png');
	g.add('img/enemies_low.png');
	g.add('img/orcs.png');

	function LevelOveriew(pos, size) {
		Entity.call(this, pos, size);

		var element_width = size.x / 6;

		// Enemies
		this.enemy_img = new ImageEntity(Zero(), 'img/enemies_low.png', .9);
		this.add( this.enemy_img );
		this.text1 = new TextEntity(new V2(element_width, this.size.y / 2), '', font.halfcenter);
		this.add(this.text1);
		// Gold
		this.add( new ImageEntity(new V2(element_width * 2, 0), 'img/gold.png', .9) );
		this.text2 = new TextEntity(new V2(element_width * 3, this.size.y / 2), '', font.halfcenter);
		this.add(this.text2);
		// Orcs
		this.add( new ImageEntity(new V2(element_width * 4, 0), 'img/orcs.png', .9) );
		this.text3 = new TextEntity(new V2(element_width * 5, this.size.y / 2), '', font.halfcenter);
		this.add(this.text3);
	}

	LevelOveriew.prototype = new Entity();

	LevelOveriew.prototype.insertValues = function(values) {
		this.text1.text = values[0];
		this.text2.text = values[2];
		this.text3.text = values[3];
		if (values[1] >= 5)
			this.enemy_img.img = 'img/enemies.png';
	};

	return LevelOveriew;
});