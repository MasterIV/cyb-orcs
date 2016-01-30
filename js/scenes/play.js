define(['lib/scene', 'lib/map', 'lib/viewport', 'geo/v2', 'entity/map'],
		function(Scene, TiledMap, ViewPort, V2, Map ) {
			function PlayScene() {
				Scene.call(this);

				this.money = 500;
				this.housings = 10;

				var viewport = new ViewPort(true);
				viewport.add(new Map());
				viewport.dragable(true);

				this.add(viewport);
				viewport.centerSelf();
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
