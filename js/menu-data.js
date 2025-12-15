// Enhanced Menu data with variants and extras
const MENU = {
    "Aloo Fries": [
        { "name": "Aloo Fries Medium", "price": 70 },
        { "name": "Aloo Fries Large", "price": 130 },
        { "name": "Cajun & Garlic Fries", "price": 150 },
        { "name": "Chili Fries", "price": 160 },
        { "name": "Spicy Buff Sausage Fries", "price": 160 },
        { "name": "Cheesy Fries", "price": 170 },
        { "name": "Chicken Makhani Fries", "price": 190 },
    ],
    "Da Aloo Special": [
        { "name": "Battered Fries", "price": 180 },
        { "name": "Fried Pizza Ball", "price": 180 },
    ],
    "Spirals": [
        {
            "name": "Aloo's Spiral",
            "price": 60,
            "extras": [
                { "name": "Extra Sauce", "price": 20 }
            ]
        },
        {
            "name": "Cheesy Spiral",
            "price": 80,
            "extras": [
                { "name": "Extra Sauce", "price": 20 }
            ]
        },
        {
            "name": "Battered Spiral",
            "price": 80,
            "extras": [
                { "name": "Extra Sauce", "price": 20 }
            ]
        },
    ],
    "Katti Roll": [
        {
            "name": "Aloo Chat Katti Roll",
            "price": 120,
            "extras": [
                { "name": "Add Egg", "price": 30 }
            ]
        },
        {
            "name": "Spicy Buff Sausage Katti Roll",
            "price": 160,
            "extras": [
                { "name": "Add Egg", "price": 30 }
            ]
        },
        {
            "name": "Paneer Katti Roll",
            "price": 160,
            "extras": [
                { "name": "Add Egg", "price": 30 }
            ]
        },
        {
            "name": "Tandoori Chicken Katti Roll",
            "price": 180,
            "extras": [
                { "name": "Add Egg", "price": 30 }
            ]
        },
    ],
    "Mo:Mo": [
        {
            "name": "Aloo Mo:Mo",
            "variants": [
                { "name": "Steam", "price": 100 },
                { "name": "Kothey", "price": 120 },
                { "name": "Fried", "price": 130 },
                { "name": "Jhol", "price": 140 },
                { "name": "Chilli", "price": 150 }
            ]
        },
        {
            "name": "Paneer Mo:Mo",
            "variants": [
                { "name": "Steam", "price": 130 },
                { "name": "Kothey", "price": 140 },
                { "name": "Fried", "price": 150 },
                { "name": "Jhol", "price": 160 },
                { "name": "Chilli", "price": 180 }
            ]
        },
        {
            "name": "Buff Mo:Mo",
            "variants": [
                { "name": "Steam", "price": 130 },
                { "name": "Kothey", "price": 140 },
                { "name": "Fried", "price": 150 },
                { "name": "Jhol", "price": 160 },
                { "name": "Chilli", "price": 180 }
            ]
        },
        {
            "name": "Chicken Mo:Mo",
            "variants": [
                { "name": "Steam", "price": 150 },
                { "name": "Kothey", "price": 160 },
                { "name": "Fried", "price": 170 },
                { "name": "Jhol", "price": 180 },
                { "name": "Chilli", "price": 190 }
            ]
        },
    ],
    "Burger": [
        {
            "name": "Aloo Tikki Burger",
            "price": 160,
            "extras": [
                { "name": "Add Cheese", "price": 50 }
            ]
        },
        {
            "name": "Chicken Burger",
            "price": 220,
            "extras": [
                { "name": "Add Cheese", "price": 50 }
            ]
        },
        {
            "name": "Spicy Buff Burger",
            "price": 210,
            "extras": [
                { "name": "Add Cheese", "price": 50 }
            ]
        },
    ],
    "Sandwich": [
        { "name": "Veg Sandwich", "price": "140" },
        { "name": "Chicken Sandwich", "price": "180" },
    ],
    "Keema Noodles": [
        { "name": "Paneer Keema Noodles", "price": "180" },
        { "name": "Chicken Keema Noodles", "price": "200" },
        { "name": "Buff Keema Noodles", "price": "180" },
    ],
    "Fried Rice": [
        { "name": "Veg Fried Rice", "price": "120" },
        { "name": "Chicken Fried Rice", "price": "180" },
        { "name": "Buff Fried Rice", "price": "160" },
        { "name": "Mixed Fried Rice", "price": "200" },
    ],
    "Chowmein": [
        { "name": "Veg Chowmein", "price": "110" },
        { "name": "Chicken Chowmein", "price": "170" },
        { "name": "Buff Chowmein", "price": "150" },
        { "name": "Mixed Chowmein", "price": "190" },
    ],
    "Snacks": [
        { "name": "Chicken Chilly", "price": 250 },
        { "name": "Buff Chilly", "price": 240 },
        { "name": "Paneer Chilly", "price": 240 },
        { "name": "Chicken Sausage Chilly", "price": 190 },
        { "name": "Buff Sausage Chilly", "price": 180 },
        { "name": "Sausage", "price": "50-60", "variants": [{ "name": "Buff", "price": 50 }, { "name": "Chicken", "price": 60 }] },
        { "name": "Chicken Nuggets", "price": 250 },
    ],
    "Chicken Wings": [
        { "name": "Buffalo Hot Wings", "price": 330, "details": "3 pcs" },
        { "name": "Crunchy Wings", "price": 330, "details": "3 pcs" },
        { "name": "Cheesy Garlic Wings", "price": 350, "details": "3 pcs" },
    ],
    "Rice or Roti Meal": [
        {
            "name": "Butter Chicken Curry",
            "price": 210,
            "extras": [
                { "name": "With Rice", "price": 0, "type": "radio", "group": "serving" },
                { "name": "With Roti", "price": 0, "type": "radio", "group": "serving" }
            ]
        },
        {
            "name": "Tandoori Chicken Curry",
            "price": 200,
            "extras": [
                { "name": "With Rice", "price": 0, "type": "radio", "group": "serving" },
                { "name": "With Roti", "price": 0, "type": "radio", "group": "serving" }
            ]
        },
        {
            "name": "Masala Paneer Curry",
            "price": 200,
            "extras": [
                { "name": "With Rice", "price": 0, "type": "radio", "group": "serving" },
                { "name": "With Roti", "price": 0, "type": "radio", "group": "serving" }
            ]
        },
        {
            "name": "Aloo Curry",
            "price": 160,
            "extras": [
                { "name": "With Rice", "price": 0, "type": "radio", "group": "serving" },
                { "name": "With Roti", "price": 0, "type": "radio", "group": "serving" }
            ]
        },
    ],
    "Cold Drinks": [
        { "name": "Coke / Fanta / Sprite", "price": 70 },
        { "name": "Cold Coffee", "price": 120 },
        { "name": "Ice Mint Lemonade", "price": 140 },
        { "name": "Green Apple Mojito", "price": 150 },
        { "name": "Blue Lagoon", "price": 160 },
        { "name": "Peach Ice Tea", "price": 160 },
        { "name": "Strawberry Lemonade", "price": 160 },
        { "name": "Sweet Lassi", "price": 100 },
    ],
    "Hot Drinks": [
        { "name": "Masala Black Tea", "price": 30 },
        { "name": "Masala Milk Tea", "price": 50 },
        { "name": "Lemon Tea", "price": 40 },
        { "name": "Suja (Butter Milk Tea)", "price": 70 },
        { "name": "Hot Lemon", "price": 70 },
        { "name": "Americano", "price": 80 },
        { "name": "Cappuccino", "price": 100 },
        { "name": "Hot Chocolate", "price": 100 },
    ]
};

