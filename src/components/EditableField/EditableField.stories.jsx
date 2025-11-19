import EditableField from './EditableField';

export default {
  title: 'Components/EditableField',
  component: EditableField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'date', 'email', 'color'],
    },
    onChange: { action: 'changed' },
  },
};

export const Default = {
  args: {
    label: 'Campo de texto',
    name: 'field1',
    type: 'text',
    defaultValue: 'Valor por defecto',
    readOnly: true,
  },
};

export const NumberField = {
  args: {
    label: 'Precio',
    name: 'price',
    type: 'number',
    defaultValue: 25000,
    readOnly: true,
  },
};

export const DateField = {
  args: {
    label: 'Fecha de publicacion',
    name: 'pubDate',
    type: 'date',
    value: '2024-01-15',
    readOnly: true,
  },
};

export const Editable = {
  args: {
    label: 'Campo editable',
    name: 'editable',
    type: 'text',
    defaultValue: 'Puedes editar este campo',
    readOnly: false,
  },
};

export const ColorField = {
  args: {
    label: 'Color del libro',
    name: 'color',
    type: 'color',
    defaultValue: '#3498db',
    disabled: false,
  },
};
