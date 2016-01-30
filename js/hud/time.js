define(['basic/entity', 'basic/image', 'basic/morph', 'core/graphic', 'definition/easing', 'geo/v2', 'geo/rect'],
	function(Entity, ImageEntity, Morph, g, Easing, V2, Rect) {

	g.add('img/top_UI_sun.png');
	g.add('img/top_UI_sun_bar.png');

	function Time(parent) {
		Entity.call(this, new V2(parent.size.x - 456, -100), new V2(456, 100));

		// background
		this.add( new ImageEntity(Zero(), 'img/top_UI_sun.png') );
		// progress bar
		this.progress = new ImageEntity(new V2(69, 24), 'img/top_UI_sun_bar.png');
		this.add(this.progress);
		this.progress.size.x = 1;

		this.time = 0;
		this.day_length = 60000;
	}

	Time.prototype = new Entity();

	Time.prototype.init = function() {
		this.add(new Morph( { position: { y: 0 } }, 1800, Easing.INOUTCUBIC ) );
	};

	Time.prototype.onUpdate = function(delta) {
		this.time += delta;
		if (this.time > this.day_length)
			this.time -= this.day_length;
		var new_progress = (this.time / this.day_length) * 336;
		this.progress.size.x = new_progress;
	};

	return Time;
});