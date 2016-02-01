define(['lib/scene', 'entity/back', 'basic/image', 'basic/button', 'core/graphic', 'geo/v2'],
		function(Scene, BackButton, ImageEntity, Button, g, V2) {

			g.add('img/main_btn_next.png');
			g.add('img/help_1.png');
			g.add('img/help_2.png');
			g.add('img/help_3.png');

			function HelpScene() {
				Scene.call(this);
				var back = BackButton('menu')
				back.position.x = 160;
				back.position.y = 600;
				this.add( back );

				this.bg = 'img/main_bg.jpg';

				this.help_num = 1;

				this.help = new ImageEntity( Zero(), 'img/help_1.png' );
				this.add( this.help );

				var self = this;
				var btn = new Button(new V2(660, 600), function() { self.clicked(1); } );
				btn.img('img/main_btn_next.png');
				this.add( btn );
				this.nextbtn = btn;
			}

			HelpScene.prototype = new Scene();

			HelpScene.prototype.clicked = function(dir) {
				if (this.help_num + dir < 1) return;
				if (this.help_num + dir > 3) return;

				this.help_num += dir;
				this.help.img = g['img/help_' + this.help_num + '.png'];
				if (this.help_num == 3)
					this.remove( this.nextbtn );
			};

			HelpScene.prototype.reset = function() {
				if (this.help_num == 3)
					this.add( this.nextbtn );
				this.help_num = 1;
				this.help.img = g['img/help_' + this.help_num + '.png'];
			};

			return HelpScene;
		}
);