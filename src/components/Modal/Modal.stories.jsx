import Modal from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    modalFunction: { action: 'closed' },
  },
};

export const Default = {
  args: {
    message: 'Este es un mensaje de ejemplo en el modal',
  },
};

export const WithChildren = {
  args: {
    message: 'Confirma tu accion',
    children: (
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="button">Confirmar</button>
        <button type="button">Cancelar</button>
      </div>
    ),
  },
};

export const WarningMessage = {
  args: {
    message: 'Estas seguro de que deseas eliminar este registro? Esta accion no se puede deshacer.',
  },
};

export const SuccessMessage = {
  args: {
    message: 'El libro ha sido registrado exitosamente.',
  },
};
