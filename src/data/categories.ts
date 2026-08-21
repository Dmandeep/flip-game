export type CategoryItem = {
  id: string;
  name: string;
  icon: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  items: CategoryItem[];
};

export const categories: Category[] = [
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Fresh, colorful, natural',
    icon: '🍎',
    color: 'from-red-400 to-orange-400',
    items: [
      { id: 'f1', name: 'Apple', icon: '🍎' },
      { id: 'f2', name: 'Banana', icon: '🍌' },
      { id: 'f3', name: 'Orange', icon: '🍊' },
      { id: 'f4', name: 'Strawberry', icon: '🍓' },
      { id: 'f5', name: 'Watermelon', icon: '🍉' },
      { id: 'f6', name: 'Grapes', icon: '🍇' },
      { id: 'f7', name: 'Pineapple', icon: '🍍' },
      { id: 'f8', name: 'Mango', icon: '🥭' },
      { id: 'f9', name: 'Kiwi', icon: '🥝' },
      { id: 'f10', name: 'Cherry', icon: '🍒' },
      { id: 'f11', name: 'Peach', icon: '🍑' },
      { id: 'f12', name: 'Coconut', icon: '🥥' },
      { id: 'f13', name: 'Lemon', icon: '🍋' },
      { id: 'f14', name: 'Blueberry', icon: '🫐' },
      { id: 'f15', name: 'Pear', icon: '🍐' },
      { id: 'f16', name: 'Papaya', icon: '🍈' },
      { id: 'f17', name: 'Dragon Fruit', icon: '🐉' },
      { id: 'f18', name: 'Avocado', icon: '🥑' },
      { id: 'f19', name: 'Raspberry', icon: '🍇' },
      { id: 'f20', name: 'Melon', icon: '🍈' },
      { id: 'f21', name: 'Apple Green', icon: '🍏' },
      { id: 'f22', name: 'Tomato', icon: '🍅' },
      { id: 'f23', name: 'Olive', icon: '🫒' },
      { id: 'f24', name: 'Chestnut', icon: '🌰' },
    ]
  },
  {
    id: 'animals',
    name: 'Animals',
    description: 'Playful, nature-inspired',
    icon: '🐶',
    color: 'from-emerald-400 to-teal-400',
    items: [
      { id: 'a1', name: 'Dog', icon: '🐶' },
      { id: 'a2', name: 'Cat', icon: '🐱' },
      { id: 'a3', name: 'Lion', icon: '🦁' },
      { id: 'a4', name: 'Tiger', icon: '🐯' },
      { id: 'a5', name: 'Elephant', icon: '🐘' },
      { id: 'a6', name: 'Monkey', icon: '🐵' },
      { id: 'a7', name: 'Panda', icon: '🐼' },
      { id: 'a8', name: 'Rabbit', icon: '🐰' },
      { id: 'a9', name: 'Fox', icon: '🦊' },
      { id: 'a10', name: 'Bear', icon: '🐻' },
      { id: 'a11', name: 'Wolf', icon: '🐺' },
      { id: 'a12', name: 'Horse', icon: '🐴' },
      { id: 'a13', name: 'Dolphin', icon: '🐬' },
      { id: 'a14', name: 'Penguin', icon: '🐧' },
      { id: 'a15', name: 'Eagle', icon: '🦅' },
      { id: 'a16', name: 'Owl', icon: '🦉' },
      { id: 'a17', name: 'Koala', icon: '🐨' },
      { id: 'a18', name: 'Frog', icon: '🐸' },
      { id: 'a19', name: 'Turtle', icon: '🐢' },
      { id: 'a20', name: 'Snake', icon: '🐍' },
      { id: 'a21', name: 'Whale', icon: '🐳' },
      { id: 'a22', name: 'Fish', icon: '🐟' },
      { id: 'a23', name: 'Octopus', icon: '🐙' },
      { id: 'a24', name: 'Butterfly', icon: '🦋' },
    ]
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    description: 'Modern, energetic',
    icon: '🚗',
    color: 'from-blue-400 to-indigo-400',
    items: [
      { id: 'v1', name: 'Car', icon: '🚗' },
      { id: 'v2', name: 'Bus', icon: '🚌' },
      { id: 'v3', name: 'Bike', icon: '🚲' },
      { id: 'v4', name: 'Motorcycle', icon: '🏍️' },
      { id: 'v5', name: 'Train', icon: '🚂' },
      { id: 'v6', name: 'Airplane', icon: '✈️' },
      { id: 'v7', name: 'Helicopter', icon: '🚁' },
      { id: 'v8', name: 'Ship', icon: '🚢' },
      { id: 'v9', name: 'Truck', icon: '🚚' },
      { id: 'v10', name: 'Taxi', icon: '🚕' },
      { id: 'v11', name: 'Racing Car', icon: '🏎️' },
      { id: 'v12', name: 'Tractor', icon: '🚜' },
      { id: 'v13', name: 'Ambulance', icon: '🚑' },
      { id: 'v14', name: 'Fire Engine', icon: '🚒' },
      { id: 'v15', name: 'Police Car', icon: '🚓' },
      { id: 'v16', name: 'Scooter', icon: '🛴' },
      { id: 'v17', name: 'Rocket', icon: '🚀' },
      { id: 'v18', name: 'Boat', icon: '⛵' },
      { id: 'v19', name: 'Submarine', icon: '🛥️' },
      { id: 'v20', name: 'Cable Car', icon: '🚠' },
      { id: 'v21', name: 'Skateboard', icon: '🛹' },
      { id: 'v22', name: 'Wheelchair', icon: '🦽' },
      { id: 'v23', name: 'Canoe', icon: '🛶' },
      { id: 'v24', name: 'Flying Saucer', icon: '🛸' },
    ]
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Warm, playful',
    icon: '🍕',
    color: 'from-amber-400 to-orange-500',
    items: [
      { id: 'd1', name: 'Pizza', icon: '🍕' },
      { id: 'd2', name: 'Burger', icon: '🍔' },
      { id: 'd3', name: 'Fries', icon: '🍟' },
      { id: 'd4', name: 'Donut', icon: '🍩' },
      { id: 'd5', name: 'Cake', icon: '🍰' },
      { id: 'd6', name: 'Ice Cream', icon: '🍦' },
      { id: 'd7', name: 'Sandwich', icon: '🥪' },
      { id: 'd8', name: 'Sushi', icon: '🍣' },
      { id: 'd9', name: 'Pasta', icon: '🍝' },
      { id: 'd10', name: 'Taco', icon: '🌮' },
      { id: 'd11', name: 'Hot Dog', icon: '🌭' },
      { id: 'd12', name: 'Popcorn', icon: '🍿' },
      { id: 'd13', name: 'Pancakes', icon: '🥞' },
      { id: 'd14', name: 'Waffle', icon: '🧇' },
      { id: 'd15', name: 'Chocolate', icon: '🍫' },
      { id: 'd16', name: 'Cookie', icon: '🍪' },
      { id: 'd17', name: 'Croissant', icon: '🥐' },
      { id: 'd18', name: 'Pretzel', icon: '🥨' },
      { id: 'd19', name: 'Bagel', icon: '🥯' },
      { id: 'd20', name: 'Baguette', icon: '🥖' },
      { id: 'd21', name: 'Cheese', icon: '🧀' },
      { id: 'd22', name: 'Salad', icon: '🥗' },
      { id: 'd23', name: 'Soup', icon: '🥣' },
      { id: 'd24', name: 'Pie', icon: '🥧' },
    ]
  }
];
