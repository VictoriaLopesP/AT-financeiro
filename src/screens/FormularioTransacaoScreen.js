import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const FormularioTransacaoScreen = ({ navigation, route }) => {
  const { adicionarTransacao, editarTransacao, transacao } = route.params || {};

  const [descricao, setDescricao] = useState(transacao?.descricao || '');
  const [valor, setValor] = useState(transacao?.valor || '');
  const [moeda, setMoeda] = useState(transacao?.moedaOriginal || 'BRL');
  const [tipo, setTipo] = useState(transacao?.tipo || '');
  const [categoria, setCategoria] = useState(transacao?.categoria || '');
  const [data, setData] = useState(new Date(transacao?.data || Date.now()));
  const [hora, setHora] = useState(new Date(transacao?.hora || Date.now()));
  const [mostrarDataPicker, setMostrarDataPicker] = useState(false);
  const [mostrarHoraPicker, setMostrarHoraPicker] = useState(false);

  const cotacoes = {
    BRL: 1,
    CAD: 3.85,
    CHF: 5.25,
    USD: 5.10,
    EUR: 5.40,
  };

  const moedas = [
    { label: 'BRL - Real', value: 'BRL' },
    { label: 'CAD - Dólar Canadense', value: 'CAD' },
    { label: 'CHF - Franco Suíço', value: 'CHF' },
    { label: 'USD - Dólar dos EUA', value: 'USD' },
    { label: 'EUR - Euro', value: 'EUR' },
  ];

  const categorias = [
    { label: 'Alimentação', value: 'alimentacao' },
    { label: 'Saúde', value: 'saude' },
    { label: 'Educação', value: 'educacao' },
    { label: 'Lazer', value: 'lazer' },
  ];

  const handleSave = () => {
    if (!descricao || !valor || !moeda || !categoria || !tipo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico)) {
      alert('Por favor, insira um valor válido!');
      return;
    }

    const valorConvertido = valorNumerico * cotacoes[moeda];
    const transacaoEditada = {
      id: transacao?.id || Math.random().toString(),
      descricao,
      valor: valorConvertido.toFixed(2),
      data: data.toLocaleDateString(),
      hora: hora.toLocaleTimeString(),
      categoria,
      tipo,
      moedaOriginal: moeda,
    };

    if (transacao) {
      editarTransacao(transacaoEditada);
    } else {
      adicionarTransacao(transacaoEditada);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {transacao ? 'Editar Transação' : 'Nova Transação'}
      </Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Compra de mercado"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 150.00"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.label}>Moeda</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={moeda}
          onValueChange={(itemValue) => setMoeda(itemValue)}
          style={styles.picker}
        >
          {moedas.map((moedaItem) => (
            <Picker.Item key={moedaItem.value} label={moedaItem.label} value={moedaItem.value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
          style={styles.picker}
        >
          {categorias.map((categoriaItem) => (
            <Picker.Item key={categoriaItem.value} label={categoriaItem.label} value={categoriaItem.value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Despesa" value="despesa" />
          <Picker.Item label="Receita" value="receita" />
        </Picker>
      </View>

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity style={styles.input} onPress={() => setMostrarDataPicker(true)}>
        <Text>{data.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {mostrarDataPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setMostrarDataPicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Hora</Text>
      <TouchableOpacity style={styles.input} onPress={() => setMostrarHoraPicker(true)}>
        <Text>{hora.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {mostrarHoraPicker && (
        <DateTimePicker
          value={hora}
          mode="time"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedTime) => {
            setMostrarHoraPicker(false);
            if (selectedTime) setHora(selectedTime);
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Transação</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 45,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormularioTransacaoScreen;
