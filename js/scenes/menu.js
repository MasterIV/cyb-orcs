define(['lib/scene', 'basic/button', 'core/game', 'geo/v2', 'transitions/slideinright', 'transitions/slideinleft', 'basic/morph', 'definition/easing', 'basic/layout', 'core/sound', 'core/graphic', 'basic/image'],
	function(Scene, Button, game, V2, SlideInRightTransition, SlideInLeftTransition, Morph, Easing, Layout, s, graphic, Image) {
		graphic.add("img/main_btn_start.png");
		graphic.add("img/main_btn_credits.png");
		graphic.add("img/main_btn_help.png");
		graphic.add("img/main_bg.jpg");
		graphic.add('img/full_screen_button.png');
		s.add('snd/drums.ogg');

		function MenuScene() {
			Scene.call(this);
			var self = this;

			var playButton = Button.create(new V2(0, 680), function() {
				game.scene = require('config/scenes').play; s.play('snd/drums.ogg');
				game.scene.startMusic();
			}).img("img/main_btn_start.png");

			var creditsButton = Button.create(new V2(0, 680), function() {
				game.scene = new SlideInRightTransition(require('config/scenes').credits, 1000, Easing.OUTQUAD);
			}).img("img/main_btn_credits.png");

			var helpButton = Button.create(new V2(0, 680), function() {
				game.scene = new SlideInLeftTransition(require('config/scenes').help, 1000, Easing.OUTQUAD);
				require('config/scenes').help.reset();
			}).img("img/main_btn_help.png");

			this.bg = "img/main_bg.jpg";

			var vLayout = new Layout.vertical(new V2(0, 280), 20, 20);
			vLayout.add(playButton);
			vLayout.add(creditsButton);
			vLayout.add(helpButton);
			this.center(vLayout);

			this.add(Button.create(new V2(1160, 20), function() {
				self.toggleFullScreen();
			}).img('img/full_screen_button.png'));
		}

		MenuScene.prototype = new Scene();


		MenuScene.prototype.toggleFullScreen = function() {
			if (!document.fullscreenElement &&    // alternative standard method
				!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
				if (document.body.requestFullscreen) {
					document.body.requestFullscreen();
				} else if (document.body.msRequestFullscreen) {
					document.body.msRequestFullscreen();
				} else if (document.body.mozRequestFullScreen) {
					document.body.mozRequestFullScreen();
				} else if (document.body.webkitRequestFullscreen) {
					document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				}
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
			}
		};

		return MenuScene;
	}
);
