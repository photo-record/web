import React from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

export default () => {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState([]);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (event.nativeEvent.isComposing === false) {
          setValue((prev) => [...prev, createOption(inputValue)]);
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
        setValue(newValue);
      }}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="함께한 분의 이름을 적어주세요"
      value={value}
      styles={{
        control: (provided, state) => ({
          ...provided,
          height: 40,
          minHeight: 40,
          borderColor: '#fff',
          borderRadius: 4,
          '&:hover': { cursor: 'pointer' },
          boxShadow: 'none',
          backgroundColor: '#202020',
          color: '#fff',
        }),
        input: (provided, state) => ({
          ...provided,
          color: '#fff',
        }),
        multiValue: (provided, state) => ({
          ...provided,
          color: '#212121',
          backgroundColor: '#fff',
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
          border: 'solid 1px #212121',
          borderRadius: 4,
        }),
      }}
    />
  );
};
