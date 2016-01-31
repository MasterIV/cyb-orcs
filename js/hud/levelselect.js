define(['basic/button', 'basic/entity', 'basic/image', 'basic/text', 'config/fonts', 'core/graphic', 'core/sound', 'geo/v2', 'geo/rect', 'hud/leveloverview'],
	function(Button, Entity, ImageEntity, TextEntity, font, g, s, V2, Rect, LevelOverview) {

	g.add('img/UI_tooltip.png');
	//s.add('snd/level.ogg');

	function LevelSelect(parent) {
		Entity.call(this, Zero(), new V2(parent.size.x, parent.size.y));

		var selection_width = 270;
		var selection_height = 60;
		var info_height = 40;

		var center = new V2(this.size.x / 2, this.size.y / 2);
		// background
		this.add( new ImageEntity(new V2(-425, -85).add(center), 'img/UI_tooltip.png') );
		// title
		this.add( new TextEntity(new V2(0, -55).add(center), 'Choose next town to attack:', font.center) );

		var self = this;

		this.next1 = new Button(new V2(-415, -50).add(center), function() { self.selected(0); });
		this.next1.text('', font.center, selection_width, selection_height);
		this.add(this.next1);
		this.overview1 = new LevelOverview(new V2(-415, -50 + selection_height).add(center), new V2(selection_width, info_height));
		this.add(this.overview1);

		this.next2 = new Button(new V2(-140, -50).add(center), function() { self.selected(1); });
		this.next2.text('', font.center, selection_width, selection_height);
		this.add(this.next2);
		this.overview2 = new LevelOverview(new V2(-140, -50 + selection_height).add(center), new V2(selection_width, info_height));
		this.add(this.overview2);

		this.next3 = new Button(new V2(135, -50).add(center), function() { self.selected(2); });
		this.next3.text('', font.center, selection_width, selection_height);
		this.add(this.next3);
		this.overview3 = new LevelOverview(new V2(135, -50 + selection_height).add(center), new V2(selection_width, info_height));
		this.add(this.overview3);

		this.options = [];
		this.option_names = [];
	}

	LevelSelect.prototype = new Entity();

	LevelSelect.prototype.show = function(day, time) {
		this.time = time;
		this.day = day;
		s.play('snd/raid_'+Math.ceil(Math.random()*5)+'.ogg');
		this.getRandomLevels();
		this.next1.setText(this.option_names[0]);
		this.next2.setText(this.option_names[1]);
		this.next3.setText(this.option_names[2]);
		this.overview1.insertValues(this.getLevelValues(this.options[0], day), this.options[0]);
		this.overview2.insertValues(this.getLevelValues(this.options[1], day), this.options[1]);
		this.overview3.insertValues(this.getLevelValues(this.options[2], day), this.options[2]);
	};

	LevelSelect.prototype.selected = function(num) {
		var values = this.getLevelValues(this.options[num], this.day);
		this.parent.hideLevelSelect(values, this.time);
	};

	LevelSelect.prototype.getRandomLevels = function() {
		this.options = [];
		this.option_names = [];
		while (this.options.length < 3) {
			var rand = Math.floor(Math.random() * 5) + 1;
			if (this.options.indexOf(rand) > -1) continue;
			this.options.push(rand);
		}
		while (this.option_names.length < 3) {
			var rand = Math.floor(Math.random() * citynames.length);
			if (this.option_names.indexOf(citynames[rand]) > -1) continue;
			this.option_names.push(citynames[rand]);
		}
	};

	LevelSelect.prototype.getLevelValues = function(level, day) {
		var enemies = 0;
		var levels = 0;
		var gold = 0;
		var orcs = 0;
		switch(level) {
			case 1:
				enemies = Math.ceil(day * .33);
				levels = 1 + Math.floor(day * .07);
				gold = 20 + day;
				break;
			case 2:
				enemies = Math.ceil(day * .4);
				levels = 1 + Math.floor(day * .1);
				gold = 20 + day * 2;
				break;
			case 3:
				enemies = 1 + Math.ceil(day * .5);
				levels = 1 + Math.floor(day * .15);
				gold = 20 + day * 2;
				orcs = 1;
				break;
			case 4:
				enemies = 1 + Math.ceil(day * .6);
				levels = 1 + Math.floor(day * .2);
				gold = 20 + day * 3;
				orcs = 1;
				break;
			case 5:
				enemies = 2 + Math.ceil(day * .7);
				levels = 1 + Math.floor(day * .25);
				gold = 20 + day * 3;
				orcs = 2;
				break;
		}
		return [enemies, levels, gold, orcs];
	}

	LevelSelect.prototype.onClick = function(pos) {
		this.dispatchReverse(this.entities, 'click', pos);
		return true;
	};

	LevelSelect.prototype.onMouseDown = function() {
		return true;
	};

	return LevelSelect;
});
