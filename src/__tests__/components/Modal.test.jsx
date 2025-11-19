import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../components/Modal/Modal';

describe('Modal', () => {
  const mockModalFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render message correctly', () => {
    render(
      <Modal modalFunction={mockModalFunction} message="Test message" />
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    render(
      <Modal modalFunction={mockModalFunction}>
        <button>Child Button</button>
      </Modal>
    );

    expect(screen.getByText('Child Button')).toBeInTheDocument();
  });

  it('should call modalFunction with false when close button is clicked', () => {
    render(
      <Modal modalFunction={mockModalFunction} message="Test" />
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockModalFunction).toHaveBeenCalledWith(false);
  });

  it('should render without message', () => {
    render(<Modal modalFunction={mockModalFunction} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render modal container', () => {
    const { container } = render(
      <Modal modalFunction={mockModalFunction} message="Test" />
    );

    expect(container.querySelector('.modal-container')).toBeInTheDocument();
  });
});
