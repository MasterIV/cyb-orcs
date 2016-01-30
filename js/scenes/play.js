define(['lib/scene', 'lib/viewport', 'geo/v2', 'entity/map', 'entity/hud', 'basic/button', 'entity/creature'],
		function(Scene, ViewPort, V2, Map, HUD, Button, Creature ) {
			function PlayScene() {
				Scene.call(this);

				this.money = 500;
				this.housings = 10;

				var map = new Map();

				map.selectRoom(shapes[16]);
				map.addRoom(new V2(9,9));

				var add = new Button(new V2(20, 20), function() {
					map.selectRoom(shapes[Math.floor(Math.random()*shapes.length-1)], null);
				});

				add.rect(50, 50);

				var viewport = new ViewPort(true);
				viewport.add(map);

				viewport.add(new Creature(new V2(9,9), map, null));
				viewport.add(new Creature(new V2(10,9), map, null));
				viewport.add(new Creature(new V2(11,9), map, null));

				viewport.dragable(true);

				this.add(viewport);
				this.add(add);
				viewport.centerSelf();

				this.add( new HUD(this.size) );
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
