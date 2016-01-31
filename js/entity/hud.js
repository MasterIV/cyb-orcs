define(['basic/entity', 'geo/v2', 'hud/buildmenu', 'hud/resources', 'hud/time', 'hud/levelselect'], function(Entity, V2, BuildMenu, Resources, Time, LevelSelect) {
	function HUD(size, cursor) {
		Entity.call(this, Zero(), size);

		var menu = new BuildMenu(this, cursor);
		this.add(menu);
		menu.init();
		cursor.setBuildMenu(menu);

		var res = new Resources(this);
		this.add(res);
		res.init();

		var time = new Time(this);
		this.add(time);
		time.init();

		this.levelselect = new LevelSelect(this);
	}

	HUD.prototype = new Entity();

	HUD.prototype.showLevelSelect = function(day, time) {
		this.block(this.levelselect);
		this.levelselect.show(day, time);
	};

	HUD.prototype.hideLevelSelect = function(values, time) {
		this.remove(this.levelselect);
		this.parent.spawnEnemies();
		time.setBounty(values[2], values[3]);
	};

	return HUD;
});
