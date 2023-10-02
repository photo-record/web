import React from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

export default ({ onChange, selectValue = [] }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (event.nativeEvent.isComposing === false) {
          console.log(selectValue);
          onChange([...selectValue, createOption(inputValue)]);
          setInputValue('');
          event.preventDefault();
        }
    }
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => {
        onChange(newValue);
      }}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="함께한 분의 이름을 적어주세요"
      value={selectValue}
      styles={{
        control: (provided, state) => ({
          ...provided,
          height: 40,
          minHeight: 40,
          borderColor: '#202020',
          borderRadius: 4,
          '&:hover': { cursor: 'pointer' },
          boxShadow: 'none',
          backgroundColor: '#fff',
          color: '#202020',
        }),
        input: (provided, state) => ({
          ...provided,
          color: '#202020',
        }),
        multiValue: (provided, state) => ({
          ...provided,
          color: '#fff',
          backgroundColor: '#579883',
          '>div': {
            color: '#fff',
          },
        }),
        option: (provided, state) => ({
          ...provided,
          fontWeight: state.isSelected ? 'bold' : 'normal',
          backgroundColor: state.isSelected ? '#f6f6f6' : '#fff',
          color: '#212121',
          lineHeight: 'normal',
          '&:hover': { backgroundColor: '#eee' },
        }),
        menu: (provided) => ({
          ...provided,
          border: 'solid 1px #fff',
          borderRadius: 4,
        }),
      }}
    />
  );
};
