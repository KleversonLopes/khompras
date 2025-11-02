/**
 * KCL
 */
import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";

import Col from "@/app/components/Col/col";
import Row from "@/app/components/Row/row";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles/Styles";

import { CriaDB } from "@/app/backend/mercado";

const width = 220;

const Compra = () => {
  return (
    <Link 
      href={{ 
        pathname: "/pages/compra/Compra",
        params: { 
          pCompraID: '0', 
          pCompraNome: 'Nova Compra' 
        }
      }}
      style={[ styles.linkButton ]}
    >
      <Row style={{width: width, justifyContent:'flex-start'}}>
        <MaterialCommunityIcons 
          name="cart-plus"
          size={42}
          //color={'orange'}
          //backgroundColor={'black'}
        />
        <Col style={{width: 170}}>
          <Text style={[styles.h2, { textAlign: 'center' }]}> Compra </Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>Nova Compra</Text>
        </Col>
      </Row>
    </Link>

  );
};

const Historico = () => {
  return (
    <Link 
      href="/pages/historico/Historico"
      style={[ styles.linkButton ]}
    >
      <Row style={{width: width, justifyContent:'flex-start'}}>
        <AntDesign 
          name="history"
          size={42}
          //color={'white'}
        />
        <Col style={{width: 170}}>
          <Text style={styles.h2}>Histórico</Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>compras anteriores</Text>
        </Col>
      </Row>
    </Link>
  );
};

const Tools = () => {
  return (
    <Link 
      style={[ styles.linkButton]}
      href="/pages/tools/Tools" 
    >
      <Row style={{width: width, justifyContent:'flex-start'}}>
        <Feather 
          name="tool"
          size={42}
          //color={'white'}
        />
        <Col style={{width: 170}}>
          <Text style={styles.h2}>Ferramentas</Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>Ajustes do App</Text>
        </Col>
      </Row>
    </Link>
  );
};

const Sobre = () => {
  return (
    <Link 
      style={[ styles.linkButton]}
      href="/pages/sobre/Sobre" 
    >
      <Row style={{width: width, justifyContent:'flex-start'}}>
        <Feather 
          name="info"
          size={42}
          //color={'white'}
        />
        <Col style={{width: 170}}>
          <Text style={styles.h2}>
            Sobre
          </Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>Informações do App</Text>
        </Col>
      </Row>
    </Link>
  );
};

const Titulo = () => {
  return (
    <Col>
      <Text style={[ styles.h1 ]}>Controle de Compras</Text>
      <Text style={[ styles.h3 ]}>Gerencie suas compras de mercado</Text>
    </Col>
  );
};

export default function Home() {
  React.useEffect(() => {
    CriaDB();
  }, []);
  
  return (
    <>
      <Col style={{gap: 12}}>
        <Titulo />
        <Col style={{gap: 10}}>
          <Compra />
          <Historico />
          <Tools />
          <Sobre />
        </Col>
      </Col>
    </> 
  );
};
