define(['lib/scene', 'lib/map', 'lib/viewport', 'geo/v2', 'entity/map', 'basic/button'],
		function(Scene, TiledMap, ViewPort, V2, Map, Button ) {
			function PlayScene() {
				Scene.call(this);

				this.money = 500;
				this.housings = 10;

				var map = new Map();

				map.selectRoom(shapes[13]);
				map.addRoom(new V2(9,9));

				var add = new Button(new V2(20, 20), function() {
					map.selectRoom(shapes[Math.floor(Math.random()*shapes.length)], null);
					return true;
				});

				add.rect(50, 50);

				var viewport = new ViewPort(true);
				viewport.add(map);
				viewport.dragable(true);

				this.add(viewport);
				this.add(add);
				viewport.centerSelf();
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
