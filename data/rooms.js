var rooms = {
	main: {
		name: 'Temple',
		desc: 'In this room the Dungeon Master performs all rituals.',
		pic: 'img/rooms/base_white.png',
		nobuild: true,
		supply: 0.5,
		gold: 0.5
	},
	meat: {
		name: 'Meat Room',
		desc: 'Orcs in this room eat tasty meat and get healed.',
		cost: 30,
		hp: 56,
		pic: 'img/rooms/meat_white.png',
		cooldown: 1000
	},
	mine: {
		name: 'Gold Mine',
		desc: 'Every 5 seconds this room will give you Gold equal to the orcs\' skill working.',
		cost: 15,
		hp: 40,
		pic: 'img/rooms/gold_white.png',
		cooldown: 5000,
		gold: 1
	},
	housing: {
		name: 'Dormitory',
		desc: 'One space of this room provides housing for one orcs. You need more dormitories to increase your maximum orc capacity.',
		cost: 10,
		hp: 32,
		pic: 'img/rooms/housing_white.png',
		supply: 1
	},
	training: {
		name: 'Gym',
		desc: 'Orcs will train in this room to become mighty and fearless warriors.',
		cost: 20,
		hp: 48,
		pic: 'img/rooms/axe_white.png',
		cooldown: 1000
	},
	voodoo: {
		name: 'Voodoo Room',
		desc: 'Orcs in here will perform bad voodoo rituals to attack enemies anywhere in your dungeon.',
		cost: 40,
		hp: 64,
		pic: 'img/rooms/defence_white.png',
		cooldown: 3000
	}
};
