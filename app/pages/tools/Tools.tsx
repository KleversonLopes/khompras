import React from "react";
import { Pressable, Text } from "react-native";

import { ApagaDB, CriaDB, PopulaDados } from "@/app/backend/mercado";
import Col from "@/app/components/Col/col";
import Row from "@/app/components/Row/row";
import styles from "@/app/styles/Styles";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

const width = '67%';

const IniciaBanco = () => {
  const RecriaDB = async() => {
    try {
      await ApagaDB();
      await CriaDB();
      alert(`Banco de dados inicializado com sucesso.`);
    } catch (error) {
      alert(`Erro ao criar banco de dados: ${error}`);
    };
  } 
  return (
    <Pressable 
      style={[ styles.linkButton]}
      onPress={RecriaDB}
    >
      <Row style={{width: width}}>
        <Feather 
          name="database"
          size={46}
          //color={'white'}
        />
        <Col>
          <Text style={styles.title}>
            Inicializa dados
          </Text>
          <Text style={styles.text}>
            Cria banco de dados vazio
          </Text>
        </Col>
      </Row>
    </Pressable>
  );
};

const PopulaBanco = () => {
  return (
    <Pressable 
      style={[ styles.linkButton]}
      onPress={PopulaDados}
    >
      <Row style={{width: width}}>
        <Feather 
          name="list"
          size={46}
        />
        <Col>
          <Text style={styles.title}>
            Gera Modelo
          </Text>
          <Text style={styles.text}>
            Preenche dados de modelo
          </Text>
        </Col>
      </Row>
    </Pressable>
  );
};

const Header = () => {
  return (
    <Text style={[styles.h1]}>Dados</Text>
  );
};

const BottomSheetExample = () => {
  return (
    <Link
      href="/pages/bottomSheet/bottomSheet"
      style={[ styles.linkButton]}
    >
      <Row style={{width: width}}>
        <Feather 
          name="tag"
          size={46}
        />
        <Col>
          <Text style={styles.title}>
            Bottom Sheet
          </Text>
          <Text style={styles.text}>
            Examplo de Bottom Sheet
          </Text>
        </Col>
      </Row>

    </Link>
  )
}

const Sobre = () => {
  return (
    <Col style={{ justifyContent: 'space-evenly', height: '40%'}}>
      <Header />
      <IniciaBanco />
      <PopulaBanco />
      {/* <BottomSheetExample /> */}
    </Col>
  );
};

export default Sobre;
