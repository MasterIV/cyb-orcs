define(['lib/scene', 'geo/v2', 'hud/buildmenu'], function(Scene, V2, BuildMenu ) {
	function HUDScene() {
		Scene.call(this);

		this.add(new BuildMenu(this));
	}

	HUDScene.prototype = new Scene();

		return HUDScene;
});
