define(['lib/scene', 'lib/viewport', 'geo/v2', 'entity/map', 'entity/hud', 'basic/button', 'entity/creature', 'entity/cursor'],
		function(Scene, ViewPort, V2, Map, HUD, Button, Creature, Cursor) {
			function PlayScene() {
				Scene.call(this);

				this.money = 500;
				this.housings = 10;
				this.orcs = 3;

				var map = new Map();
				var cursor = new Cursor(map);


				map.addRoom(new V2(9,9), cursor.selectRoom(shapes[13]), cursor.shape);

				var add = new Button(new V2(20, 20), function() {
					cursor.selectRoom(shapes[Math.floor(Math.random()*shapes.length)], null);
				});

				add.rect(50, 50);

				var viewport = new ViewPort(true);
				viewport.add(map);

				viewport.add(new Creature(new V2(9,9), map, null));
				viewport.add(cursor);
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
