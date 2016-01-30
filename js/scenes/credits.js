define(['lib/scene', 'entity/back', 'entity/creditscreature', 'basic/text', 'geo/v2'],
	function(Scene, BackButton, CreditsCreature, TextEntity, V2) {
		function CreditsScene() {
			Scene.call(this);
			this.center(new TextEntity(new V2(0, 100), "Max Mustermann"));
			this.center(new TextEntity(new V2(0, 200), "Erica Mustemann"));
			this.center(new TextEntity(new V2(0, 300), "Gunda Gamedesigner"));
			this.center(new TextEntity(new V2(0, 400), "Peter Programmierer"));
			this.center(BackButton('menu', true));
			this.spawntime = 4000;
		}

		CreditsScene.prototype = new Scene();

		CreditsScene.prototype.onUpdate = function( delta ) {
			this.spawntime += delta;
			if (this.spawntime > 4000) {
				this.add( new CreditsCreature(this.size.x) );
				this.spawntime -= 4000;
			}
		};

		return CreditsScene;
});