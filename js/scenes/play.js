define(['lib/scene', 'lib/viewport', 'geo/v2', 'entity/map', 'entity/hud', 'basic/button', 'entity/creature', 'entity/cursor', 'definition/layout', 'basic/entity'],
		function(Scene, ViewPort, V2, Map, HUD, Button, Creature, Cursor, Layout, Entity) {
			function PlayScene() {
				Scene.call(this);

				this.money = 500;
				this.housings = 0;
				this.orcs = 3;

				var map = new Map(this);
				var cursor = new Cursor(map);

				map.addRoom(new V2(9,9), new Layout(shapes[16]), rooms.main, this);

				this.viewport = new ViewPort(true);
				this.viewport.add(map);

				this.viewport.add(new Creature(new V2(9,9), map, null));
				this.viewport.add(new Creature(new V2(10,9), map, null));
				this.viewport.add(new Creature(new V2(11,9), map, null));

				this.viewport.add(cursor);

				this.viewport.dragable(true);

				this.add(this.viewport);
				this.viewport.centerSelf();

				this.add( new HUD(this.size, cursor) );
				this.paused = false;
			}

			PlayScene.prototype = new Scene();

			PlayScene.prototype.togglePause = function() {
				this.paused = this.paused ? false : true;

				if (this.paused) {
					this.viewport.update = function( delta ) {
								if( this.subject ) {
									this.setPosition( this.visible.x/2-this.subject.position.x, this.visible.y/2-this.subject.position.y );
								} else if( this.dragging ) {
									var pos = this.parent.relativeMouse().dif(this.dragging);
									this.setPosition( pos.x, pos.y );
								}
					};
				} else {
					this.viewport.update = ViewPort.prototype.update;
				}
				return this.paused;
			};

			return PlayScene;
		}
);
