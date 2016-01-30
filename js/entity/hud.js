define(['basic/entity', 'geo/v2', 'hud/buildmenu', 'hud/resources', 'hud/time'], function(Entity, V2, BuildMenu, Resources, Time) {
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
	}

	HUD.prototype = new Entity();

	return HUD;
});
