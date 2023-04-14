[sqlite-tablegenerator](../README.md) / [Exports](../modules.md) / SQLiteColumnOptions

# Interface: SQLiteColumnOptions

Options for column creation

## Table of contents

### Properties

- [autoIncrement](SQLiteColumnOptions.md#autoincrement)
- [default](SQLiteColumnOptions.md#default)
- [notNull](SQLiteColumnOptions.md#notnull)
- [onConflict](SQLiteColumnOptions.md#onconflict)
- [primaryKey](SQLiteColumnOptions.md#primarykey)
- [unique](SQLiteColumnOptions.md#unique)

## Properties

### autoIncrement

• `Optional` **autoIncrement**: `boolean`

Use auto increment on the column

#### Defined in

TableGenerator.ts:31

___

### default

• `Optional` **default**: `string` \| `number`

Add default value

#### Defined in

TableGenerator.ts:35

___

### notNull

• `Optional` **notNull**: `boolean`

Add "NOT NULL" constraint

#### Defined in

TableGenerator.ts:33

___

### onConflict

• `Optional` **onConflict**: [`SQLiteOnConflict`](../modules.md#sqliteonconflict)

Add action on conflict

#### Defined in

TableGenerator.ts:39

___

### primaryKey

• `Optional` **primaryKey**: `boolean`

Use column has primary key

#### Defined in

TableGenerator.ts:29

___

### unique

• `Optional` **unique**: `boolean`

Add unique constraint

#### Defined in

TableGenerator.ts:37
