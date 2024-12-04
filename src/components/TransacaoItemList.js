import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

const TransacaoItemList = ({ descricao, valor, data, hora, categoria, tipo, moeda }) => {
  const { width } = useWindowDimensions(); 
  const isLandscape = width > 600; 

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <Text style={[styles.descricao, isLandscape && styles.descricaoLandscape]}>{descricao}</Text>
      <Text style={[styles.valor, tipo === 'despesa' ? styles.valorDespesa : styles.valorReceita]}>
        {valor}
      </Text>
      <Text style={[styles.data, isLandscape && styles.dataLandscape]}>{data}</Text>
      
      {isLandscape && ( 
        <View style={styles.extraInfo}>
          <Text style={styles.extraText}>Hora: {hora}</Text>
          <Text style={styles.extraText}>Categoria: {categoria}</Text>
          <Text style={styles.extraText}>Tipo: {tipo}</Text>
          <Text style={styles.extraText}>Moeda: {moeda}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  containerLandscape: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    flexWrap: 'wrap', 
    padding: 10,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 2, 
  },
  descricaoLandscape: {
    flex: 3, 
  },
  valor: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  valorReceita: {
    color: 'green',
  },
  valorDespesa: {
    color: 'red',
  },
  data: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
    color: '#666',
  },
  dataLandscape: {
    flex: 1.2,
    marginEnd: 30,
  },
  extraInfo: {
    marginTop: 10,
    flexBasis: '20%', 
  },
  extraText: {
    fontSize: 14,
    color: '#444',
  },
});

export default TransacaoItemList;
