define(['lib/scene', 'geo/v2', 'hud/buildmenu'], function(Scene, V2, BuildMenu ) {
	function HUDScene() {
		Scene.call(this);

		var menu = new BuildMenu(this)
		this.add(menu);
		menu.init();
	}

	HUDScene.prototype = new Scene();

		return HUDScene;
});
