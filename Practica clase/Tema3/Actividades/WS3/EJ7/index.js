function decodeSquareCode(codedMessage) {
    // Split the coded message into parts
    const parts = codedMessage.split(' ');
    const rows = parts.length;
  
    // Calculate the maximum column length
    const cols = Math.max(...parts.map(part => part.length));
  
    // Create a grid to reconstruct the original message
    const grid = Array.from({ length: rows }, () => Array(cols).fill(''));
  
    // Fill the grid with characters from the coded message
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < parts[r].length; c++) {
        grid[r][c] = parts[r][c];
      }
    }
  
    // Reconstruct the original message
    let originalMessage = '';
    for (let r = 0; r < cols; r++) {
      for (let c = 0; c < rows; c++) {
        if (grid[c][r]) {
          originalMessage += grid[c][r];
        }
      }
    }
  
    return originalMessage;
  }
  
  // Example usage
  console.log(decodeSquareCode("hae and via ecy")); // Output: "have a nice day"
  console.log(decodeSquareCode("fto ehg ee dd"));   // Output: "feed the dog"
  console.log(decodeSquareCode("clu hlt io"));       // Output: "chill out"
  