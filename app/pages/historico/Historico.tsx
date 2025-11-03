/**
 * KCL - 03/11/2025
 * Quando não há dados no histórico de copras ou lista de itens 
 * o app passou a mostra uma mensagem para o usuário
 */
import { listaCompras } from "@/app/backend/compras";
import Col from "@/app/components/Col/col";
import Container from "@/app/components/Container/container";
import Row from "@/app/components/Row/row";
import styles from "@/app/styles/Styles";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from 'date-fns';
import { Link, useFocusEffect } from "expo-router";
import React from "react";
import { FlatList, Text } from "react-native";

export default function Historico() {
  const [HistoricoCompras, setHistoricoCompras] = React.useState<Array<{ 
    compra: number; 
    descricao: string; 
    data_compra: string; 
    limite: number; 
    gastos: number; 
    saldo: number; 
    itens: number;
  }>>([]);
    
  const [isLoading, setIsLoading] = React.useState(false);
  const [TotalCompras, setTotalCompras] = React.useState(0);
  const [TotalValor, setTotalValor] = React.useState(0);

  async function CarregaHistorico() {
    setIsLoading(true);
    try {
      const Rows = await listaCompras();
      setHistoricoCompras(Rows);
      let Conta = 0;
      let Soma = 0;
      for (const Row of Rows) {
        ++Conta;
        Soma = (Soma + Row.gastos);
      }
      setTotalCompras(Conta);
      setTotalValor(Soma);
    } catch (error) {
      alert(`Erro ao carregar dados: ${error}`);
      //console.error("Erro ao carregar dados:", e);
    } finally {
      setIsLoading(false);
    };
  };
    
  useFocusEffect(
    React.useCallback(() => {
      CarregaHistorico();
    }, [])
  );

  return (
    <Container>
      {/*<Col style={{backgroundColor: '#f1eca4ff', width: '100%', padding: 10}}>*/}
      <Col style={{backgroundColor: 'orange', width: '100%', padding: 10, borderRadius: 20}}>
        <Row style={{justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
          <Text style={styles.h2}>Total de compras</Text>
          <Text style={styles.h2}>Valor Total</Text>
        </Row>
        <Row style={{justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
          <Text style={styles.h2}>{TotalCompras}</Text>
          <Text style={styles.h2}>{TotalValor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
        </Row>
      </Col>

      <Row>
        <Link
          style={[styles.linkButton, { backgroundColor: 'black', padding: 0, width: '100%' }]}
          href={{ 
            pathname: "/pages/compra/Compra",
            params: { 
              pCompraID: '0', 
              pCompraNome: 'Nova Compra' 
            }
          }}
        >
          <Row
            style={[{ justifyContent: 'center'}]}
          >
            <MaterialCommunityIcons 
              name="cart-plus" 
              size={24} 
              color="white" 
            />
            <Text style={[styles.text, { color: 'white' }]}>Nova Compra</Text>
          </Row>
        </Link>
      </Row>

      { HistoricoCompras.length > 0 ?
        <FlatList
          data={HistoricoCompras}
          renderItem={({ item }) => (
            <Link 
              style={{
                padding: 6
              }}
              href={{
                pathname: "../compra/Compra",
                params: { 
                  pCompraID: item.compra, 
                  pCompraNome: item.descricao 
                },
              }}
            >
              <Col 
                style={{ 
                  borderWidth: 0.3, 
                  width: '100%', 
                  borderRadius: 10, 
                  alignItems: 'left',
                  padding: 5
                }}
              >
                <Row style={{ justifyContent: 'space-between'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.descricao}
                  </Text>
                  <Text 
                    style={{
                      padding: 6, 
                      backgroundColor: 'silver',
                      borderRadius: 10
                    }}
                  >
                    {item.itens + ' itens'}
                  </Text>
                </Row>

                <Row style={{justifyContent: 'flex-start'}}>
                  <Feather
                    name="calendar"
                    size={14}
                    color={'gray'}
                  />
                  <Text>{format(new Date(item.data_compra), `dd, MMMM yyyy`)}</Text>
                </Row>

                <Row 
                  style={{ 
                    justifyContent: 'space-between', 
                    borderTopWidth: 0.3
                  }}
                >
                  <Text style={{ textAlign: 'right', }}>Gastos</Text>
                  <Text style={{ textAlign: 'right', }}>
                    {item.gastos.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                  </Text>
                </Row>
              </Col>
            </Link>
          )}
          keyExtractor={item => item.compra.toString()}
        />
        : <Text style={styles.h1}>Não há Histórico de Compras</Text>
      }

    </Container>
  );
};
