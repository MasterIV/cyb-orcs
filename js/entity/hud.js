define(['basic/entity', 'geo/v2', 'hud/buildmenu', 'hud/resources', 'hud/time', 'hud/levelselect'], function(Entity, V2, BuildMenu, Resources, Time, LevelSelect) {
	function HUD(size, cursor, roomDefinitions, money) {
		Entity.call(this, Zero(), size);

		var menu = new BuildMenu(this, cursor, roomDefinitions, money);
		this.add(menu);
		menu.init();
		cursor.setBuildMenu(menu);

		var res = new Resources(this);
		this.add(res);
		res.init();

		var time = new Time(this);
		this.add(time);
		time.init();
		this.time = time;

		this.levelselect = new LevelSelect(this);
	}

	HUD.prototype = new Entity();

	HUD.prototype.showLevelSelect = function(day, time, failed) {
		this.block(this.levelselect);
		this.levelselect.setParent(this);
		this.levelselect.show(day, time, failed);
	};

	HUD.prototype.hideLevelSelect = function(values, time) {
		this.remove(this.levelselect);
		this.parent.spawnEnemies(values[0], values[1]);
		time.setBounty(values[2], values[3]);
	};

	HUD.prototype.giveBounty = function() {
		this.time.giveBounty();
	};

	return HUD;
});
