define(['basic/entity', 'geo/v2', 'hud/buildmenu'], function(Entity, V2, BuildMenu) {
	function HUD(size) {
		Entity.call(this, Zero(), size);

		var menu = new BuildMenu(this);
		this.add(menu);
		menu.init();
	}

	HUD.prototype = new Entity();

	return HUD;
});
