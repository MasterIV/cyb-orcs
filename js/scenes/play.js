define(['lib/scene', 'lib/viewport', 'geo/v2', 'entity/map', 'entity/hud', 'basic/button', 'entity/creature', 'entity/cursor', 'definition/layout'],
		function(Scene, ViewPort, V2, Map, HUD, Button, Creature, Cursor, Layout) {
			function PlayScene() {
				Scene.call(this);

				this.money = 500;
				this.housings = 10;
				this.orcs = 3;

				var map = new Map(this);
				var cursor = new Cursor(map);

				map.addRoom(new V2(9,9), new Layout(shapes[16]), rooms.main);

				var viewport = new ViewPort(true);
				viewport.add(map);

				viewport.add(new Creature(new V2(9,9), map, null));
				viewport.add(new Creature(new V2(10,9), map, null));
				viewport.add(new Creature(new V2(11,9), map, null));

				viewport.add(cursor);

				viewport.dragable(true);

				this.add(viewport);
				viewport.centerSelf();

				this.add( new HUD(this.size, cursor) );
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
