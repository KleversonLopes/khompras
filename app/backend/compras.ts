import { SQLiteDatabase } from 'expo-sqlite';
import { ConectaDB, FechaDB } from './mercado';


export default function VOID(){};

export async function listaCompra(): Promise<Array<{ 
  compra: number; 
  descricao: string; 
  data_compra: string;
  limite: number; 
  gastos: number; 
  saldo: number; 
  itens: number;
}>> {
  //console.log('listaCompra called');
  
  const SELECT = `
    SELECT compra, descricao, data_compra, limite, gastos, saldo, 
    (SELECT COUNT(*) FROM itens WHERE compraid = compra) as itens
    FROM compras
    ORDER BY data_compra DESC;
  `;

  let results: Array<{
    compra: number; 
    descricao: string;
    data_compra: string;
    limite: number; 
    gastos: number; 
    saldo: number;
    itens: number;
  }> = [];

  const Db: SQLiteDatabase = await ConectaDB();

  //console.log('Database object:', Db);

  if (!Db) {
    alert('** Database sem conexão');
    //console.error('*** Database sem conexão');
  };

  //console.log('Executing query:', SELECT);
  
  const allRows = await Db.getAllAsync(SELECT); 

  FechaDB(Db);

  //console.log('allRows:', allRows);
  
  for (const row of allRows) {
    results.push(row as {
      compra: number;
      descricao: string;
      data_compra: string;
      limite: number;
      gastos: number;
      saldo: number;
      itens: number;
    });
  }

  return results;
};

export async function listaItens(compraId: number): Promise<Array<{
    itemid: number; 
    nome: string;
    quantidade: number; 
    preco: number; 
    total: number; 
    done: number;
}>> 
{
  const SELECT = `
    SELECT itemid, nome, quantidade, preco, total, done
    FROM itens
    WHERE compraid = ${compraId}
    ORDER BY rowid ASC;`;

  let Rows: Array<{
    itemid: number; 
    nome: string;
    quantidade: number; 
    preco: number; 
    total: number; 
    done: number;
  }> = [];

  const Db: SQLiteDatabase = await ConectaDB();

  //console.log('Database object:', Db);

  if (!Db) {
    alert('** Database sem conexão');
    //console.error('** Database sem conexão');
  };

  //console.log('Executing query:', SELECT);
  
  Rows = await Db.getAllAsync(SELECT); 

  FechaDB(Db);
/*
  for (const row of allRows) {
    results.push(row as {
      itemid: number;
      nome: string;
      quantidade: number;
      preco: number;
      total: number;
    });
  }
*/
  return Rows;
};

export async function leCompra(pCompraId: number): Promise<{
  compraId: number,
  descricao: string,
  limite: number,
  saldo: number,
  gastos: number,
} | null> {

  const Db: SQLiteDatabase = await ConectaDB();

  //console.log('Database object:', Db);

  if (!Db) {
    //console.error('** Database sem conexão');
    alert('** Database sem conexão');
    return null;
  };

  const Chave = pCompraId ? pCompraId : 0;

  const SELECT = (`
    SELECT compra, descricao, limite, gastos, saldo
    FROM compras
    WHERE compra = ${Chave}\n`
  );

  //console.log('Executing query:', SELECT);
  
  const result = await Db.getFirstAsync(SELECT) as {
    compraId: number; 
    descricao: string;
    limite: number;
    gastos: number;
    saldo: number;
  }; 

  FechaDB(Db);

  return result;
};

interface InsertCompra {
    descricao: string;
    limite: number;
    gastos: number;
};

export async function incluiCompra({descricao, limite, gastos}: InsertCompra): Promise<number> {
  const Db: SQLiteDatabase = await ConectaDB();

  const result = await Db.runAsync(`
    INSERT INTO compras
      (descricao, limite, gastos)
    values
      (?, ?, ?)`,
    [descricao, limite, gastos]
  );  

  FechaDB(Db);

  return result.lastInsertRowId;
}

interface UpdateCompra {
    compraId: number;
    descricao: string;
    limite: number;
};

export async function atualizaCompra({compraId, descricao, limite}: UpdateCompra): Promise<number> {
  const Db: SQLiteDatabase = await ConectaDB();

  const result = await Db.runAsync(`
    UPDATE compras SET
      descricao = ?,
      limite = ?
    WHERE compra = ?`,
    [descricao, limite, compraId]
  );  

  FechaDB(Db);

  return result.lastInsertRowId;
}

export async function excluiCompra(pCompraId: number) {
  const Db: SQLiteDatabase = await ConectaDB();
  
  await Db.runAsync(`
    DELETE FROM compras
    WHERE compra = ?
  `, pCompraId);

  FechaDB(Db);
};

interface InsertItem {
    compraId: number;
    nome: string;
    preco: number;
    quantidade: number;
};

export async function incluiItem({compraId, nome, preco, quantidade,}: InsertItem): Promise<void> {
  const Db: SQLiteDatabase = await ConectaDB();

  //console.log('*** ', compraId, nome, preco, quantidade);

  await Db.runAsync(`
    INSERT INTO itens
      (compraid, nome, quantidade, preco)
    values
      (?, ?, ?, ?)`,
    [compraId, nome, quantidade, preco]
  );  

  FechaDB(Db);
};

interface UpdateItem {
    itemId: number;
    nome: string;
    preco: number;
    quantidade: number;
    done: number;
};

export async function atualizaItem({itemId, nome, preco, quantidade, done}: UpdateItem): Promise<void> {
  const Db: SQLiteDatabase = await ConectaDB();

  //console.log('*** ', itemId, nome, preco, quantidade);

  await Db.runAsync(`
    UPDATE itens SET 
      nome = ?, preco = ?, quantidade = ?, done = ?
    WHERE itemid = ?`,
    [nome, preco, quantidade, done, itemId]
  );  

  FechaDB(Db);
};

export async function atualizaItemDone(itemId: number, done: number): Promise<void> {
  const Db: SQLiteDatabase = await ConectaDB();

  //console.log('*** ', itemId, done);

  await Db.runAsync(`
    UPDATE itens SET 
      done = ?
    WHERE itemid = ?`,
    [done, itemId]
  );  

  FechaDB(Db);
};


export async function excluiItem(itemId: number) {
  const Db: SQLiteDatabase = await ConectaDB();

  //console.log('*** itemId : ', itemId);

  try {
    await Db.runAsync(`
      DELETE FROM itens
      WHERE itemid = ?
    `, itemId);
  } catch (error) {
    alert(`Erro ao excluir item: ${error}`);
    //console.error(error);
  }

  FechaDB(Db);
};

/*
export async function leItem(compraId: Number): Promise<{}> {
  
};
*/