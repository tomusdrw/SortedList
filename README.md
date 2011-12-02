SortedList implementation for JavaScript based on array and mostly native array functions.
There is a possiblity to specify your own comparator - default comparator works well for Numbers and Strings.

Complexity of functions (without splice complexity):
**peekMin/popMin** O(1)      
**peekMax/popMax** O(1)      
**size**           O(1)      
**isEmpty**        O(1)      
**pushAll(k)**     O(k*log(n)) 
**push**           O(log(n))  
**contains**       O(log(n))  
**remove**         O(log(n))  
**getArray**       O(1)      
