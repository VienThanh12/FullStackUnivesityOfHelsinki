
The application should work as follows. You use the program by passing three command-line arguments (the first is the password), e.g.:

# node mongo.js yourpassword Anna 040-1234556copy
As a result, the application will print:

# added Anna number 040-1234556 to phonebookcopy
The new entry to the phonebook will be saved to the database. Notice that if the name contains whitespace characters, it must be enclosed in quotes:

# node mongo.js yourpassword "Arto Vihavainen" 045-1232456copy
If the password is the only parameter given to the program, meaning that it is invoked like this:

# node mongo.js yourpasswordcopy
Then the program should display all of the entries in the phonebook:

phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
