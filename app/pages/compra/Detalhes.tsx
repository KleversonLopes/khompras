/**
 * KCL - 02/11/2025
 * acrescentado check box para indicar que o item está no carrinho
 * criado campo done na base de dados de itens
 * 
 * O nome do item está em um botão para editar o item para modificação dos dados
 */
import Feather from '@expo/vector-icons/Feather';
import React, { useState } from "react";
import { FlatList, Keyboard, Pressable, Text, TextInput, useWindowDimensions } from "react-native";

import Col from "@/app/components/Col/col";
import Container from "@/app/components/Container/container";
import Row from "@/app/components/Row/row";


import { parseLocalFloat } from "@/app/libs/libs";
import styles from "@/app/styles/Styles";

import {
  atualizaItem,
  atualizaItemDone,
  excluiItem,
  incluiItem,
  leCompra,
  listaItens
} from "@/app/backend/compras";

import { Checkbox } from 'expo-checkbox';
import { Stack, useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Compra() {
  const { width } = useWindowDimensions();

  var { pCompraID, pCompraNome } = useLocalSearchParams<{ pCompraID?: string, pCompraNome?: string }>();
  
  const [Opacity, setOpacity] = useState<number>(1);
  const [Reload, setReload] = useState<boolean>(true);
  const [Acao, setAcao] = useState<'add' | 'edit'>('add');

  const inputNomeItem = React.useRef<TextInput>(null);
  const ListaItens = React.useRef<FlatList>(null);

  const [CompraId, setCompraId] = useState<number>(Number(pCompraID));
  const [CompraDescricao, setCompraDescricao] = useState<string>('');
  const [CompraLimite, setCompraLimite] = useState<number>(0);
  const [CompraGastos, setCompraGastos] = useState<number>(0);
  const [CompraSaldo, setCompraSaldo] = useState<number>(0);

  const [ItemId, setItemId] = useState<number>(0);
  const [ItemNome, setItemNome] = useState<string>('');
  const [ItemQuantidade, setItemQuantidade] = useState<number>(0);
  const [ItemPreco, setItemPreco] = useState<number>(0);
  const [ItemDone, setItemDone] = useState<number>(0);

  const [Dados, setDados] = useState<Array<{
    itemid: number; 
    nome: string;
    quantidade: number; 
    preco: number; 
    total: number; 
    done: number;
  }>>([]);


  React.useEffect(() => {
    async function getDadosCompra() {
      //console.log('CompraID : ', CompraId, '\npCompraID : ', pCompraID);
      if (CompraId === 0) {
        setOpacity(0.5);
      } else {
        const result = await leCompra(CompraId);
        if (result) {
          setCompraDescricao(result.descricao ?? '');
          setCompraLimite(result.limite ?? 0);
          setCompraGastos(result.gastos ?? 0);
          setCompraSaldo(result.saldo ?? 0);
        }
      }
    };

    async function getDadosItens() {
      setDados(await listaItens(Number(CompraId)));
    };

    getDadosCompra();

    getDadosItens();

  }, [Reload]);

  /*********************************************** */
  /** processos para trabalhar com itens de compra */
  /*********************************************** */
  const handleSaveItem = async() => {
    if (ItemNome === '' || ItemNome === null) {
      alert('Informe o nome do item');
      inputNomeItem.current?.focus();
      return;
    }

    if (Acao === 'add') {
      const Registro = {
        compraId: CompraId ?? 0,
        nome: ItemNome,
        preco: ItemPreco,
        quantidade: ItemQuantidade,
      };
      await incluiItem(Registro);
      ListaItens.current?.scrollToEnd();
    } else {
      const Registro = {
        itemId: ItemId,
        nome: ItemNome,
        preco: ItemPreco,
        quantidade: ItemQuantidade,
        done: ItemDone,
      };
      await atualizaItem(Registro);
      setAcao('add');
    };
    Keyboard.dismiss();
    setItemNome('');
    setItemQuantidade(0);
    setItemPreco(0);
    setItemDone(0);
    setReload(Reload == false);
  };

  const handleCheckItem = (itemId: number, itemDone: number) => {
    //console.log(`handleCheckItem - done : ${itemDone}`);
    atualizaItemDone( itemId, itemDone);
    setReload(Reload == false);
  };

  const handleEditItem = (item: { itemid: React.SetStateAction<number>; 
                                  nome: React.SetStateAction<string>; 
                                  quantidade: React.SetStateAction<number>; 
                                  preco: React.SetStateAction<number>; 
                                  done: React.SetStateAction<number>; 
                                }
) => {
    setAcao('edit');
    //console.log('Item : ', item)
    inputNomeItem.current?.focus();
    setItemId(item.itemid);
    setItemNome(item.nome);
    setItemQuantidade(item.quantidade);
    setItemPreco(item.preco);
    setItemDone(item.done);
  };


  const handleDeleteItem = async(itemId: number) => {
    await excluiItem(itemId);
    setReload(Reload == false);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack.Screen
        options={{
          title: CompraDescricao,
        }}
      />

      <Container  style={{ padding: 0, flex: 1 }}>
        <Container style={{ opacity: Opacity }}>
          {/** header da compra */}
          <Row style={{borderBottomColor: 'silver', borderBottomWidth: 1, paddingBottom: 15}}>
            <Col style={{ width: '32%', padding: 0}}>
              <Text style={[styles.text, { color: 'green' }]}>Limite</Text>
              <TextInput 
                style={[styles.input, { width: '100%', backgroundColor:'lightgreen'} ]} 
                placeholder="0,00" 
                editable={false}
                textAlign="right"
                value={CompraLimite ? CompraLimite.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : '0.00'}
              />
            </Col>

            <Col style={{ width: '32%', padding: 0}} >
              <Text style={[styles.text, { color: 'red' }]}>Gastos</Text>
              <TextInput 
                style={[styles.input, { width: '100%', backgroundColor:'pink' } ]} 
                placeholder="0,00" 
                editable={false}
                textAlign="right"
                value={CompraGastos ? CompraGastos.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : '0.00'}
              />
            </Col>

            <Col
              style={{ width: '32%', padding: 0}}
            >
              <Text style={[styles.text, { color: 'blue' }]}>Saldo</Text>
              <TextInput 
                style={[styles.input, { width: '100%', backgroundColor:'lightyellow' } ]} 
                placeholder="0,00" 
                editable={false}
                textAlign="right"
                value={CompraSaldo ? CompraSaldo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : '0.00'}
              />
            </Col>
          </Row>
          
          {/** adição de novos itens */}
          <Row>
            <Col style={{width: '100%', alignItems: 'left', borderRadius: 20, paddingTop: 0}}>
              <Text>{Acao === 'add' ? 'Novo Item' : 'Edita Item'} </Text>
              <TextInput 
                ref={inputNomeItem}
                style={[ styles.input, { width: '100%', textAlign: 'left' }]} 
                placeholder={'Digite o nome do item'}
                keyboardType="default"
                value={ItemNome ? ItemNome : ''}
                onChangeText={(text) => {setItemNome(text)}}
              />
              <Row style={{ justifyContent: 'space-between'}}>
                <Col style={{ width: '40%', padding: 0 }}>
                  <Text>Quantidade:</Text>
                  <TextInput 
                    style={[{ width: '100%', textAlign: 'right' }, styles.input]} 
                    placeholder='0,00'
                    keyboardType="decimal-pad"
                    defaultValue={ItemQuantidade ? ItemQuantidade.toLocaleString('pt-BR', {style: 'decimal'}) : ''}
                    onChangeText={(text) => setItemQuantidade(parseLocalFloat(text)) }
                  />
                </Col>

                <Col style={{ width: '40%', padding: 0 }}>
                  <Text>Preço:</Text>
                  <TextInput 
                    style={[{ width: '100%', textAlign: 'right' }, styles.input]} 
                    placeholder='0,00'
                    keyboardType="decimal-pad"
                    defaultValue={ItemPreco ? ItemPreco.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL'}) : ''}
                    onChangeText={(text) => setItemPreco(parseLocalFloat(text)) }
                  />
                </Col>
                {/* TODO
                <Col style={{ width: '33%', padding: 0 }}>
                  <Text>Categoria:</Text>
                  <Text>DropList</Text>
                </Col>
                */}
              </Row>

              <Pressable
                style={[styles.linkButton, {backgroundColor: 'black', padding: 0}]}
                onPress={() => {handleSaveItem();}}
              >
                <Row style={[{ justifyContent: 'center'}]}>
                  <Feather 
                    name={Acao === 'add' ? "plus-circle" : "check-circle" }
                    size={24} 
                    color="white" 
                  />
                  <Text style={[styles.text, { color: 'white' }]}>
                    {Acao === 'add' ? 'Adicionar Item' : 'Atualizar Item'}
                  </Text>
                </Row>
              </Pressable>
            </Col>
          </Row>

          {/** header da lista de Itens */}
          <Row style={{ backgroundColor: '#d1d5db', padding: 3}}>
            <Text style={{width: (width - 215), textAlign: 'center'}}>Item</Text>
            <Text style={{width:  45, textAlign: 'right'}}>Qtde</Text>
            <Text style={{width:  45, textAlign: 'right'}}>Preço</Text>
            <Text style={{width:  45}}>Total</Text>
          </Row>

          {/** Lista de Itens */}
          <Row style={{ flex: 1, alignItems: 'top', padding: 0}}>
            {Dados.length > 0 ?
              <FlatList
                ref={ListaItens}
                data={ Dados }
                renderItem={({ item }) => (
                  <Row 
                    style={{
                      //justifyContent: 'flex-start', 
                      //paddingHorizontal: 0, 
                      paddingVertical: 1, 
                      borderBottomWidth: 0.5, 
                      borderColor: 'silver'
                    }}
                  >
                    <Checkbox
                      style={{width: 16, height: 16}}
                      value={item.done === 1}
                      onValueChange={(value) => { handleCheckItem(item.itemid, value ? 1 : 0); }}
                    />

                    <Pressable
                      style={{
                        backgroundColor: 'black', 
                        paddingHorizontal: 5, paddingVertical: 5,
                        borderRadius: 6, //elevation: 5
                      }}
                      onPress={() => handleEditItem(item)}
                    >
                      <Text style={[styles.textSmall,{ width: (width - 215), color: 'white'}]}>{item.nome}</Text>
                    </Pressable>
                    <Text style={[styles.textSmall,{ width: 45, textAlign: 'right' }]}>{item.quantidade}</Text>
                    <Text style={[styles.textSmall,{ width: 45, textAlign: 'right' }]}>{item.preco.toFixed(2)}</Text>
                    <Text style={[styles.textSmall,{ width: 45, textAlign: 'right' }]}>{item.total.toFixed(2)}</Text>
                    <Feather 
                      style={{alignContent: 'flex-end'}}
                      name="minus-circle" 
                      size={18} 
                      color="red" 
                      onPress={() => handleDeleteItem(item.itemid)}
                    />
                  </Row>
                )}
                keyExtractor={item => item.itemid.toString()}
                style={{ flex: 1 }}
                //showsVerticalScrollIndicator={false}
              />
              : <Text style={styles.h1}>Não há itens nessa compra</Text>
            }
          </Row>
        </Container>

      </Container>

    </GestureHandlerRootView>
  );
};

