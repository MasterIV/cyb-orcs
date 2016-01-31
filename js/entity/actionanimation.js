define(['basic/entity', 'config/fonts'], function(Entity, fonts) {

	function Actionanimation(value, shape, type, icon) {
		Entity.call(this);
		this.image = icon;
		this.animationWay = 0;
		this.type = type;
		this.value = value;
		this.shape = shape;
	}

	Actionanimation.prototype = new Entity();

	Actionanimation.prototype.onUpdate = function () {
		if(this.animationWay <= 50) {
			this.animationWay += 1.5;
		} else {
			this.parent.remove(this);
		}
	};

	Actionanimation.prototype.onDraw = function (ctx) {
		var xPosition = this.shape.iconPos().x;
		var yPosition = this.shape.iconPos().y + (this.animationWay * 2) * -1;
		ctx.font = fonts.hud.size + "px " + fonts.hud.type;
		ctx.fillStyle = fonts.hud.color;

		if (this.value > 0 && this.type){
			ctx.fillText("+"+this.value, xPosition + 55, yPosition + 15 );
			ctx.drawImage(this.image, xPosition + 30, yPosition, 20, 20);

		} else if (this.value < 0 || !this.type) {
			ctx.fillStyle = "red";
			ctx.fillText("-"+this.value, xPosition + 55, yPosition + 15 );
			ctx.drawImage(this.image, xPosition + 30, yPosition, 20, 20);
		}
	};

	return Actionanimation;
});
