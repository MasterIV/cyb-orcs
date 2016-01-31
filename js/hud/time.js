define(['basic/button', 'basic/entity', 'basic/image', 'basic/morph', 'core/graphic', 'core/sound', 'definition/easing', 'geo/v2', 'basic/text', 'config/fonts'],
	function(Button, Entity, ImageEntity, Morph, g, s, Easing, V2, Text, font) {

	g.add('img/top_UI_sun.png');
	g.add('img/top_UI_sun_bar.png');
	g.add('img/time_freeze.png');
	s.add('snd/pause.ogg');
	s.add('snd/victory.ogg');

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
		this.add(this.freeze);
		this.freeze.visible = false;

		this.dayDisplay = new Text(new V2(230, 66), "0", font.center);
		this.add(this.dayDisplay);

		this.time = 0;
		this.day_length = 42000;
		this.day = 0;
		this.paused = false;

		this.gold_bounty = 0;
		this.orc_bounty = 0;
		this.bounty_given = true;
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
		this.dayDisplay.text = this.day;
		this.paused = true;
		this.freeze.visible = true;
		this.parent.parent.togglePause();
		this.parent.showLevelSelect(this.day, this, !this.bounty_given);
	};

	Time.prototype.setBounty = function(gold, orcs) {
		this.gold_bounty = gold;
		this.orc_bounty = orcs;
		this.paused = false;
		this.freeze.visible = false;
		this.parent.parent.togglePause();
		this.bounty_given = false;
	};

	Time.prototype.giveBounty = function() {
		this.bounty_given = true;
		this.parent.parent.money += this.gold_bounty;
		one_ret = false;
		for (var i = 0; i < this.orc_bounty; i++)
			if(this.parent.parent.spawnOrc())
				if (!one_ret)
					one_ret = true;
		if(!one_ret)
			s.play('snd/victory.ogg');
	};

	Time.prototype.togglePause = function() {
		this.paused = this.parent.parent.togglePause();
		if (this.paused) {
			this.freeze.visible = true;
			s.play('snd/pause.ogg');
		} else
			this.freeze.visible = false;
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
