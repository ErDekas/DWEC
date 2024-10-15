const treasureMap = [
    [34, 21, 32, 41, 25],
    [14, 42, 43, 14, 31],
    [54, 45, 52, 42, 23],
    [33, 15, 51, 31, 35],
    [21, 52, 33, 13, 23]
  ];
  
  function findTreasure(map) {
    const visited = [];
    let row = 0; // starting row (1-based index)
    let col = 0; // starting column (1-based index)
  
    while (true) {
      // Current cell value
      const currentCell = map[row][col];
      visited.push(`(${row + 1}, ${col + 1})`);
  
      // Check for treasure
      if (currentCell === (row + 1) * 10 + (col + 1)) {
        console.log(`Treasure found at cell: (${row + 1}, ${col + 1}) with value ${currentCell}`);
        break;
      }
  
      // Calculate next row and column
      const nextRow = Math.floor(currentCell / 10) - 1; // ten's digit
      const nextCol = currentCell % 10 - 1; // unit's digit
  
      // Check if the next position is valid
      if (nextRow < 0 || nextRow >= 5 || nextCol < 0 || nextCol >= 5) {
        console.log("Out of bounds! No treasure found.");
        break;
      }
  
      // Move to the next cell
      row = nextRow;
      col = nextCol;
    }
  
    console.log("Cells visited:", visited.join(" -> "));
  }
  
  // Start the treasure hunt
  findTreasure(treasureMap);
  