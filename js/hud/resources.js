define(['basic/entity', 'basic/image', 'basic/morph', 'basic/text', 'config/fonts', 'core/graphic', 'definition/easing', 'geo/v2', 'geo/rect'],
	function(Entity, ImageEntity, Morph, TextEntity, font, g, Easing, V2, Rect) {

	g.add('img/top_UI.png');

	function Resources(parent) {
		Entity.call(this, new V2(0, -100), new V2(456, 100));

		// background
		this.add( new ImageEntity(Zero(), 'img/top_UI.png') );
		// orc count
		this.orc_text = new TextEntity(new V2(109, 28), '', font.hud);
		// gold
		this.gold_text = new TextEntity(new V2(300, 28), '', font.hud);

		this.add(this.orc_text);
		this.add(this.gold_text);
	}

	Resources.prototype = new Entity();

	Resources.prototype.init = function() {
		this.add(new Morph( { position: { y: 0 } }, 1800, Easing.INOUTCUBIC ) );
	};

	Resources.prototype.onUpdate = function(delta) {
		this.gold_text.text = this.parent.parent.money;
		this.orc_text.text  = this.parent.parent.orcs + '/' + this.parent.parent.housings;
	}

	return Resources;
});