import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SelectedItem from './SelectedItem';
import {OptionType} from './types';
import OptionItem from './OptionItem';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlatList} from 'react-native';
import BottomDrawer, {
  BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';

type Props = {
  options?: OptionType[];
  placeholder?: string;
  selectMultiple?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
  onChange: (v: any[]) => void;
  initialState?: any;
};

const SelectMultiple = ({
  options,
  onChange,
  inputContainerStyle,
  containerStyle,
  placeholder,
  placeholderStyle,
  selectMultiple = true,
  initialState = [],
}: Props) => {
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
  const [selected, setSelected] = useState<OptionType[]>(initialState);
  const [single, setSingle] = useState('');
  const mergedContainerStyle = StyleSheet.compose(
    styles._containerStyle,
    containerStyle,
  );

  const mergedPlaceholderStyle = StyleSheet.compose(
    styles._placeholderStyle,
    placeholderStyle,
  );

  const mergedInputContainerStyle = StyleSheet.compose(
    inputContainerStyle,
    styles._inputContainerStyle,
  );

  const handleSelectOption = (option: OptionType) => {
    let index = selected?.findIndex(item => item.value === option.value);
    if (selectMultiple) {
      if (index === -1) {
        setSelected(prev => [...prev, option]);
      } else {
        setSelected(prev => prev.filter(item => item.value !== option.value));
      }
    } else {
      setSelected([option]);
    }
    if (!selectMultiple) {
      bottomDrawerRef?.current?.close();
    }
  };

  const handleRemoveItem = (value: string) => {
    setSelected(prev => prev.filter(item => item.value !== value));
  };

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <TouchableOpacity
      onPress={() => bottomDrawerRef?.current?.open()}
      style={mergedContainerStyle}>
      <View style={mergedInputContainerStyle}>
        {selected.length === 0 && (
          <Text style={mergedPlaceholderStyle}>
            {placeholder ? placeholder : 'Select an option'}
          </Text>
        )}
        {selectMultiple ? (
          <View
            style={{
              ...styles._selectedContinerStyle,
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: 250,
              flexWrap: 'wrap',
              margin: 2,
            }}>
            {selected.map(item => (
              <SelectedItem
                key={item.value}
                value={item.value}
                label={item.label}
                handleRemove={handleRemoveItem}
              />
            ))}
          </View>
        ) : (
          <Text style={{marginLeft: 10}}>{selected[0]?.label}</Text>
        )}
        <TouchableOpacity
          style={{
            position: 'absolute',
            height: '100%',
            borderColor: '#000',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            right: 0,
            width: 65,
          }}
          activeOpacity={1}
          onPress={() => bottomDrawerRef?.current?.open()}>
          <Entypo name="chevron-down" size={24} style={{color: '#fff'}} />
        </TouchableOpacity>
      </View>
      <BottomDrawer
        customStyles={{container: {backgroundColor: '#202124'}}}
        ref={bottomDrawerRef}>
        <View style={{backgroundColor: '#303134'}}>
          <FlatList
            data={options}
            renderItem={({item}) => (
              <OptionItem
                option={item}
                isFirst={false}
                isSelected={selected.map(i => i.value).includes(item.value)}
                handleSelect={(data: OptionType): void =>
                  handleSelectOption(data)
                }
              />
            )}
          />
        </View>
      </BottomDrawer>
    </TouchableOpacity>
  );
};

export default SelectMultiple;

const styles = StyleSheet.create({
  _containerStyle: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'gray',
  },
  _placeholderStyle: {
    fontSize: 14,
    color: '#fff',
    position: 'absolute',
    left: 15,
  },
  _inputContainerStyle: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    minHeight: 55,
    padding: 10,
  },
  _optionContinerStyle: {
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 5,
    borderRadius: 10,
    height: 200,
    overflow: 'scroll',
    backgroundColor: '#303134',
  },
  _selectedContinerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
});
