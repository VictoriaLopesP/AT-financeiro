import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const TransacaoListScreen = ({ navigation }) => {
  const [transacoes, setTransacoes] = useState([]);
  const { width, height } = useWindowDimensions();

  const adicionarTransacao = (novaTransacao) => {
    setTransacoes((prevTransacoes) => [...prevTransacoes, novaTransacao]);
  };

  const editarTransacao = (transacaoEditada) => {
    setTransacoes((prevTransacoes) =>
      prevTransacoes.map((transacao) =>
        transacao.id === transacaoEditada.id ? transacaoEditada : transacao
      )
    );
  };

  const excluirTransacao = (id) => {
    Alert.alert('Confirmar Exclusão', 'Tem certeza que deseja excluir esta transação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setTransacoes((prevTransacoes) =>
            prevTransacoes.filter((transacao) => transacao.id !== id)
          );
        },
      },
    ]);
  };

  const renderBotaoEsquerda = (id) => (
    <TouchableOpacity
      style={styles.botaoEsquerda}
      onPress={() => excluirTransacao(id)}
    >
      <Text style={styles.textoBotao}>Excluir</Text>
    </TouchableOpacity>
  );

  const renderBotaoDireita = (transacao) => (
    <TouchableOpacity
      style={styles.botaoDireita}
      onPress={() =>
        navigation.navigate('FormularioTransacao', {
          transacao,
          editarTransacao,
        })
      }
    >
      <Text style={styles.textoBotao}>Editar</Text>
    </TouchableOpacity>
  );

  const isLandscape = width > height;

  return (
    <View style={styles.container}>
      {transacoes.length === 0 && (
        <Text style={styles.mensagemVazia}>Nenhuma transação registrada</Text>
      )}
      <FlatList
        data={transacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderLeftActions={() => renderBotaoEsquerda(item.id)}
            renderRightActions={() => renderBotaoDireita(item)}
          >
            <View style={styles.transacaoItem}>
              <Text>Descrição: {item.descricao}</Text>
              <Text>Valor: {item.valor} BRL</Text>
              <Text>Data: {item.data}</Text>

              {isLandscape && (
                <>
                  <Text>Hora: {item.hora}</Text>
                  <Text>Categoria: {item.categoria}</Text>
                  <Text>Tipo: {item.tipo}</Text>
                  <Text>Moeda Original: {item.moedaOriginal}</Text>
                </>
              )}
            </View>
          </Swipeable>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('FormularioTransacao', { adicionarTransacao })}
      >
        <Ionicons name="add" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  transacaoItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  botaoEsquerda: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  botaoDireita: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  textoBotao: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mensagemVazia: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TransacaoListScreen;
