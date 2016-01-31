define(['lib/scene', 'lib/viewport', 'geo/v2', 'entity/map', 'entity/hud', 'basic/button', 'entity/creature', 'entity/cursor', 'definition/layout', 'basic/entity', 'core/game', 'entity/unitinfo', 'core/sound'],
		function(Scene, ViewPort, V2, Map, HUD, Button, Creature, Cursor, Layout, Entity, game, UnitInfo, s) {
			s.add('snd/background.ogg');

			function PlayScene() {
				Scene.call(this);

				this.money = startMoney;
				this.housings = 0;
				this.orcs = 3;

				var map = new Map(this);
				var cursor = new Cursor(map);
				var self = this;

				map.addRoom(new V2(9,9), new Layout(shapes[16]), rooms.main, this);

				this.viewport = new ViewPort(true);
				this.viewport.add(map);

				this.viewport.add(new Creature(new V2(9,9), map, 1, false));
				this.viewport.add(new Creature(new V2(10,9), map, 1, false));
				this.viewport.add(new Creature(new V2(11,9), map, 1, false));

				this.viewport.add(cursor);

				this.viewport.dragable(true);

				this.add(this.viewport);
				this.viewport.centerSelf();

				this.hud = new HUD(this.size, cursor, rooms, this);
				this.add( this.hud );
				this.center( this.info = new UnitInfo());
				this.paused = false;
				this.map = map;
				this.enemies = [];

				this.keyAware.push({
					up: function(key) { if(key == 'space') self.hud.time.togglePause(); }
				});
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

			PlayScene.prototype.spawnEnemies = function(num, level) {
				for (var i = 0; i < num; i++) {
					var pos = this.map.getRandomSpawnPosition();
					if (!pos) continue;

					var new_e = new Creature(pos, this.map, level, true)
					this.enemies.push( new_e );
					this.viewport.add( new_e );
				}
			};

			PlayScene.prototype.spawnOrc = function() {
				if (this.orcs >= this.housings) return;

				var pos = this.map.getRandomTemplePosition();
				if (!pos) return;

				this.viewport.add( new Creature(pos, this.map, 1, false) );
				this.orcs++;
			};

			PlayScene.prototype.creatureDeath = function(creature) {
				if (creature.enemy) {
					arrayRemove(this.enemies, creature);
					if (this.enemies.length == 0)
						this.hud.giveBounty();
				} else {
					this.orcs--;
					if (this.orcs <= 0)
						this.gameOver();
				}
			};

			PlayScene.prototype.gameOver = function() {
				game.scene = require('config/scenes').menu;
			};

			PlayScene.prototype.startMusic = function() {
				this.bgmusic = s.play('snd/background.ogg', true);
			};

			return PlayScene;
		}
);
