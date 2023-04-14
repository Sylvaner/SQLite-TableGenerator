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
  ifNotExists?: boolean,
  /** Create temporary table */
  temporary?: boolean
}

/**
 * Options for column creation
 */
export interface SQLiteColumnOptions {
  /** Use column has primary key */
  primaryKey?: boolean,
  /** Use auto increment on the column */
  autoIncrement?: boolean,
  /** Add "NOT NULL" constraint */
  notNull?: boolean,
  /** Add default value */
  default?: string | number,
  /** Add unique constraint */
  unique?: boolean,
  /** Add action on conflict */
  onConflict?: SQLiteOnConflict
}

/**
 * Column informations
 */
export interface SQLiteColumn {
  /** Column name */
  name: string,
  /** Column type */
  type: SQLiteColumnType,
  /** Column options */
  options?: SQLiteColumnOptions
}

/**
 * Foreign key informations
 * @interface SQLiteForeignKey
 */
export interface SQLiteForeignKey {
  /** Column to apply foreign key*/
  column: string,
  /** Target table containing the foreign key  */
  targetTable: string,
  /** Target column containing the foreign key  */
  targetColumn: string,
  /** On update action */
  onUpdate?: SQLiteForeignKeyActions,
  /** On delete action */
  onDelete?: SQLiteForeignKeyActions
}

/**
 * Global struct for table creation
 * @interface SQLiteCreate
 */
export interface SQLiteCreate {
  /** Table name */
  name: string,
  /** Table options */
  options?: SQLiteTableOptions,
  /** Columns array */
  columns: SQLiteColumn[],
  /** Foreign keys array */
  foreignKeys?: SQLiteForeignKey[]
}

/**
 * Row information for a classical column id with auto increment and primary key
 */
export const CLASSIC_COLUMN_ID: SQLiteColumn = {
  name: 'id',
  type: 'INTEGER',
  options: {
    primaryKey: true,
    autoIncrement: true
  }
}

/**
 * Generate SQLite query for table creation
 */
export class TableGenerator implements SQLiteCreate {
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
  constructor(name: string, options?: SQLiteTableOptions) {
    this.name = name;
    this.options = options;
    this.columns = [];
  }

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
  public static fromData(data: SQLiteCreate): TableGenerator {
    const generator = new TableGenerator(data.name);
    generator.options = data.options;
    generator.columns = data.columns;
    generator.foreignKeys = data.foreignKeys;
    return generator;
  }

  /**
   * Define table options
   * 
   * @param options - Table options
   */
  public setTableOptions(options: SQLiteTableOptions): void {
    this.options = options;
  }

  /**
   * Add a classic column id
   * 
   * @remarks
   * Column named 'id', with auto increment and primary key
   * 
   * @returns False if column id already exists
   */
  public addClassicIdColumn(): boolean {
    return this.addColumn(CLASSIC_COLUMN_ID.name, CLASSIC_COLUMN_ID.type, CLASSIC_COLUMN_ID.options);
  }

  /**
   * Add a column to the table
   * 
   * @param name - Name of the column
   * @param type - Type of the column
   * @param options - Options of the column
   * 
   * @returns False if column with the same name already exists
   */
  public addColumn(name: string, type: SQLiteColumnType, options?: SQLiteColumnOptions): boolean {
    if (this.columns.find(c => c.name === name) !== undefined) {
      return false;
    } else {
      this.columns.push({
        name,
        type,
        options
      })
      return true;
    }
  }

  /**
   * Add a foreign key to the table
   * 
   * @param foreignKey - Informations about the foreign key to add
   */
  public addForeignKey(foreignKey: SQLiteForeignKey) {
    if (this.foreignKeys === undefined) {
      this.foreignKeys = [];
    }
    this.foreignKeys.push(foreignKey);
  }

  /**
   * Obtain the first part of the SQLite query for table creation
   * 
   * @returns String with CREATE TABLE part
   */
  private getCreateTableString(): string {
    if (this.options === undefined) {
        return `CREATE TABLE ${this.name}`;
    }
    let items = ['CREATE'];
    if (this.options.temporary === true) {
        items.push('TEMP');
    }
    items.push('TABLE');
    if (this.options.ifNotExists === true) {
        items.push('IF NOT EXISTS');
    }
    items.push(this.name);
    return items.join(' ');
  }
  
  /**
   * Obtain the column SQLite syntax for column
   * 
   * @param column - Informations about the column
   * 
   * @returns String with the part of the query for column
   */
  private getCreateColumnString(column: SQLiteColumn): string {
    const items = [column.name, column.type];
    if (column.options !== undefined) {
      if (column.options.primaryKey === true) {
        items.push('PRIMARY KEY');
      }
      if (column.options.autoIncrement === true) {
        items.push('AUTOINCREMENT');
      }
      if (column.options.notNull === true) {
        items.push('NOT NULL');
      }
      if (column.options.unique === true) {
        items.push('UNIQUE');
      }
      if (column.options.onConflict !== undefined) {
        items.push(`ON CONFLICT ${column.options.onConflict}`);
      }
      if (column.options.default !== undefined) {
        if (typeof column.options.default === 'string') {
          items.push(`DEFAULT "${column.options.default}"`);
        } else {
          items.push(`DEFAULT ${column.options.default}`);
        }
      }
    }
    return items.join(' ');
  }
  
  /**
   * Obtain the column SQLite syntax for foreign key
   * 
   * @param foreignKey - Foreign key informations
   * 
   * @returns String with the part of the query for foreign key
   */
  private getCreateForeignKeyString(foreignKey: SQLiteForeignKey): string {
    let result = `FOREIGN KEY(${foreignKey.column}) REFERENCES ${foreignKey.targetTable}(${foreignKey.targetColumn})`;
    if (foreignKey.onUpdate !== undefined) {
      result += ` ON UPDATE ${foreignKey.onUpdate}`;
    }
    if (foreignKey.onDelete !== undefined) {
      result += ` ON DELETE ${foreignKey.onDelete}`;
    }
    return result;
  }
  
  /**
   * Generate the final SQL query for table creation
   * 
   * @param humanReadable - Output human readable string (multilines)
   * 
   * @returns String with the query
   */
  public getCreateTableQuery(humanReadable?: boolean): string {
    if (humanReadable === undefined) {
      humanReadable = false;
    }
    const create = this.getCreateTableString()
    const rows = this.columns.map(column => this.getCreateColumnString(column));
    let foreignKeys: string[] = [];
    if (this.foreignKeys !== undefined) {
      foreignKeys = this.foreignKeys.map(foreignKey => this.getCreateForeignKeyString(foreignKey));
    }
    if (humanReadable) {
      return `${create} (\n${rows.join(",\n")}${foreignKeys.length > 0 ? ",\n" + foreignKeys.join(",\n") : ''}\n);`;
    } else {
      return `${create} (${rows.join(',')}${foreignKeys.length > 0 ? ',' + foreignKeys.join(',') : ''})`;
    }
  }
}