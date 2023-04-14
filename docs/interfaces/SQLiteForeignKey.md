[sqlite-tablegenerator](../README.md) / [Exports](../modules.md) / SQLiteForeignKey

# Interface: SQLiteForeignKey

Foreign key informations
 SQLiteForeignKey

## Table of contents

### Properties

- [column](SQLiteForeignKey.md#column)
- [onDelete](SQLiteForeignKey.md#ondelete)
- [onUpdate](SQLiteForeignKey.md#onupdate)
- [targetColumn](SQLiteForeignKey.md#targetcolumn)
- [targetTable](SQLiteForeignKey.md#targettable)

## Properties

### column

• **column**: `string`

Column to apply foreign key

#### Defined in

TableGenerator.ts:60

___

### onDelete

• `Optional` **onDelete**: [`SQLiteForeignKeyActions`](../modules.md#sqliteforeignkeyactions)

On delete action

#### Defined in

TableGenerator.ts:68

___

### onUpdate

• `Optional` **onUpdate**: [`SQLiteForeignKeyActions`](../modules.md#sqliteforeignkeyactions)

On update action

#### Defined in

TableGenerator.ts:66

___

### targetColumn

• **targetColumn**: `string`

Target column containing the foreign key

#### Defined in

TableGenerator.ts:64

___

### targetTable

• **targetTable**: `string`

Target table containing the foreign key

#### Defined in

TableGenerator.ts:62
