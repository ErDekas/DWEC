const names = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Jack Daniels",
    "Emma Watson"
  ];
  
  // Step 1: Filter names that start with 'J'
  const filteredNames = names.filter(name => name.startsWith('J'));
  
  // Step 2: Create a projection of initials
  const initials = filteredNames.map(name => name.split(' ').map(part => part.charAt(0)).join(''));
  
  // Step 3: Sort the initials alphabetically
  const sortedInitials = initials.sort();
  
  console.log(sortedInitials); // ['JD', 'JJ', 'JS']
  