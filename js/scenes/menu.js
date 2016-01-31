define(['lib/scene', 'basic/button', 'core/game', 'geo/v2', 'transitions/slideinright', 'transitions/slideinleft', 'basic/morph', 'definition/easing', 'basic/layout', 'core/sound', 'core/graphic', 'basic/image'],
	function(Scene, Button, game, V2, SlideInRightTransition, SlideInLeftTransition, Morph, Easing, Layout, s, graphic, Image) {
		graphic.add("img/main_btn_start.png");
		graphic.add("img/main_btn_credits.png");
		graphic.add("img/main_btn_help.png");
		graphic.add("img/main_bg.jpg");
		s.add('snd/drums.ogg');

		function MenuScene() {
			Scene.call(this);

			var playButton = Button.create(new V2(0, 680), function() {
				game.scene = require('config/scenes').play; s.play('snd/drums.ogg');
			}).img("img/main_btn_start.png");

			var creditsButton = Button.create(new V2(0, 680), function() {
				game.scene = new SlideInRightTransition(require('config/scenes').credits, 1000, Easing.OUTQUAD);
			}).img("img/main_btn_credits.png");

			var helpButton = Button.create(new V2(0, 680), function() {
				game.scene = new SlideInLeftTransition(require('config/scenes').help, 1000, Easing.OUTQUAD);
			}).img("img/main_btn_help.png");

			this.bg = "img/main_bg.jpg";

			var vLayout = new Layout.vertical(new V2(0, 100), 20, 50);
			vLayout.add(playButton);
			vLayout.add(creditsButton);
			vLayout.add(helpButton);
			this.center(vLayout);

			//var easing = Easing.OUTELASTIC;
			//var self = this;

			//playButton.add(new Morph({ position: { y: 100 } }, 1500, easing));
			//creditsButton.add(new Morph({ position: { y: 250 } }, 1500, easing));
			//helpButton.add(new Morph({ position: { y: 400 } }, 1500, easing));
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
