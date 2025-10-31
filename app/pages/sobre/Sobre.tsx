import Col from "@/app/components/Col/col";
import Container from "@/app/components/Container/container";
import Row from "@/app/components/Row/row";
import Styles from "@/app/styles/Styles";
import { Feather } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from "expo-router";
import React from "react";
import { Image, Linking, Text } from "react-native";

const AUTHOR=process.env.EXPO_PUBLIC_AUTHOR;
const VERSAO=process.env.EXPO_PUBLIC_VERSAO;
const INSTAGRAM=process.env.EXPO_PUBLIC_INSTAGRAM;
const LINKEDIN=process.env.EXPO_PUBLIC_LINKEDIN;
const EMAIL=process.env.EXPO_PUBLIC_EMAIL;
const TELEGRAM=process.env.EXPO_PUBLIC_TELEGRAM;

import logo from "@/assets/images/android-icon-foreground.png";

const Titulo = () => {
  return (<Col>
    <Image 
      source={logo}
      resizeMode={'stretch'}
      style={{width: 70, height: 70}}
    />
    <Text style={[Styles.h2, { textAlign: 'center', }]}>khompras</Text>
    {Linha(`Versão: ${VERSAO}`)}
    <Row style={{padding: 6, borderWidth: 0.5, boderColor: 'silver', borderRadius: 20}}>
      <Col>
        <Text style={[Styles.h2, {textAlign: 'left', width: '100%', paddingBottom: 10,}]}>Sobre o App</Text>
        <Text style={{textAlign: 'justify', fontSize:12}}>
          Aplicativo para gerenciar e controlar suas compras de mercado. 
          Registre suas compras, acompanhe gastos e mantenha um histórico 
          completo de todas as suas idas ao supermercado.
        </Text>
      </Col>
    </Row>
  </Col>);
};

const Instagram = ()=> {
  return (
    <Link 
      href={INSTAGRAM}
    >
      <Feather 
        name='instagram'
        size={26}
        color={'red'}
      />
    </Link>
  )
};

const LinkedIn = () => {
  return (
    <Link 
      href={LINKEDIN}
    >
      <Feather 
        name='linkedin'
        size={26}
        color={'blue'}
      />
    </Link>
  )
};

const Telegram = () => {
  const linkTelegram = `tg://resolve?domain=${TELEGRAM}`;
  async function ChatTelegram() {
    try {
      const podeAbrir = await Linking.canOpenURL(linkTelegram);

      if (podeAbrir) {
        await Linking.openURL(linkTelegram);
      } else {
        // Se o usuário não tiver o Telegram instalado, oferecer a URL web:
        const linkWeb = `https://t.me/${TELEGRAM}`;
        await Linking.openURL(linkWeb); 
        //alert('Nenhum aplicativo de e-mail configurado no dispositivo.');
      }
    } catch (error) {
      //console.error('Falha ao abrir o link de telegram:', error);
      alert('Não foi possível iniciar o envio de telegram.');
    }    
  };

  return (
    <FontAwesome5 
      name='telegram-plane'
      size={26}
      color={'blue'}
      onPress={ChatTelegram}
    />
  )
};

const Email = () => {
  const assunto = 'Aplicativo khompras';
  const corpo = 'Olá, gostaria de entrar em contato.';  
  const linkMailto = `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  async function EnviarEmail() {
  try {
      // 2. Verifica se o aplicativo de e-mail pode ser aberto
      const podeAbrir = await Linking.canOpenURL(linkMailto);

      if (podeAbrir) {
        // 3. Abre o aplicativo de e-mail
        await Linking.openURL(linkMailto);
      } else {
        // Caso não haja um aplicativo de e-mail configurado
        alert('Nenhum aplicativo de e-mail configurado no dispositivo.');
      }
    } catch (error) {
      //console.error('Falha ao abrir o link de email:', error);
      alert('Não foi possível iniciar o envio de e-mail.');
    }    
  };

  return (
    <Feather 
      name='mail'
      size={26}
      color={'gray'}
      onPress={EnviarEmail}
    />
  )
};

const RedesSociais = () => {
  return (
    <Row style={{justifyContent: 'center', gap: 20}}>
      <Instagram/>
      <LinkedIn/>
      <Email/>
      <Telegram/>
    </Row>
  )
}

const Linha = (texto: string) => {
  return (
    <Text style={Styles.text}>{texto}</Text>
  )
}

const Sobre = () => {
//    <Col style={[{justifyContent: 'space-evenly', gap: 10 }]}>
  return (
    <Container style={{gap: 5}}>
      <Titulo/>
      <Col style={{gap: 5}}>
        {Linha(`Desenvolvedor: ${AUTHOR}`)}
        {Linha(`Linguagem: JavaScript`)}
        {Linha(`Framework: React Native - Expo`)}
        {Linha(`Banco de dados: SQLite 3.0`)}
        {Linha(`Outubro, 2025`)}
        {Linha(`Todos os direitos reservados`)}
      </Col>
      <RedesSociais/>
    </Container>
  );
};

export default Sobre;
