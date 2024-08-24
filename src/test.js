const data = [
  { id: 1, category: "fruit", name: "apple" },
  { id: 2, category: "vegetable", name: "carrot" },
  { id: 3, category: "fruit", name: "banana" },
  { id: 4, category: "vegetable", name: "broccoli" },
  { id: 5, category: "fruit", name: "mango" }
];

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
      // Extract the key to group by
      const groupKey = currentValue[key];

      // Initialize the group if it doesn't exist
      if (!result[groupKey]) {
          result[groupKey] = [];
      }

      // Push the current element into the correct group
      result[groupKey].push(currentValue);

      return result;
  }, {});
};

// Group the data by the 'category' key
const groupedData = groupBy(data, 'category');
