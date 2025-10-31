import React, { useRef, useState } from "react";
import { Pressable, Text, TextInput } from "react-native";

import Col from "@/app/components/Col/col";
import Container from "@/app/components/Container/container";
import Styles from "@/app/styles/Styles";

import { router, Stack, useLocalSearchParams } from 'expo-router';

import {
    atualizaCompra,
    excluiCompra,
    incluiCompra,
    leCompra
} from "@/app/backend/compras";

import Row from "@/app/components/Row/row";
import { parseLocalFloat } from "@/app/libs/libs";
import { Feather } from "@expo/vector-icons";

export default function Compra() {
    const { pCompraID } = useLocalSearchParams<{ pCompraID?: string }>();

    const [CompraId, setCompraId] = useState<number>(Number(pCompraID));
    
    const inputNomeCompra = useRef<TextInput>(null);
    
    const [CompraDescricao, setCompraDescricao] = useState<string>('');
    const [CompraLimite, setCompraLimite] = useState<number>(0);
    const [CompraGastos, setCompraGastos] = useState<number>(0);
    const [CompraSaldo, setCompraSaldo] = useState<number>(0);

    React.useEffect(() => {
        async function getDadosCompra() {
            if (CompraId === 0) {
                inputNomeCompra.current?.focus();
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

        getDadosCompra();

    }, []);

    const handleSaveCompra = async() => {
        let currentCompraId = CompraId;
        if (CompraId == 0) { /** grava informações da nova compra no banco de dados */
            const Registro = {
                descricao: CompraDescricao,
                limite: CompraLimite,
                gastos: CompraGastos,
            };
            currentCompraId = await incluiCompra(Registro);
            setCompraId(currentCompraId);
        } else {
            const Registro = {
                compraId: CompraId,
                descricao: CompraDescricao,
                limite: CompraLimite,
            };
            await atualizaCompra(Registro);
        };

        alert('Compra salva com sucesso!')
    };

    const handleOpenItens = () => {
        router.replace({
            pathname: "/pages/compra/Detalhes",
            params: { pCompraID: CompraId, pCompraNome: CompraDescricao }
        });
    };

    const handleExcluiCompra = async() => {
        await excluiCompra(CompraId);
        alert('Compra excluída com sucesso!')
        router.replace({
            pathname: "/pages/home/Home"
        });
    };


    return (
        <>
            <Stack.Screen
                options={{
                    title: (CompraId > 0) ? CompraDescricao : 'Nova Compra',
                }}
            />

            <Container style={{padding: 10}}>
                <Col
                    style={{ 
                        alignItems: 'left', 
                        width: '100%', 
                        borderWidth: 1, 
                        borderColor: 'silver',
                        borderRadius: 15,
                    }}
                >
                    <Text style={Styles.text}>Nome da Loja</Text>
                    <TextInput
                        ref={inputNomeCompra}
                        style={[ Styles.input, { width: '100%', textAlign: 'left' }]} 
                        placeholder={'Ex.: Supermercado XYZ'}
                        defaultValue={CompraDescricao ?? ''}
                        onChangeText={(text) => setCompraDescricao(text)}
                    />

                    <Text  style={Styles.text}>Limite de Gastos</Text>
                    <TextInput
                        style={[{ width: 120, textAlign: 'right' }, Styles.input]} 
                        placeholder='0,00'
                        keyboardType="numeric"
                        defaultValue={CompraLimite ? CompraLimite.toLocaleString('pt-BR', {style: 'decimal', currency: 'BRL'}) : ''}
                        onChangeText={(text) => setCompraLimite(parseLocalFloat(text))}
                    />

                    <Row 
                        style={{justifyContent: 'space-evenly'}}
                    >
                        <Pressable 
                            style={[Styles.linkButton, {alignItems: 'center'}]} 
                            onPress={handleSaveCompra}
                        >
                            <Feather 
                                name="bookmark" 
                                size={32} 
                                color="green" 
                            />
                            <Text>Salvar</Text>
                        </Pressable>

                        { CompraId > 0 ?
                        <Pressable 
                            style={[Styles.linkButton, {alignItems: 'center'}]} 
                            onPress={handleExcluiCompra}
                        >
                            <Feather 
                                name="trash-2" 
                                size={32} 
                                color="red" 
                            />
                            <Text>Excluir</Text>
                        </Pressable>
                        :null
                        }

                        { CompraId > 0 ?
                        <Pressable 
                            style={[Styles.linkButton, {alignItems: 'center'}]} 
                            onPress={handleOpenItens}
                        >
                            <Feather 
                                name="list" 
                                size={32} 
                                color="green" 
                            />
                            <Text>Itens</Text>
                        </Pressable>
                        :null
                        }

                    </Row>

                </Col>
            </Container>
        </>
    );
};