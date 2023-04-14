[sqlite-tablegenerator](README.md) / Exports

# sqlite-tablegenerator

## Table of contents

### Classes

- [TableGenerator](classes/TableGenerator.md)

### Interfaces

- [SQLiteColumn](interfaces/SQLiteColumn.md)
- [SQLiteColumnOptions](interfaces/SQLiteColumnOptions.md)
- [SQLiteCreate](interfaces/SQLiteCreate.md)
- [SQLiteForeignKey](interfaces/SQLiteForeignKey.md)
- [SQLiteTableOptions](interfaces/SQLiteTableOptions.md)

### Type Aliases

- [SQLiteColumnType](modules.md#sqlitecolumntype)
- [SQLiteForeignKeyActions](modules.md#sqliteforeignkeyactions)
- [SQLiteOnConflict](modules.md#sqliteonconflict)

### Variables

- [CLASSIC\_COLUMN\_ID](modules.md#classic_column_id)

## Type Aliases

### SQLiteColumnType

Ƭ **SQLiteColumnType**: ``"TEXT"`` \| ``"INTEGER"`` \| ``"REAL"`` \| ``"BLOB"``

SQLite column type available

#### Defined in

TableGenerator.ts:4

___

### SQLiteForeignKeyActions

Ƭ **SQLiteForeignKeyActions**: ``"NO ACTION"`` \| ``"RESTRICT"`` \| ``"SET NULL"`` \| ``"SET DEFAULT"`` \| ``"CASCADE"``

SQLite options for foreign key actions ON UPDATE and ON DELETE

#### Defined in

TableGenerator.ts:12

___

### SQLiteOnConflict

Ƭ **SQLiteOnConflict**: ``"ABORT"`` \| ``"FAIL"`` \| ``"IGNORE"`` \| ``"REPLACE"`` \| ``"ROLLBACK"``

SQLite options for conflict on insert

#### Defined in

TableGenerator.ts:8

## Variables

### CLASSIC\_COLUMN\_ID

• `Const` **CLASSIC\_COLUMN\_ID**: [`SQLiteColumn`](interfaces/SQLiteColumn.md)

Row information for a classical column id with auto increment and primary key

#### Defined in

TableGenerator.ts:89
