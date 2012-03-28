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
		build(output,tree[i],n % sub);
		n = (n - (n % sub)) / sub;
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
	"Council",
	"Facebook Profile",
	"Secret Circle",
	"Bringer",
	"Legion",
	"Army",
	"Ruler",
	"Knights",
	"Ghost",
	"Spirit",
	"Demigod",
	"God",
	"Blue Screen",
	"Leading Providers",
	"Tax Inspector"
    ];

    var person = [
	"Emperor",
	"Empress",
	"Lord",
	"Bishop", 
	"King",
	"Clown",
	"Force",
	"Legion",
	"Army",
	"Gentleman",
	"Lady",
	"Devil",
	"Entity",
	"Chthonian",
	"Queen",
	"Knight",
	"Traitor",	 
	"Sorcerer",
	"Petroleum",
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
	"Ones",
	"Man",
	"Media Conglomerate",
	"Necromancer",
	"Conjurer",
	"Magician",
	"Demon",
	"Demonologist",
	"Fiend",
	"Gods",
	"Woman",
	"Wanderer",
	"Corporation",
	"Council",
	"Stock Broker",
	"Death Metal Lead Singer",
	"Ruler",
	"Consultant",
	"Government",
	"Monster Behind You",
	"Powerpoint Presentation",
	"Beast",
	"Fatal Error",
	"Tentacle Monster"
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
	"Viscera"
    ];

    var anatomy = [
	"eye",
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
	"bone"
    ];
    
    var attribute = [
	"Stout",
	"Fire",
	"Hell",
	"Iron",
	"Hate",
	"Fiend",
	"Evil",
	"Black",
	"Red",
	"Death",
	"Glimmer",
	"Fear",
	"Grey"
    ];

    var adjective = [
	"Dark",
	"Undead",
	"Black",
	"Evil",
	"Unspeakable",
	"Red",
	"Dead",
	"Government-Sanctioned",
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
	"British",
	"French",
	"Hungarian",
	"Boring",
	"[CENSORED]",
	"Soulless",
	"Nameless"
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
	"Defiler"
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
	"Happiness"
    ];

    var syl1 = [
	"Tor", "Orc", "Naak", "Sod", "Fin", "Leth", "Praz", "Vec", "Nil", "Oth", "Med", "Pic", "Lork", "Vaz", 
	"Nom", "Tod", "Tas", "Shas", "Ol", "Op", "Or", "Av", "Ar", "Us", "Sul", "Xer", "Pok", "Gor"
    ];
    
    var syl2 = [
	"", "oth", "ol", "ul", "udr", "onor", "edra", "a", "aa", "a'a", "mol", "mo", "o", "i", "i-i", "oo"
    ];

    var root = [
	[ address, ' ', ominous ],
	[ "The ", ruler, " of ", ominous ],
	[ "The ", killer, " of ", good ],
	[ "The ", adjective, " ", person ],
	[ "The ", adjective, " ", killer, ' of ', good ],
	[ syl1, syl2, ' the ', adjective], 
	[ syl1, syl2, ', ', killer, ' of ', good ],
	[ attribute, anatomy ],
	[ attribute, anatomy, ' the ', adjective ],
	[ attribute, anatomy, ', ', killer, ' of ', good ]	
    ];
    
    return {
	count: count(root),
	get:   function (n) {
	    return nth(root,Math.floor(n) * 19937);
	}
    };

})();
