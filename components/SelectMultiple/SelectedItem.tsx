import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  label: string;
  value: string;
  handleRemove: (option: string) => void;
};

const SelectedItem = ({label, value, handleRemove}: Props) => {
  return (
    <View style={styles._selectedItemContainer}>
      <Text style={{fontSize: 14, color: '#fff'}}>{label}</Text>
      <TouchableOpacity
        style={styles._iconContainerStyles}
        onPress={() => {
          handleRemove(value);
        }}>
        <Entypo name="cross" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  _selectedItemContainer: {
    backgroundColor: '#9e8b72',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 2,
  },
  _iconContainerStyles: {
    width: 14,
    height: 14,
    borderRadius: 50,
    marginLeft: 4,
  },
});

export default SelectedItem;
