var evil = (function() {

    function is_array(x) {
	return Object.prototype.toString.call(x) === '[object Array]';
    }

    // The name generator is a tree structure, where leaves are strings 
    // and nodes are arrays. There are two node types: pick-one (contain 
    // only arrays or only strings) and concat (contain both arrays and
    // strings).

    function is_concat(x) {
	if (!is_array(x)) return false;
	var has_arrays = false, has_strings = false;
	for (var i = 0; i < x.length; ++i) {
	    if (is_array(x[i])) has_arrays = true;
	    else has_strings = true;
	    if (has_arrays && has_strings) return true;
	}
	return false;
    }

    // How many different names can we build from a tree ?

    function count(tree) {
	if (is_array(tree)) {
	    if (!tree.hasOwnProperty('count')) {
		if (is_concat(tree)) {
		    tree.count = 1;
		    for (var i = 0; i < tree.length; ++i) 
			tree.count *= count(tree[i]);		
		} else {
		    tree.count = 0;
		    for (var i = 0; i < tree.length; ++i) 
			tree.count += count(tree[i]);		
		}
	    }
	    return tree.count;
	} else {
	    return 1;
	}
	 
    }

    // Build the nth name from a tree by concatenating it to an array

    function build(output,tree,n) {
	if (!is_array(tree)) return output.push(tree);
	if (is_concat(tree)) {
	    for (var i = 0; i < tree.length; ++i) {
		var sub = count(tree[i]);
		var n2  = n % sub;
		build(output,tree[i], n2);
		n = (n - n2) / sub;
	    }
	} else {
	    for (var i = 0; i < tree.length; ++i) {
		if (count(tree[i]) > n) return build(output,tree[i],n);
		n -= count(tree[i]);
	    }
	}
    }

    // Build and return the nth name from a tree

    function nth(tree,n) {
	var output = [];
	build(output,tree,n % count(tree));
	return output.join('');
    }

    // A description of all the names.

    var ruler = [ 
	"Emperor",
	"Empress",
	"Maker",
	"Lord",
	"King",
	"Bishop",
	"Baron",
	"Countess",
	"Avatar",
	"Bringer",
	"Ruler",
	"Ghost",
	"Spirit",
	"Demigod",
	"God",
	"Archfiend",
	"Dread Prince",
	"Hell Prince",
	"Master",
	"Creator",
	"Mother",
	"Wielder"
    ];

    var rulers = [
	"Legion",
	"Army",
	"Knights",
	"Secret Circle",
	"Leading Providers"
    ];

    var person = [
	"Emperor",
	"Empress",
	"Lord",
	"Bishop", 
	"King",
	"Gentleman",
	"Lady",
	"Devil",
	"Prime Evil",
	"Dread Lord",
	"Deathlord",
	"Overlord",
	"Entity",
	"Chthonian",
	"Queen",
	"Knight",
	"Traitor",	 
	"Sorcerer",
	"Wizard",
	"Witch",
	"Sorceress",
	"Devourer",
	"Titan",
	"Mutant",
	"Demigod",
	"Horror",
	"Ghost",
	"Zombie",
	"Elder God",
	"One",
	"Man",
	"Necromancer",
	"Conjurer",
	"Magician",
	"Demon",
	"Demonologist",
	"Fiend",
	"Woman",
	"Wanderer",
	"Stock Broker",
	"Ruler",
	"Consultant",
	"Ghoul",
	"Hellion",
	"Hydra",
	"Beast",
	"Lich",
	"Werewolf",
	"Vampire",
	"Mummy",
	"Archnemesis",
	"Archfiend",
	"Champion",
	"Muse",
	"Evil Priest",
	"Cultist",
	"Assassin",
	"Ninja",
	"Ronin",
	"Shogun",
	"Prince",
	"Annihilator",
	"Space Marine",
	"Monster Behind You",
	"Fatal Error",
	"Tentacle Monster",
	"Doctor",
	"Scientist",
	"Researcher",
	"Gynaecologist",
	"Proctologist",
	"Mortician",
	"Surgeon",
	"Terrorist"
    ];

    var address = [
	"Dr.", 
	"Professor",
	"Colonel",
	"Admiral",
	"Colonel",
	"Mr.",
	"Mrs.",
	"Lord"
    ];

    var ominous = [
	"Doom",
	"Black",
	"Death",
	"Decay",
	"Damnation",
	"Apocalypse",
	"Evil",
	"Danger",
	"Murder",
	"Storm",
	"Mutilation",
	"Hell",
	"Fear",
	"Oblivion",
	"Nonsense",
	"Iron",
	"Frost",
	"Ice",
	"Flame",
	"Propane",
	"Terror",
	"Dread",
	"Antipathy",
	"Melancholy",
	"Sadness",
	"Discordia",
	"Deceit",
	"Undeath",
	"Gloom",
	"Blood",
	"Viscera",
	"Entropy",
	"Gore",
	"Horror"
    ];

    var anatomy = [
	"eye",
	"skull",
	"tongue",
	"throat",
	"tooth",
	"fang",
	"claw",
	"skin",
	"horn",
	"tail",
	"whip",
	"foot",
	"beard",
	"talon",
	"fingers",
	"bone",
	"sword",
	"nail",
	"brain",
	"ribs",
	"blood",
	"spleen",
	"grip",
	"finger",
	"feet",
	"hands",
	"hand"
    ];
    
    var attribute = [
	"Stout",
	"Fire",
	"Hell",
	"Iron",
	"Hate",
	"Whisper",
	"Ghost",
	"Gore",
	"Fiend",
	"Evil",
	"Black",
	"Red",
	"Death",
	"Glimmer",
	"Fear",
	"Grey",
	"Rot",
	"Scar",
	"Bloat",
	"Derp",
	"Tinkle",
	"Maim",
	"Rust",
	"Dark",
	"Shadow",
	"Soul",
	"Lithe",
	"Stone",
	"Rock"
    ];

    var adjective = [
	"Dark",
	"Undead",
	"Black",
	"Evil",
	"Unspeakable",
	"Red",
	"Dead",
	"Mutant",
	"Alien",
	"Green",
	"Gambling",
	"Sunken",
	"Ravaged",
	"Ruined",
	"Derelict",
	"Guilty",
	"Forbidden",
	"Fiendish",
	"Acidic",
	"Shameful",
	"Slumbering",
	"Lifeless",
	"Merciless",
	"Unyielding",
	"Sexy",
	"Ghastly",
	"Cursed",
	"Overweight",
	"Faceless",
	"Unearthed",
	"Rotting",
	"Silver",
	"Golden",
	"Obsidian",
	"Ghoulish",
	"Silent",
	"Oily",
	"Dashing",
	"Graveyard",
	"Secret",
	"Hidden",
	"Deceiving",
	"Deceitful",
	"Hateful",
	"Spiteful",
	"Scornful",
	"Scorned",
	"Long-Forgotten",
	"Forgotten",
	"Relentless",
	"World-Devouring",
	"Iron-Fisted",
	"Naughty",
	"Unconquered",
	"Romanian",
	"Boring",
	"[CENSORED]",
	"Soulless",
	"Terrible",
	"Dreadful",
	"Nightmarish",
	"Burning",
	"Blazing",
	"Untouched",
	"Unimaginable"
    ];

    var killer = [
	"Killer",
	"Murderer",
	"Bane",
	"Destroyer",
	"Eater",
	"Devourer",
	"Betrayer",
	"Unmaker",
	"Ender",
	"Harbinger",
	"Reaper",
	"Demolisher",
	"Anathema",
	"Blasphemer",
	"Defiler",
	"Corruptor",
	"End",
	"Ghost",
	"Antithesis",
	"Enemy"
    ];

    var good = [
	"Worlds",
	"Men",
	"Souls",
	"Hearts",
	"Innocence",
	"Virgins",
	"Purity",
	"Good",
	"Women",
	"Children",
	"Mankind",
	"Civilization",
	"Hopes",
	"Dreams",
	"Life",
	"Faith",
	"Candy",
	"Happiness",
	"Stars",
	"Galaxies",
	"Planets",
	"Species",
	"Gods",
	"Spirits",
	"Light",
	"Suns",
	"Seasons",
	"Time",
	"Speech",
	"Thought",
	"Freedom"
    ];

    var syl1 = [
	"Tor", "Orc", "Naak", "Sod", "Fin", "Leth", "Praz", "Vec", "Nil", "Oth", "Med", "Pic", "Lork", "Vaz", 
	"Nom", "Tod", "Tas", "Shas", "Ol", "Op", "Or", "Av", "Ar", "Sul", "Xer", "Pok", "Gor", "Hodr", "Feld",
	"Mun", "Mung", "Rot", "Dhal", "Mer"
    ];
    
    var syl2 = [
	"", "oth", "ol", "ul", "udr", "onor", "edra", "a", "aa", "a'a", "mol", "mo", "o", "i", "i'i", "ket", "ir",
	"ari", "oz", "toroth", "naki", "idora", "osal", "dros", "'athi", "'onnor", "-Zol", "-Nad", "-Vec", "os",
	"ippe", "ippus", "trus", "innus", "rog", "oggoth", "thoth", "tag", "dor", "ki", "emon", "dhal"
    ];
                       
    var name1 = [
	"Kills",
	"Dreams-of",
	"Eats",
	"Dances-with",
	"Drinks",
	"Cooks",
	"Befouls",
	"Betrays",
	"Stabs",
	"Murders",
	"Bears",
	"Seduces",
	"Tempts",
	"Complains-about",
	"Causes",
	"Finds",
	"Summons",
	"Destroys",
	"Touches",
	"Vomits",
	"Mauls",
	"Maims",
	"Burns",
	"Drowns",
	"Enslaves",
	"Commands",
	"Stinks-of",
	"Smells-like",
	"Sounds-like",
	"Born-of",
	"Child-of",
	"Doom-of",
	"Whispers-to",
	"Whispers-of",
	"Names",
	"Wields"
    ];

    var name2 = [
	"a-star",
	"a-bear",
	"demons",
	"a-succubus",
	"wolves",
	"a-paladin",
	"the-world",
	"the-nine-hells",
	"a-king",
	"a-queen",
	"an-army",
	"the-innocent",
	"nightmares",
	"the-galaxy",
	"black-holes",
	"neutrons",
	"protons",
	"a-continent",
	"children",
	"all-men",
	"all-women",
	"all-life",
	"a-dream",
	"a-fart",
	"a-riddle",
	"a-desire",
	"a-memory",
	"freedom",
	"a-shadow",
	"shadows",
	"a-parasite",
	"a-worm",
	"worms",
	"a-dragon",
	"a-wyvern",
	"a-werebear",
	"names",
	"words",
	"all-tongues",
	"silence"
    ];

    var elemental = [
	"Elemental",
	"Golem",
	"Avatar"
    ];

    var matter = [
	"Bone",
	"Blood",
	"Flesh",
	"Clay",
	"Fire",
	"Water",
	"Wind",
	"Earth",
	"Stone",
	"Shadow",
	"Pain",
	"Tear",
	"Mud",
	"Lava",
	"Steam",
	"Dust",
	"Ash",
	"Despair"
    ];

    var name = [
	[ attribute, '', anatomy ],
	[ syl1, '', syl2 ],
	[ name1, '-', name2 ]
    ];

    var root = [
	[ address, ' ', ominous ],
	[ "The ", ruler, " of ", ominous ],
	[ "The ", rulers, " of ", ominous ],
	[ "The ", killer, " of ", good ],
	[ "The ", adjective, " ", person ],
	[ "The ", adjective, " ", killer, ' of ', good ],
	[ name, ' the ', adjective ],
	[ name, ', the ', adjective, ' ', person ],
	[ name, ', ', matter, ' ', elemental ],
	[ name, ', ', killer, ' of ', good], 
	[ name, ', ', ruler, " of ", ominous ]	
    ];
    
    return {
	count: count(root),
	get:   function (n) {
	    return nth(root,Math.floor(n) * 2147483647);
	}
    };

})();
