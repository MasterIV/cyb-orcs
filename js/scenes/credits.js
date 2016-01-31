define(['lib/scene', 'entity/back', 'entity/creditscreature', 'basic/text', 'geo/v2', 'config/fonts'],
	function(Scene, BackButton, CreditsCreature, TextEntity, V2, font) {
		function CreditsScene() {
			Scene.call(this);

			this.center(new TextEntity(new V2(0, 290), "Tobias Rojahn", font.center));
			this.center(new TextEntity(new V2(0, 340), "Judith Gastell", font.center));
			this.center(new TextEntity(new V2(0, 390), "Felix Wagner", font.center));
			this.center(new TextEntity(new V2(0, 440), "Samuel Furter", font.center));
			this.center(new TextEntity(new V2(0, 490), "Andreas Ecker", font.center));
			this.center(BackButton('menu', true));
			this.spawntime = 4000;

			this.bg = 'img/main_bg.jpg';
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
