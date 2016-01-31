define(['lib/scene', 'entity/back'],
		function(Scene, BackButton) {

			function HelpScene() {
				Scene.call(this);
				this.center(BackButton('menu'));

				this.bg = 'img/main_bg.jpg';
			}

			HelpScene.prototype = new Scene();

			return HelpScene;
		}
);