import { persons } from "./index.js";

class Item {
    constructor(id, name, description) {
        this.name = name;
        this.description = description;
        this.id = id;
    };
};  

class Weapon extends Item {
    constructor(name,description, modifier = 0) {
        super(name, description);
        this.modifier = modifier;
    };
};

 class Armor extends Item {
    constructor(name, description, modifier, bodyPart ) {
        super(name, description)
        this.modifier = modifier;
        this.bodyPart = bodyPart;
    }; 
};

class Potion extends Item {
    constructor(name, modifier, description) {
        super(name, description)
        this.modifier = modifier;
    };
};

class Utility extends Item {
    constructor(name, description) {
        super(name, description)
    };
}; 

class RegularWeapon extends Weapon {
    constructor(name, description, modifier) {
        super(name, description, modifier)
        this.damage = 0
    };
};

class MagicWeapon extends Weapon {
    constructor(name, description, damage, modifier ) {
        super(name, description, modifier)
        this.damage = damage
    };
};

class ItemGenerator {
    constructor() {};

    createItem() {

        const chooseItemFromArray = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        }
        
        /// check type - weapon, armor, potion, utility
        const getType = () => {
            const types = Object.keys(itemMods.names); 
            const result = chooseItemFromArray(types)

            return result
        };
        // save result
        const getTypeResult = getType();
        
        /// choose name
        const getName = (type) => {
            const names = itemMods.names[type];
            if (type === 'armor') {

                // extract keys
                const bodyParts = Object.keys(names)
                // choose body part
                const bodyPartsResult = chooseItemFromArray(bodyParts);
                // extract choosen body part and show it's array
                const armorNames = itemMods.names.armor[bodyPartsResult];
                // choose armor name
                const armorNamesResult = chooseItemFromArray(armorNames);
                
                const result = {
                    name: armorNamesResult,
                    bodyPart: bodyPartsResult
                }
                return result

            } else {
                const result = chooseItemFromArray(names);
                return result
            };
        };

        const getNameResult = getName(getTypeResult)

        /// choose modifier
        const getModifier = (type) => {
            const modifierType = itemMods.modifiers[type];
            const modifier = chooseItemFromArray(modifierType)

            return modifier
        };

        const getModifierResult = getModifier(getTypeResult)

        /// result           

        if(getTypeResult === 'armor') {
            const item = {
                name: `${getModifierResult.name} ${getNameResult.name}`,
                description: `It's a ${getModifierResult.name} ${getNameResult.name}`,
                type: getTypeResult,
                bodyPart: getNameResult.bodyPart,
                modifier: getModifierResult.name,
                modifierVal: getModifierResult.modifier
            }
            return item;
        } else {
            const item = {
                name: `${getModifierResult.name} ${getNameResult}`,
                description: `It's a ${getModifierResult.name} ${getNameResult}`,
                type: getTypeResult,
                modifier: getModifierResult.name,
                modifierVal: getModifierResult.modifier
            }
            return item;
        }
    };
};

const itemMods = {
    names: {
        weapon: ['sword', 'axe', 'mace', 'spear', 'staff'],
        armor: {
            head: ['skull cap', 'iron helmet'],
            hands: ['leather glove', 'chain glove', 'plate glove'],
            torso: ['chainmail', 'chainshirt', 'leather tunic', 'plate armor'],
            legs: ['leather shoes', 'leather boots', 'chain boots', 'plate boots']
        },
        potion: ['health potion', 'mana potion'],
        utility: ['torch']
    },
    modifiers: {
        weapon: [
            {
                name: 'rusty',
                modifier: -1
            },
            {
                name: 'standard',
                modifier: 0
            },
            {
                name: 'new',
                modifier: 1
            },
            {
                name: 'sharp',
                modifier: 2
            }
        ],
        armor: [
            {
                name: 'old',
                modifier: -1
            },
            {
                name: 'standard',
                modifier: 0
            },
            {
                name: 'good quality',
                modifier: 1
            },
            {
                name: 'high quality',
                modifier: 2
            }
        ],
        potion: [
            {
                name: 'weak',
                modifier: -1
            },
            {
                name: 'standard',
                modifier: 0
            },
            {
                name: 'strong',
                modifier: 1
            }
        ],
        utility: [
            {
                name: 'used',
                modifier: -10
            },
            {
                name: 'standard',
                modifier: 0
            },
            {
                name: 'good quality',
                modifier: 10
            }
        ]
    },
}

let items = {
    weapons: [
        new RegularWeapon('Old sword', 'An old rusty sword'), 
        new RegularWeapon('Rusty mace', 'A rusty mace'),
        new RegularWeapon('Magic staff','a magic staff with a blue stone on top'),
        new MagicWeapon('Magic sword', 'Sword imbuded with some sort of magic', 0, 1),
        new MagicWeapon('Magic mace', 'Heavy magic mace', 0, 1)
    ],
    armors: {
        "head": [ new Armor('Rusty helmet', 'an old and worn helmet', 6 )],
        "hands": [],
        "torso": [],
        "legs": []
    },
    potions: [
        new Potion ('Small health potion', 2, 'A small healing potion that recovers 10hp')
    ],
    utility: [
        new Utility ('Torch','A torch that you can use to light dark areas. It also could be a weapon')
    ]
}

export {items, ItemGenerator}