// Category images mapping
const CATEGORY_IMAGES = {
    "Aloo Fries": "images/categories/aloo-fries.jpg",
    "Da Aloo Special": "images/categories/special.jpg",
    "Spirals": "images/categories/spirals.jpg",
    "Katti Roll": "images/categories/katti-roll.jpg",
    "Mo:Mo": "images/categories/momo.jpg",
    "Burger": "images/categories/burger.jpg",
    "Sandwich": "images/categories/sandwich.jpg",
    "Keema Noodles": "images/categories/keema-noodles.jpg",
    "Fried Rice": "images/categories/fried-rice.jpg",
    "Chowmein": "images/categories/chowmein.jpg",
    "Snacks": "images/categories/snacks.jpg",
    "Chicken Wings": "images/categories/chicken-wings.jpg",
    "Rice or Roti Meal": "images/categories/rice-roti.jpg",
    "Cold Drinks": "images/categories/cold-drinks.jpg",
    "Hot Drinks": "images/categories/hot-drinks.jpg"
};

// Utility function to find menu item
function findMenuItem(itemName) {
    for (const [category, items] of Object.entries(MENU)) {
        const item = items.find(item => item.name === itemName);
        if (item) return item;
    }
    return null;
}

// Image fallback handler
function handleTabImageError(img, categoryName) {
    img.parentElement.innerHTML = `<div style="font-size:1.5rem;color:#666;">🍽️</div>`;
}