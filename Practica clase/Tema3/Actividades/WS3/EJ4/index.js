function createTreasureHunt(rows, cols) {
    if (rows < 5 || cols < 5) {
      throw new Error("Dimensions must be at least 5x5.");
    }
  
    const map = Array.from({ length: rows }, () => Array(cols).fill(0));
  
    // Function to get a random position within the map
    const getRandomPosition = () => {
      return {
        row: Math.floor(Math.random() * rows),
        col: Math.floor(Math.random() * cols),
      };
    };
  
    // Fill the map with clues
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Get the next position
        const nextPosition = getRandomPosition();
        const nextRow = nextPosition.row + 1; // 1-based index
        const nextCol = nextPosition.col + 1; // 1-based index
  
        // Set the clue value
        map[r][c] = nextRow * 10 + nextCol;
      }
    }
  
    // Place treasure at a random position
    const treasurePosition = getRandomPosition();
    const treasureRow = treasurePosition.row;
    const treasureCol = treasurePosition.col;
  
    // Ensure treasure value matches coordinates
    map[treasureRow][treasureCol] = (treasureRow + 1) * 10 + (treasureCol + 1);
  
    return map;
  }
  
  // Example usage:
  const treasureHuntArray = createTreasureHunt(5, 5);
  console.log(treasureHuntArray);
  