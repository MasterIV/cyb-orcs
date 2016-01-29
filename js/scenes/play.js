define(['lib/scene', 'entity/player', 'lib/map', 'lib/viewport', 'geo/v2', 'entity/map'],
		function(Scene, Player, TiledMap, ViewPort, V2, Map ) {
			function PlayScene() {
				Scene.call(this);

				var viewport = new ViewPort(true);
				viewport.add(new Map());
				viewport.dragable(true);


				this.add(viewport);
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
