import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaAutenticacao from './src/screens/TelaAutenticacao';
import TransacaoListScreen from './src/screens/TransacaoListScreen';
import FormularioTransacaoScreen from './src/screens/FormularioTransacaoScreen';

const Stack = createStackNavigator();

const App = () => {
  const [transacoes, setTransacoes] = useState([]);

  const adicionarTransacao = (novaTransacao) => {
    setTransacoes((prevTransacoes) => [...prevTransacoes, novaTransacao]);
  };

  const excluirTransacao = (id) => {
    setTransacoes((prevTransacoes) =>
      prevTransacoes.filter((transacao) => transacao.id !== id)
    );
  };

  const editarTransacao = (transacaoEditada) => {
    setTransacoes((prevTransacoes) =>
      prevTransacoes.map((transacao) =>
        transacao.id === transacaoEditada.id ? transacaoEditada : transacao
      )
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaAutenticacao">
        <Stack.Screen name="TelaAutenticacao" component={TelaAutenticacao} />
        <Stack.Screen
          name="TransacaoList"
          component={(props) => (
            <TransacaoListScreen
              {...props}
              transacoes={transacoes}
              excluirTransacao={excluirTransacao}
              editarTransacao={editarTransacao}
            />
          )}
        />
        <Stack.Screen
          name="FormularioTransacao"
          component={(props) => (
            <FormularioTransacaoScreen
              {...props}
              adicionarTransacao={adicionarTransacao}
              editarTransacao={editarTransacao}
            />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
