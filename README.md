# SQLite Table Generator

Helper class for generating SQL query for class creation in SQLite format.

# Installation

Npm : 
```
npm install  https://github.com/Sylvaner/SQLite-TableGenerator
```

Yarn : 
```
yarn add https://github.com/Sylvaner/SQLite-TableGenerator
```

# Usage

## Create simple table with class methods
```ts
import { CLASSIC_COLUMN_ID, TableGenerator } from "sqlite-tablegenerator";

// Simple id, name table
const homeGenerator = new TableauGenerator('home');
homeGenerator.addColumn('name', 'INTEGER');
console.log(homeGenerator.getCreateTableQuery(true));
```

Result

```sql
CREATE TABLE home (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT
);
```

## Create complex table with class methods
```ts
import { CLASSIC_COLUMN_ID, TableGenerator } from "sqlite-tablegenerator";

const personGenerator = new TableGenerator('person');
personGenerator.setTableOptions({ifNotExists: true});
personGenerator.addClassicIdColumn();
personGenerator.addColumn('name', 'TEXT', {notNull: true, default: 'John'});
personGenerator.addColumn('home', 'INTEGER', {notNull: true});
personGenerator.addForeignKey({
  column: 'home',
  targetTable: 'home',
  targetColumn: 'id',
  onDelete: 'CASCADE'
});
console.log(personGenerator.getCreateTableQuery(true));
```
Result
```sql
CREATE TABLE IF NOT EXISTS person (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL DEFAULT "John",
home INTEGER NOT NULL,
FOREIGN KEY(home) REFERENCES home(id) ON DELETE CASCADE
);
```

## Create simple table from struct
```ts
import { CLASSIC_COLUMN_ID, TableGenerator } from "sqlite-tablegenerator";

const homeGenerator = TableGenerator.fromData({
  name: 'home',
  columns: [
    CLASSIC_COLUMN_ID,
    {
      name: 'name',
      type: 'TEXT'
    }
  ]
});
```
Result
```sql
CREATE TABLE home (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT
);
```

## Create complex table from struct
```ts
import { CLASSIC_COLUMN_ID, TableGenerator } from "sqlite-tablegenerator";

const homeGenerator = TableGenerator.fromData({
    name: 'person',
    options: {
        ifNotExists: true
    },
    columns: [
        CLASSIC_COLUMN_ID,
        {
            name: 'name',
            type: 'TEXT',
            options: {
                notNull: true,
                default: 'John'
            }
        },
        {
            name: 'home',
            type: 'INTEGER',
            options: {
                notNull: true
            }
        }
    ],
    foreignKeys: [
        {
            column: 'home',
            targetTable: 'home',
            targetColumn: 'id',
            onDelete: 'CASCADE'
        }
    ]
});
console.log(homeGenerator.getCreateTableQuery(true));
```
Result
```sql
CREATE TABLE IF NOT EXISTS person (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL DEFAULT "John",
home INTEGER NOT NULL,
FOREIGN KEY(home) REFERENCES home(id) ON DELETE CASCADE
);
```

# Sample

To execute [sample code](https://github.com/Sylvaner/SQLite-TableGenerator/blob/main/samples/index.ts)

```
npm run sample
```

# Documentation

[Full documentation](https://github.com/Sylvaner/SQLite-TableGenerator/blob/main/docs/modules.md)