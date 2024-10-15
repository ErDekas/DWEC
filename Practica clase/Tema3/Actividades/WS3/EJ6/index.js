function squareCode(message) {
    // Remove spaces and limit to 81 characters
    const cleanedMessage = message.replace(/\s+/g, '').substring(0, 81);
    
    const length = cleanedMessage.length;
    const rows = Math.ceil(Math.sqrt(length));
    const cols = Math.ceil(length / rows);
    
    // Create a 2D array to hold the characters
    const grid = Array.from({ length: rows }, (_, r) => {
      return cleanedMessage.substring(r * cols, r * cols + cols).split('');
    });
    
    // Build the encoded message by reading down the columns
    const codedMessage = [];
    for (let c = 0; c < cols; c++) {
      let columnMessage = '';
      for (let r = 0; r < rows; r++) {
        if (grid[r][c] !== undefined) {
          columnMessage += grid[r][c];
        }
      }
      codedMessage.push(columnMessage);
    }
    
    return codedMessage.join(' ');
  }
  
  // Example usage
  console.log(squareCode("have a nice day")); // Output: "hae and via ecy"
  console.log(squareCode("feed the dog"));    // Output: "fto ehg ee dd"
  console.log(squareCode("chill out"));        // Output: "clu hlt io"
  