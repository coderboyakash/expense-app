import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {OptionType} from './types';

type Props = {
  option: OptionType;
  isSelected: boolean;
  isFirst: boolean;
  handleSelect: (option: OptionType) => void;
};

const OptionItem = ({handleSelect, option, isSelected, isFirst}: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.itemContainer,
        backgroundColor: isSelected ? '#303134' : '#202124',
        borderTopLeftRadius: isFirst ? 10 : 0,
        borderTopRightRadius: isFirst ? 10 : 0,
      }}
      onPress={() => handleSelect(option)}>
      <Text
        style={{
          fontSize: 14,
          marginHorizontal: 20,
        }}>
        {option.label}
      </Text>
      {isSelected ? (
        <Entypo
          name="check"
          size={14}
          style={{
            marginRight: 20,
          }}
        />
      ) : (
        <Text></Text>
      )}
    </TouchableOpacity>
  );
};

export default OptionItem;

const styles = StyleSheet.create({
  itemContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 1,
  },
});
