import Col from '@/app/components/Col/col';
import Row from '@/app/components/Row/row';
import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { Button, GestureResponderEvent, Keyboard, StyleSheet, Text, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function BottomSheetExample() {
  // ref
  const bottomSheetRefCompra = useRef<BottomSheet>(null);
  const bottomSheetRefItens = useRef<BottomSheet>(null);
  const inputNomeCompra = useRef<BottomSheetTextInput>('');

  // callbacks
  const handleSheetChangesCompra = useCallback((index: number) => {
    console.log('handleSheetChangesCompra', index);
  }, []);

  const handleSheetChangesItens = useCallback((index: number) => {
    console.log('handleSheetChangesItens', index);
  }, []);

  function handleOpenCompra(event: GestureResponderEvent): void {
    console.log('handleOpenCompra');
    bottomSheetRefCompra.current?.snapToIndex(1);
    const timer = setTimeout(() => {
        inputNomeCompra.current?.focus();
      }, 100);
    clearTimeout(timer);
  }

  function handleCloseCompra(event: GestureResponderEvent): void {
    bottomSheetRefCompra.current?.close();
  }

  function handleCloseItens(event: GestureResponderEvent): void {
    bottomSheetRefItens.current?.close();
  }

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <Button title='bottom sheet Compra'
        onPress={() => {
          handleOpenCompra();
        }}

      ></Button>

      <Button title='bottom sheet Itens'
        onPress={() => bottomSheetRefItens.current?.snapToIndex(1)}
      ></Button>

      <BottomSheet
        ref={bottomSheetRefCompra}
        index={-1}
        snapPoints={['35%']}
        keyboardBehavior="interactive"
        enablePanDownToClose={false}
        onChange={handleSheetChangesCompra}
        onClose={Keyboard.dismiss}
      >
        <BottomSheetView style={styles.contentContainer}
          onFocus={() => {inputNomeCompra?.current?.focus()}}
        >
          <Row style={{ justifyContent: 'flex-end' }}>
              <Feather 
                name="x-circle" 
                size={28} 
                color="red" 
                onPress={handleCloseCompra}
              />
          </Row>
          <Col>
            <Row style={{ justifyContent: 'flex-end' }}>
              <Col style={{ width: '100%' }}>
                <Text style={{ fontWeight: 'bold', width: '100%' }}>
                  Nome da Compra
                </Text>
                <BottomSheetTextInput 
                  ref={inputNomeCompra}
                  style={[ styles.input, { width: '100%', textAlign: 'left' }]} 
                  placeholder={'Ex.: Supermercado XYZ, Padaria XPTO...'}
                />

              </Col>
            </Row>
          </Col>
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetRefItens}
        index={-1}
        snapPoints={['50%', '70%']}
        onChange={handleSheetChangesItens}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Row style={{ justifyContent: 'flex-end' }}>
              <Feather 
                name="x-circle" 
                size={28} 
                color="red" 
                onPress={handleCloseItens}
              />
          </Row>
          <Col>
            <Row style={{ justifyContent: 'flex-end' }}>
              <Col style={{ width: '100%' }}>
                <Text style={{ fontWeight: 'bold', width: '100%' }}>
                  Nome do item da compra
                </Text>
                <TextInput 
                  style={[ styles.input, { width: '100%', textAlign: 'left' }]} 
                  placeholder={'Ex.: Supermercado XYZ, Padaria XPTO...'}
                />

              </Col>
            </Row>
          </Col>
        </BottomSheetView>
      </BottomSheet>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
});
