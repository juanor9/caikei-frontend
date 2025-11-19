import { render, screen, fireEvent } from '@testing-library/react';
import EditableField from '../../components/EditableField/EditableField';

describe('EditableField', () => {
  const defaultProps = {
    label: 'Test Label',
    name: 'testField',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render label correctly', () => {
    render(<EditableField {...defaultProps} />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render input with correct name', () => {
    render(<EditableField {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'testField');
  });

  it('should render input with default value', () => {
    render(<EditableField {...defaultProps} defaultValue="Default Text" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Default Text');
  });

  it('should render input as readonly by default', () => {
    render(<EditableField {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('should render input as editable when readOnly is false', () => {
    render(<EditableField {...defaultProps} readOnly={false} />);

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('readonly');
  });

  it('should call onChange when input value changes', () => {
    render(<EditableField {...defaultProps} readOnly={false} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should render edit button', () => {
    render(<EditableField {...defaultProps} />);

    const editButton = screen.getByRole('button', { name: /editar/i });
    expect(editButton).toBeInTheDocument();
  });

  it('should render correct input type', () => {
    render(<EditableField {...defaultProps} type="number" />);

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('should render disabled input when disabled prop is true', () => {
    render(<EditableField {...defaultProps} disabled={true} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
