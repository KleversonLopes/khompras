import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'mercado.db';

export default function VOID() {};

// Abre o banco de dados ou cria se não existir
export async function ConectaDB() {
  //console.log('*** Abrindo:', DATABASE_NAME);
  const Conexao = await SQLite.openDatabaseAsync(DATABASE_NAME);
  return Conexao;
}

export async function CriaDB() {
  const DB: SQLite.SQLiteDatabase = await ConectaDB();

  if (!DB) {
    alert('Banco de dados não conectado');
    //console.log('Banco de dados não conectado');
    return null;
  }

  try {
    /**
     * cria tabela de compras
     */
    await DB.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS compras (
          compra      INTEGER        PRIMARY KEY AUTOINCREMENT,
          descricao   TEXT           NOT NULL,
          data_compra TIMESTAMP      DEFAULT CURRENT_TIMESTAMP NOT NULL,
          limite      NUMERIC (8, 2) DEFAULT 0,
          gastos      NUMERIC (8, 2) DEFAULT 0,
          saldo       NUMERIC (8, 2) AS (limite - gastos)
      );
    `);
      
    /**
     * cria tabela de itens
     */
    await DB.execAsync(`
      CREATE TABLE IF NOT EXISTS itens (
          itemid     INTEGER        PRIMARY KEY AUTOINCREMENT,
          compraid   INTEGER        
            CONSTRAINT fk_compra REFERENCES compras (compra) 
              ON DELETE CASCADE
              ON UPDATE CASCADE,
          nome       TEXT           NOT NULL,
          quantidade NUMERIC (8, 2) NOT NULL DEFAULT (0),
          preco      NUMERIC (8, 2) DEFAULT (0) NOT NULL,
          total      NUMERIC (8, 2) AS (preco * quantidade) 
      );
    `);

    /**
     * cria os triggers do banco de dados
     */
    await DB.execAsync(`
      CREATE TRIGGER IF NOT EXISTS ai_item 
      AFTER INSERT ON itens
      FOR EACH ROW
      BEGIN
          UPDATE compras
            SET gastos = (
                    SELECT sum(total) 
                      FROM itens
                      WHERE compraid = new.compraid
                )
          WHERE compra = new.compraid;
      END;
    `);

    await DB.execAsync(`
      CREATE TRIGGER IF NOT EXISTS au_item 
      AFTER UPDATE ON itens
      FOR EACH ROW
      BEGIN
          UPDATE compras
            SET gastos = (
                    SELECT sum(total) 
                      FROM itens
                      WHERE compraid = new.compraid
                )
          WHERE compra = new.compraid;
      END;
    `);

    await DB.execAsync(`
      CREATE TRIGGER IF NOT EXISTS ad_item 
      AFTER DELETE ON itens
      FOR EACH ROW
      BEGIN
          UPDATE compras
            SET gastos = (
                    SELECT sum(total) 
                      FROM itens
                      WHERE compraid = OLD.compraid
                )
          WHERE compra = OLD.compraid;
      END;
    `);
  } catch (error) {
    alert(`Erro ao criar Banco de Dados:\n ${error}`);
  } finally {
    FechaDB(DB);
  };
};

export async function ApagaDB() {
  const DB: SQLite.SQLiteDatabase = await ConectaDB();

  if (!DB) {
    alert('Banco de dados não conectado');
    //console.log('Banco de dados não conectado');
    return null;
  }

  try {
    await DB.execAsync(`
      DROP TABLE IF EXISTS compras;
      DROP TABLE IF EXISTS itens;
    `);
  } finally {
    FechaDB(DB);
  }
};

export async function PopulaDados() {
  const DB: SQLite.SQLiteDatabase = await ConectaDB();

  if (!DB) {
    alert('Banco de dados não conectado');
    //console.log('Banco de dados não conectado');
    return null;
  }

  try {
    /**
     * popula dados na tabela de compras
     */
    const Compra1 = await DB.runAsync(`
      INSERT INTO compras
        (descricao, limite)
      VALUES
        ("SUPEMERCADO DEMO", 200);
    `);

    /**
     * popula tabela de itens com modelo de exemplo
     */
    await DB.execAsync(`
      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra1.lastInsertRowId}, "CAIXA DE LEITE", 3, 3.48);

      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra1.lastInsertRowId}, "ESPAGUETE", 1, 7.28);

      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra1.lastInsertRowId}, "ARROZ DE 5 KG", 1, 22);

      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra1.lastInsertRowId}, "FEIJÃO DE 1 KG", 1, 12);

      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra1.lastInsertRowId}, "MEIO KG ALCATRA", 0.5, 52);

      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra1.lastInsertRowId}, "PATINHO MOIDO 800 g", 0.8, 49);
    `);
    
    /** MAIS UMA COMPRA MODELO */
    const Compra2 = await DB.runAsync(`
      INSERT INTO compras
        (descricao, limite)
      VALUES
        ("PADARIA DEMO", 150);
    `);

    await DB.execAsync(`
      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra2.lastInsertRowId}, "PÃO DE FORMA", 3, 12.55);

      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra2.lastInsertRowId}, "CAIXA DE LEITE", 3, 6.58);

      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra2.lastInsertRowId}, "PACOTE DE 4 PÃES FRANCESES", 1, 8.58);
    `);

    /** OUTRA COMPRA MODELO */
    const Compra3 = await DB.runAsync(`
      INSERT INTO compras
        (descricao, limite)
      VALUES
        ("FARMACIA DO BAIRRO", 80);
    `);

    await DB.execAsync(`
      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra3.lastInsertRowId}, "ANTIGRIPAL", 1, 10);

      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra3.lastInsertRowId}, "XAROPE ANTITUSSIGENO", 1, 50);

      INSERT INTO itens
        (compraid, nome, quantidade, preco)
      values
        (${Compra3.lastInsertRowId}, "CREME CONTRA ASSADURAS", 1, 20);
    `);
  } finally {
    FechaDB(DB);
    alert('Modelos populados');
  }
};

//export const Db = ConectaDB();

// Fecha o banco de dados
export function FechaDB(DB: SQLite.SQLiteDatabase) {
  //console.log('*** Fechando conexão');
  DB.closeAsync();
};

