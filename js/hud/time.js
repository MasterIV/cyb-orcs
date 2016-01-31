define(['basic/button', 'basic/entity', 'basic/image', 'basic/morph', 'core/graphic', 'core/sound', 'definition/easing', 'geo/v2', 'geo/rect'],
	function(Button, Entity, ImageEntity, Morph, g, s, Easing, V2, Rect) {

	g.add('img/top_UI_sun.png');
	g.add('img/top_UI_sun_bar.png');
	g.add('img/time_freeze.png');
	s.add('snd/pause.ogg');

	function Time(parent) {
		Entity.call(this, new V2(parent.size.x - 456, -100), new V2(456, 100));

		// background
		this.add( new ImageEntity(Zero(), 'img/top_UI_sun.png') );
		// progress bar
		this.progress = new ImageEntity(new V2(69, 24), 'img/top_UI_sun_bar.png');
		this.add(this.progress);
		this.progress.size.x = 1;
		// time freeze
		this.freeze = new ImageEntity(Zero(), 'img/time_freeze.png');

		this.time = 0;
		this.day_length = 48000;
		this.day = 0;
		this.paused = false;

		this.gold_bounty = 0;
		this.orc_bounty = 0;
	}

	Time.prototype = new Entity();

	Time.prototype.init = function() {
		this.add(new Morph( { position: { y: 0 } }, 1800, Easing.INOUTCUBIC ) );
	};

	Time.prototype.onUpdate = function(delta) {
		if (this.paused) return;

		this.time += delta;
		if (this.time > this.day_length)
			this.dayChange();
		var new_progress = (this.time / this.day_length) * 336;
		this.progress.size.x = new_progress;
	};

	Time.prototype.dayChange = function() {
		this.time -= this.day_length;
		this.day++;
		this.paused = true;
		this.add(this.freeze);
		this.parent.parent.togglePause();
		this.parent.showLevelSelect(this.day, this);
	};

	Time.prototype.setBounty = function(gold, orcs) {
		this.gold_bounty = gold;
		this.orc_bounty = orcs;
		this.paused = false;
		this.remove(this.freeze);
		this.parent.parent.togglePause();
	};

	Time.prototype.giveBounty = function() {
		this.parent.parent.money += this.gold_bounty;
		for (var i = 0; i < this.orc_bounty; i++)
			this.parent.parent.spawnOrc();
	};

	Time.prototype.togglePause = function() {
		this.paused = this.parent.parent.togglePause();
		if (this.paused) {
			this.add(this.freeze);
			s.play('snd/pause.ogg');
		} else
			this.remove(this.freeze);
	};

	Time.prototype.onClick = function() {
		this.togglePause();
		return true;
	};

	Time.prototype.onMouseDown = function() {
		return true;
	};

	return Time;
});
