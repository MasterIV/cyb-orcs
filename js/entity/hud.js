define(['basic/entity', 'geo/v2', 'hud/buildmenu', 'hud/resources'], function(Entity, V2, BuildMenu, Resources) {
	function HUD(size) {
		Entity.call(this, Zero(), size);

		var menu = new BuildMenu(this);
		this.add(menu);
		menu.init();

		var res = new Resources(this);
		this.add(res);
		res.init();
	}

	HUD.prototype = new Entity();

	return HUD;
});
