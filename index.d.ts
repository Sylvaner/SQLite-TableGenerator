/**
 * SQLite column type available
 */
export type SQLiteColumnType = 'TEXT' | 'INTEGER' | 'REAL' | 'BLOB';
/**
 * SQLite options for conflict on insert
 */
export type SQLiteOnConflict = 'ABORT' | 'FAIL' | 'IGNORE' | 'REPLACE' | 'ROLLBACK';
/**
 * SQLite options for foreign key actions ON UPDATE and ON DELETE
 */
export type SQLiteForeignKeyActions = 'NO ACTION' | 'RESTRICT' | 'SET NULL' | 'SET DEFAULT' | 'CASCADE';
/**
 * Options for table creation
 */
export interface SQLiteTableOptions {
    /** Add "IF NOT EXISTS" test before creation  */
    ifNotExists?: boolean;
    /** Create temporary table */
    temporary?: boolean;
}
/**
 * Options for column creation
 */
export interface SQLiteColumnOptions {
    /** Use column has primary key */
    primaryKey?: boolean;
    /** Use auto increment on the column */
    autoIncrement?: boolean;
    /** Add "NOT NULL" constraint */
    notNull?: boolean;
    /** Add default value */
    default?: string | number;
    /** Add unique constraint */
    unique?: boolean;
    /** Add action on conflict */
    onConflict?: SQLiteOnConflict;
}
/**
 * Column informations
 */
export interface SQLiteColumn {
    /** Column name */
    name: string;
    /** Column type */
    type: SQLiteColumnType;
    /** Column options */
    options?: SQLiteColumnOptions;
}
/**
 * Foreign key informations
 * @interface SQLiteForeignKey
 */
export interface SQLiteForeignKey {
    /** Column to apply foreign key*/
    column: string;
    /** Target table containing the foreign key  */
    targetTable: string;
    /** Target column containing the foreign key  */
    targetColumn: string;
    /** On update action */
    onUpdate?: SQLiteForeignKeyActions;
    /** On delete action */
    onDelete?: SQLiteForeignKeyActions;
}
/**
 * Global struct for table creation
 * @interface SQLiteCreate
 */
export interface SQLiteCreate {
    /** Table name */
    name: string;
    /** Table options */
    options?: SQLiteTableOptions;
    /** Columns array */
    columns: SQLiteColumn[];
    /** Foreign keys array */
    foreignKeys?: SQLiteForeignKey[];
}
/**
 * Row information for a classical column id with auto increment and primary key
 */
export declare const CLASSIC_COLUMN_ID: SQLiteColumn;
/**
 * Generate SQLite query for table creation
 */
export declare class TableGenerator implements SQLiteCreate {
    name: string;
    options?: SQLiteTableOptions | undefined;
    columns: SQLiteColumn[];
    foreignKeys: SQLiteForeignKey[] | undefined;
    /**
     * Create a table generator
     *
     * @param name - Name of the table
     * @param options - Create options
     *
     * @example
     * Table with some columns
     * ```ts
     * const personGenerator = new TableGenerator('person');
     * personGenerator.setTableOptions({ifNotExists: true});
     * personGenerator.addClassicIdColumn();
     * personGenerator.addColumn('name', 'TEXT', {notNull: true, default: 'John'});
     * personGenerator.addColumn('home', 'INTEGER', {notNull: true});
     * personGenerator.addForeignKey({
     *   key: 'home',
     *   targetTable: 'home',
     *   targetKey: 'id',
     *   onDelete: 'CASCADE'
     * });
     * console.log(personGenerator.getCreateTableQuery(true));
     * ```
     * Result:
     * ```sql
     * CREATE TABLE IF NOT EXISTS person (
     * id INTEGER PRIMARY KEY AUTOINCREMENT,
     * name TEXT NOT NULL DEFAULT "John",
     * home INTEGER NOT NULL,
     * FOREIGN KEY(home) REFERENCES home(id) ON DELETE CASCADE
     * );
     * ```
     */
    constructor(name: string, options?: SQLiteTableOptions);
    /**
     * Create a generator from data struct
     *
     * @param data - All informations necessary for table generator
     *
     * @returns Generator with initialized data.
     *
     * @example
     * Create a simple table with id and name
     * ```ts
     * const generator = TableGenerator::fromData({
     *    name: 'person',
     *    options: {
     *      ifNotExists: true
     *    },
     *    columns: [
     *      CLASSIC_ID,
     *      {
     *        name: 'name',
     *        type: 'TEXT',
     *        options: {
     *          notNull: true
     *        }
     *      }
     *    ]
     * });
     * ```
     */
    static fromData(data: SQLiteCreate): TableGenerator;
    /**
     * Define table options
     *
     * @param options - Table options
     */
    setTableOptions(options: SQLiteTableOptions): void;
    /**
     * Add a classic column id
     *
     * @remarks
     * Column named 'id', with auto increment and primary key
     *
     * @returns False if column id already exists
     */
    addClassicIdColumn(): boolean;
    /**
     * Add a column to the table
     *
     * @param name - Name of the column
     * @param type - Type of the column
     * @param options - Options of the column
     *
     * @returns False if column with the same name already exists
     */
    addColumn(name: string, type: SQLiteColumnType, options?: SQLiteColumnOptions): boolean;
    /**
     * Add a foreign key to the table
     *
     * @param foreignKey - Informations about the foreign key to add
     */
    addForeignKey(foreignKey: SQLiteForeignKey): void;
    /**
     * Obtain the first part of the SQLite query for table creation
     *
     * @returns String with CREATE TABLE part
     */
    private getCreateTableString;
    /**
     * Obtain the column SQLite syntax for column
     *
     * @param column - Informations about the column
     *
     * @returns String with the part of the query for column
     */
    private getCreateColumnString;
    /**
     * Obtain the column SQLite syntax for foreign key
     *
     * @param foreignKey - Foreign key informations
     *
     * @returns String with the part of the query for foreign key
     */
    private getCreateForeignKeyString;
    /**
     * Generate the final SQL query for table creation
     *
     * @param humanReadable - Output human readable string (multilines)
     *
     * @returns String with the query
     */
    getCreateTableQuery(humanReadable?: boolean): string;
}
