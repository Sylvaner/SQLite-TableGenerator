[sqlite-tablegenerator](../README.md) / [Exports](../modules.md) / TableGenerator

# Class: TableGenerator

Generate SQLite query for table creation

## Implements

- [`SQLiteCreate`](../interfaces/SQLiteCreate.md)

## Table of contents

### Constructors

- [constructor](TableGenerator.md#constructor)

### Properties

- [columns](TableGenerator.md#columns)
- [foreignKeys](TableGenerator.md#foreignkeys)
- [name](TableGenerator.md#name)
- [options](TableGenerator.md#options)

### Methods

- [addClassicIdColumn](TableGenerator.md#addclassicidcolumn)
- [addColumn](TableGenerator.md#addcolumn)
- [addForeignKey](TableGenerator.md#addforeignkey)
- [getCreateColumnString](TableGenerator.md#getcreatecolumnstring)
- [getCreateForeignKeyString](TableGenerator.md#getcreateforeignkeystring)
- [getCreateTableQuery](TableGenerator.md#getcreatetablequery)
- [getCreateTableString](TableGenerator.md#getcreatetablestring)
- [setTableOptions](TableGenerator.md#settableoptions)
- [fromData](TableGenerator.md#fromdata)

## Constructors

### constructor

• **new TableGenerator**(`name`, `options?`)

Create a table generator

**`Example`**

Table with some columns
```ts
const personGenerator = new TableGenerator('person');
personGenerator.setTableOptions({ifNotExists: true});
personGenerator.addClassicIdColumn();
personGenerator.addColumn('name', 'TEXT', {notNull: true, default: 'John'});
personGenerator.addColumn('home', 'INTEGER', {notNull: true});
personGenerator.addForeignKey({
  key: 'home',
  targetTable: 'home',
  targetKey: 'id',
  onDelete: 'CASCADE'
});
console.log(personGenerator.getCreateTableQuery(true));
```
Result:
```sql
CREATE TABLE IF NOT EXISTS person (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL DEFAULT "John",
home INTEGER NOT NULL,
FOREIGN KEY(home) REFERENCES home(id) ON DELETE CASCADE
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the table |
| `options?` | [`SQLiteTableOptions`](../interfaces/SQLiteTableOptions.md) | Create options |

#### Defined in

TableGenerator.ts:139

## Properties

### columns

• **columns**: [`SQLiteColumn`](../interfaces/SQLiteColumn.md)[]

Columns array

#### Implementation of

[SQLiteCreate](../interfaces/SQLiteCreate.md).[columns](../interfaces/SQLiteCreate.md#columns)

#### Defined in

TableGenerator.ts:104

___

### foreignKeys

• **foreignKeys**: `undefined` \| [`SQLiteForeignKey`](../interfaces/SQLiteForeignKey.md)[]

Foreign keys array

#### Implementation of

[SQLiteCreate](../interfaces/SQLiteCreate.md).[foreignKeys](../interfaces/SQLiteCreate.md#foreignkeys)

#### Defined in

TableGenerator.ts:105

___

### name

• **name**: `string`

Table name

#### Implementation of

[SQLiteCreate](../interfaces/SQLiteCreate.md).[name](../interfaces/SQLiteCreate.md#name)

#### Defined in

TableGenerator.ts:102

___

### options

• `Optional` **options**: [`SQLiteTableOptions`](../interfaces/SQLiteTableOptions.md)

Table options

#### Implementation of

[SQLiteCreate](../interfaces/SQLiteCreate.md).[options](../interfaces/SQLiteCreate.md#options)

#### Defined in

TableGenerator.ts:103

## Methods

### addClassicIdColumn

▸ **addClassicIdColumn**(): `boolean`

Add a classic column id

**`Remarks`**

Column named 'id', with auto increment and primary key

#### Returns

`boolean`

False if column id already exists

#### Defined in

TableGenerator.ts:198

___

### addColumn

▸ **addColumn**(`name`, `type`, `options?`): `boolean`

Add a column to the table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the column |
| `type` | [`SQLiteColumnType`](../modules.md#sqlitecolumntype) | Type of the column |
| `options?` | [`SQLiteColumnOptions`](../interfaces/SQLiteColumnOptions.md) | Options of the column |

#### Returns

`boolean`

False if column with the same name already exists

#### Defined in

TableGenerator.ts:211

___

### addForeignKey

▸ **addForeignKey**(`foreignKey`): `void`

Add a foreign key to the table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `foreignKey` | [`SQLiteForeignKey`](../interfaces/SQLiteForeignKey.md) | Informations about the foreign key to add |

#### Returns

`void`

#### Defined in

TableGenerator.ts:229

___

### getCreateColumnString

▸ `Private` **getCreateColumnString**(`column`): `string`

Obtain the column SQLite syntax for column

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | [`SQLiteColumn`](../interfaces/SQLiteColumn.md) | Informations about the column |

#### Returns

`string`

String with the part of the query for column

#### Defined in

TableGenerator.ts:264

___

### getCreateForeignKeyString

▸ `Private` **getCreateForeignKeyString**(`foreignKey`): `string`

Obtain the column SQLite syntax for foreign key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `foreignKey` | [`SQLiteForeignKey`](../interfaces/SQLiteForeignKey.md) | Foreign key informations |

#### Returns

`string`

String with the part of the query for foreign key

#### Defined in

TableGenerator.ts:300

___

### getCreateTableQuery

▸ **getCreateTableQuery**(`humanReadable?`): `string`

Generate the final SQL query for table creation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `humanReadable?` | `boolean` | Output human readable string (multilines) |

#### Returns

`string`

String with the query

#### Defined in

TableGenerator.ts:318

___

### getCreateTableString

▸ `Private` **getCreateTableString**(): `string`

Obtain the first part of the SQLite query for table creation

#### Returns

`string`

String with CREATE TABLE part

#### Defined in

TableGenerator.ts:241

___

### setTableOptions

▸ **setTableOptions**(`options`): `void`

Define table options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SQLiteTableOptions`](../interfaces/SQLiteTableOptions.md) | Table options |

#### Returns

`void`

#### Defined in

TableGenerator.ts:186

___

### fromData

▸ `Static` **fromData**(`data`): [`TableGenerator`](TableGenerator.md)

Create a generator from data struct

**`Example`**

Create a simple table with id and name
```ts
const generator = TableGenerator::fromData({
   name: 'person',
   options: {
     ifNotExists: true
   },
   columns: [
     CLASSIC_ID,
     {
       name: 'name',
       type: 'TEXT',
       options: {
         notNull: true
       }
     }
   ]
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`SQLiteCreate`](../interfaces/SQLiteCreate.md) | All informations necessary for table generator |

#### Returns

[`TableGenerator`](TableGenerator.md)

Generator with initialized data.

#### Defined in

TableGenerator.ts:173
