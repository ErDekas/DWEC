1) Write examples with Arrays to solve the next problems using only Array methods (like iterators, etc...):

- find largest number
- find longest string 
- find even numbers
- find odd numbers
- find words that contain 'is'
- assert all numbers are divisible by three
- zip two arrays together
- sort joined array from smallest to largest
- remove the first word in the array
- place a new word at the start of the array
- replace some elements

2) Over an array with names, find all entries whose firstname starts with 'J',  create projection combined of only the initials of the name and then sort alphabetically

3) Treasure hunt
```
                  +-------------------------+
                  ¦ 34 ¦ 21 ¦ 32 ¦ 41 ¦ 25  ¦
                  +----+----+----+----+-----¦
                  ¦ 14 ¦ 42 ¦ 43 ¦ 14 ¦ 31  ¦
                  +----+----+----+----+-----¦
                  ¦ 54 ¦ 45 ¦ 52 ¦ 42 ¦ 23  ¦
                  +----+----+----+----+-----¦
                  ¦ 33 ¦ 15 ¦ 51 ¦ 31 ¦ 35  ¦
                  +----+----+----+----+-----¦
                  ¦ 21 ¦ 52 ¦ 33 ¦ 13 ¦ 23  ¦
                  +-------------------------+
```        

Do you like treasure hunts? In this problem you are to write a program to explore the above array for a treasure. The values in the array are clues. Each cell contains an integer between 11 and 55; for each value the ten's digit represents the row number and the unit's digit represents the column number of the cell containing the next clue. Starting in the upper left corner (at 1,1), use the clues to guide your search of the array. (The first three clues are 11, 34, 42). The treasure is a cell whose value is the same as its coordinates. Your program must first read in the treasure map data into a 5 by 5 array. Your program should output the cells it visits during its search, and a message indicating where you found the treasure.

4) Develop a function wich be able to create a random treasure hunt like the previous one. As arguments it will recibe the dimensions of the array (at least 5x5) and must return a valid treasure hunt array.

5) Write a program to search for the "saddle points" in a 5 by 5 array of integers. A saddle point is a cell whose value is greater than or equal to any in its row, and less than or equal to any in its column. There may be more than one saddle point in the array. Print out the coordinates of any saddle points your program finds. Print out "No saddle points" if there are none.

6) One classic method for composing secret messages is called a square code.  The spaces are removed from the english text
and the characters are written into a square (or rectangle).  For example, the sentence "If man was meant to stay on the
ground god would have given us roots" is 54 characters long, so it is written into a rectangle with 7 rows and 8 columns.
```
                ifmanwas
                meanttos        
                tayonthe
                groundgo
                dwouldha
                vegivenu
                sroots
 ```
The coded message is obtained by reading down the columns going left to right.   For example, the message above is coded as:

imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn  sseoau

Write a function, that recibe a message and return it coded (have the maximum message length be 81 characters).   Here are some more examples:
```
 Input                                           Output
have a nice day                                 hae and via ecy
feed the dog                                    fto ehg ee  dd
chill out                                       clu hlt io
```

7) Write a function that return the original message from one coded recieved as argument.
