define(['scenes/menu', 'scenes/credits', 'scenes/play', 'scenes/help', 'scenes/hud'],
		function (MenuScene, CreditsScene, PlayScene, HelpScene, HUDScene) {
			return {
				init: function () {
					this.menu = new MenuScene();
					this.credits = new CreditsScene();
					this.play = new PlayScene();
					this.help = new HelpScene();
					this.hud = new HUDScene();
					this.default = this.menu;
				}
			};
		}
);