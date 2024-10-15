function findSaddlePoints(matrix) {
    const saddlePoints = [];
    
    // Check if the matrix is a 5x5 array
    if (matrix.length !== 5 || !matrix.every(row => row.length === 5)) {
      throw new Error("Input must be a 5x5 matrix.");
    }
  
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const value = matrix[i][j];
  
        // Check if the value is the largest in its row
        const isRowMax = matrix[i].every(cell => value >= cell);
  
        // Check if the value is the smallest in its column
        const isColMin = matrix.every(row => value <= row[j]);
  
        // If both conditions are met, it's a saddle point
        if (isRowMax && isColMin) {
          saddlePoints.push({ row: i + 1, col: j + 1 }); // Store coordinates (1-based)
        }
      }
    }
  
    // Print results
    if (saddlePoints.length > 0) {
      saddlePoints.forEach(point => {
        console.log(`Saddle point found at: (${point.row}, ${point.col})`);
      });
    } else {
      console.log("No saddle points");
    }
  }
  
  // Example usage:
  const array = [
    [3, 5, 7, 2, 8],
    [4, 4, 4, 4, 4],
    [1, 6, 2, 3, 4],
    [9, 8, 7, 1, 0],
    [6, 6, 6, 6, 6]
  ];
  
  findSaddlePoints(array);
  