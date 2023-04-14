import { CLASSIC_COLUMN_ID, TableGenerator } from '../src';

// Create Home table
const homeGenerator = TableGenerator.fromData({
  name: 'home',
  columns: [
    CLASSIC_COLUMN_ID,
    {
      name: 'address',
      type: 'TEXT'
    }
  ]
});
console.log(homeGenerator.getCreateTableQuery(true));

// Create family table
console.log(TableGenerator.fromData({
    name: 'family',
    options: {
        ifNotExists: true
    },
    columns: [
        {
            name: 'id',
            type: 'INTEGER',
            options: {
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            name: 'name',
            type: 'TEXT',
            options: {
                notNull: true,
                unique: true
            }
        },
        {
            name: 'home',
            type: 'INTEGER'
        }
    ],
    foreignKeys: [
        {
            column: 'home',
            targetTable: 'home',
            targetColumn: 'id'
        }
    ]
}).getCreateTableQuery(true));

// Create Person table
const personGenerator = new TableGenerator('person');
personGenerator.setTableOptions({ifNotExists: true});
personGenerator.addClassicIdColumn();
personGenerator.addColumn('name', 'TEXT', {notNull: true, default: 'John'});
personGenerator.addColumn('home', 'INTEGER', {notNull: true});
personGenerator.addColumn('family', 'INTEGER');
personGenerator.addForeignKey({
  column: 'home',
  targetTable: 'home',
  targetColumn: 'id',
  onDelete: 'CASCADE'
});
personGenerator.addForeignKey({
    column: 'family',
    targetTable: 'family',
    targetColumn: 'id'
});
console.log(personGenerator.getCreateTableQuery(true));
