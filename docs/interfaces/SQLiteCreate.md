[sqlite-tablegenerator](../README.md) / [Exports](../modules.md) / SQLiteCreate

# Interface: SQLiteCreate

Global struct for table creation
 SQLiteCreate

## Implemented by

- [`TableGenerator`](../classes/TableGenerator.md)

## Table of contents

### Properties

- [columns](SQLiteCreate.md#columns)
- [foreignKeys](SQLiteCreate.md#foreignkeys)
- [name](SQLiteCreate.md#name)
- [options](SQLiteCreate.md#options)

## Properties

### columns

• **columns**: [`SQLiteColumn`](SQLiteColumn.md)[]

Columns array

#### Defined in

TableGenerator.ts:81

___

### foreignKeys

• `Optional` **foreignKeys**: [`SQLiteForeignKey`](SQLiteForeignKey.md)[]

Foreign keys array

#### Defined in

TableGenerator.ts:83

___

### name

• **name**: `string`

Table name

#### Defined in

TableGenerator.ts:77

___

### options

• `Optional` **options**: [`SQLiteTableOptions`](SQLiteTableOptions.md)

Table options

#### Defined in

TableGenerator.ts:79
