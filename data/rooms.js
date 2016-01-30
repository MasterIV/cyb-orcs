var rooms = {
	main: {
		name: 'Temple',
		desc: 'Enables you to manifest your will in the world of the immortal.',
		hp: 150,
		pic: 'img/rooms/base_white.png',
		nobuild: true,
		supply: 0.5,
		gold: 0.5,
		cost: 0
	},
	meat: {
		name: 'Butchery',
		desc: 'Turns defeated knights into tasty meat, that can be eaten by wounded orcs to regain health.',
		cost: 30,
		hp: 70,
		pic: 'img/rooms/meat_white.png',
		cooldown: 1000,
		heal: 4
	},
	mine: {
		name: 'Gold Mine',
		desc: 'Orcs can gather gold in the gold mine much faster then in the temple.',
		cost: 15,
		hp: 50,
		pic: 'img/rooms/gold_white.png',
		cooldown: 7500,
		gold: 1
	},
	housing: {
		name: 'Den',
		desc: 'Each tile of the den provides enough sleeping space for one orc.',
		cost: 10,
		hp: 40,
		pic: 'img/rooms/housing_white.png',
		supply: 1
	},
	training: {
		name: 'Gym',
		desc: 'Orcs will train in this room to become mighty and fearless warriors.',
		cost: 20,
		hp: 60,
		pic: 'img/rooms/axe_white.png',
		cooldown: 1000
	},
	voodoo: {
		name: 'Voodoo Cave',
		desc: 'Let your orcs perform dark voodoo rituals to harm your enemies from the distance.',
		cost: 40,
		hp: 80,
		pic: 'img/rooms/defence_white.png',
		cooldown: 3000
	}
};

var startMoney = 300;
