define(['basic/button', 'basic/entity', 'basic/morph', 'basic/rect', 'basic/text', 'config/fonts', 'core/graphic', 'definition/colors', 'definition/easing', 'geo/v2', 'geo/rect'],
	function(Button, Entity, Morph, RectEntity, TextEntity, font, g, Colors, Easing, V2, Rect) {

	g.add('img/cancel.png');

	function Tooltip(parent, colors, buildmenu) {
		var width = 900;
		var height = 170;
		var close_b_size = 32;

		Entity.call(this, new V2(parent.size.x / 2 - width / 2, parent.size.y), new V2(width, height));

		this.extra_sp = 10;
		this.line_sp = 10;
		this.margin = 5;

		var y = this.margin * 2;
		this.title = new TextEntity(new V2( this.margin, y ), '', font.large);
		y += font.large.size + this.extra_sp + this.line_sp;
		this.text  = new TextEntity(new V2( this.margin, y ), '', font.default);
		y += font.default.size + this.line_sp;
		this.text2 = new TextEntity(new V2( this.margin, y ), '', font.default);
		y += font.default.size + this.line_sp;
		this.text3 = new TextEntity(new V2( this.margin, y ), '', font.default);

		var close = Button.create(new V2(this.size.x - close_b_size, 0), function() {
			this.parent.close();
		});
		close.rect(close_b_size, close_b_size, new Colors('#9c9c9c', '#9c9c9c', '#5c5c5c', '#5c5c5c'));
		close.img('img/cancel.png');

		this.add( new RectEntity(Zero(), this.size, colors) );
		this.add( this.title );
		this.add( this.text );
		this.add( this.text2 );
		this.add( this.text3 );
		this.add( close );

		this.clickable = false;
		this.buildmenu = buildmenu;
	}

	Tooltip.prototype = new Entity();

	Tooltip.prototype.moveIn = function(room) {
		this.add( new Morph( { position: { y: this.parent.size.y - this.size.y } }, 500, Easing.INOUTCUBIC, this.moveInFinished ) );
		this.title.text = room.name;
		if (room.desc.length > 100) {
			for (var i = 0; i < 100; i++) {
				if (room.desc.charAt(100 - i) == ' ')
					break;
			}
			if (room.desc.length > 200) {
				for (var j = 0; j < 200; j++) {
					if (room.desc.charAt(200 - j) == ' ')
						break;
				}
				this.text.text  = room.desc.substr(0, 100 - i);
				this.text2.text = room.desc.substr(101 - i, 100-j);
				this.text3.text = room.desc.substr(201 - j, room.desc.length);
			} else {
				this.text.text  = room.desc.substr(0, 100 - i);
				this.text2.text = room.desc.substr(101 - i, room.desc.length);
			}
		} else {
			this.text.text = room.desc;
		}
	};

	Tooltip.prototype.moveInFinished = function(self) {
		self.clickable = true;
	};

	Tooltip.prototype.close = function() {
		if (!this.clickable) return;
		this.clickable = false;

		this.add( new Morph( { position: { y: this.parent.size.y } }, 500, Easing.INOUTCUBIC, this.moveOutFinished ) );
	};

	Tooltip.prototype.moveOutFinished = function(self) {
		self.parent.remove( self );
		self.parent.add( self.buildmenu );
		self.buildmenu.moveIn();
	};

	return Tooltip;
});