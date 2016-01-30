define(['basic/button', 'basic/entity', 'basic/image', 'basic/morph', 'basic/rect', 'config/screen', 'core/graphic', 'core/sound', 'definition/colors', 'definition/easing', 'geo/v2', 'geo/rect', 'hud/tooltip'],
	function(Button, Entity, ImageEntity, Morph, RectEntity, screen, g, s, Colors, Easing, V2, Rect, Tooltip) {

	g.add('img/hud/hammer.png');
	g.add('img/rooms/housing_white.png');
	g.add('img/rooms/meat_white.png');
	g.add('img/rooms/gold_white.png');
	g.add('img/rooms/axe_white.png');
	g.add('img/rooms/defence_white.png');
	s.add('snd/drums.ogg');

	function BuildMenu(parent) {
		this.b_size = 128;
		this.b_spacing = 10;
		this.b_colors = new Colors('#3c3c3c', '#3c3c3c', '#9c9c9c', '#9c9c9c');

		var room_definitions = [ { src: 'img/rooms/housing_white.png', def: null },
		                         { src: 'img/rooms/meat_white.png',    def: null },
		                         { src: 'img/rooms/gold_white.png',    def: null },
		                         { src: 'img/rooms/axe_white.png',     def: null },
		                         { src: 'img/rooms/defence_white.png', def: null } ];

		var my_width = (this.b_size + this.b_spacing) * (room_definitions.length + 1);
		var my_x = parent.size.x / 2 - my_width / 2;

		Entity.call(this, new V2(my_x, parent.size.y), new V2(my_width, this.b_size));
		this.add(new Morph( { position: { y: parent.size.y - this.b_size } }, 1800, Easing.INOUTCUBIC, this.moveInFinished ) );
		this.clickable = false;
		s.play('snd/drums.ogg');

		// background
		this.add( new RectEntity(Zero(), this.size, new Colors('#5c5c5c', '#5c5c5c')) );
		// icon
		this.add( new ImageEntity(Zero(), 'img/hud/hammer.png') );

		for (var i = 0; i < room_definitions.length; i++)
		{
			var room = room_definitions[i];
			var button = Button.create(new V2(this.b_size * (i+1) + this.b_spacing * (i+1), 0), function() {
				this.parent.roomClicked();
			});
			button.rect(this.b_size, this.b_size, this.b_colors);
			button.img(room.src);
			this.add(button);
		}

		// building tooltip
		this.tooltip = new Tooltip(parent, new Colors('#9c9c9c', '#9c9c9c'), this);
	}

	BuildMenu.prototype = new Entity();

	BuildMenu.prototype.roomClicked = function(room) {
		if (!this.clickable) return;

		this.clickedRoom = { name: 'Testraum', desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lore' };
		this.add( new Morph( { position: { y: this.parent.size.y } }, 500, Easing.INOUTCUBIC, this.moveOutFinished ) );
		this.clickable = false;
	};

	BuildMenu.prototype.moveIn = function() {
		this.add( new Morph( { position: { y: this.parent.size.y - this.size.y } }, 500, Easing.INOUTCUBIC, this.moveInFinished ) );
	};

	BuildMenu.prototype.moveInFinished = function(self) {
		self.clickable = true;
	};

	BuildMenu.prototype.moveOutFinished = function(self) {
		self.parent.remove( self );
		self.parent.add( self.tooltip );
		self.tooltip.moveIn( self.clickedRoom );
	};

	return BuildMenu;
});