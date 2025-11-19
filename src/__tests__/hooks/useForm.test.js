import { renderHook, act } from '@testing-library/react';
import useForm from '../../hooks/useForm';

describe('useForm', () => {
  it('should initialize with provided values', () => {
    const initialValues = { name: 'Test', email: 'test@test.com' };
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.form).toEqual(initialValues);
  });

  it('should initialize with empty object', () => {
    const { result } = renderHook(() => useForm({}));

    expect(result.current.form).toEqual({});
  });

  it('should handle text input change', () => {
    const { result } = renderHook(() => useForm({}));

    act(() => {
      result.current.handleChange({
        target: {
          name: 'title',
          value: 'New Book',
          type: 'text',
        },
      });
    });

    expect(result.current.form.title).toBe('New Book');
  });

  it('should handle number input change', () => {
    const { result } = renderHook(() => useForm({}));

    act(() => {
      result.current.handleChange({
        target: {
          name: 'price',
          value: '25000',
          type: 'number',
        },
      });
    });

    expect(result.current.form.price).toBe('25000');
  });

  it('should handle radio input change', () => {
    const { result } = renderHook(() => useForm({}));

    act(() => {
      result.current.handleChange({
        target: {
          name: 'type',
          value: 'ingreso',
          type: 'radio',
        },
      });
    });

    expect(result.current.form.type).toBe('ingreso');
  });

  it('should handle checkbox checked', () => {
    const { result } = renderHook(() => useForm({}));

    act(() => {
      result.current.handleChange({
        target: {
          name: 'categories',
          value: 'fiction',
          type: 'checkbox',
          checked: true,
        },
      });
    });

    expect(result.current.form.categories).toContain('fiction');
  });

  it('should handle checkbox unchecked', () => {
    const { result } = renderHook(() => useForm({ categories: ['fiction', 'drama'] }));

    act(() => {
      result.current.handleChange({
        target: {
          name: 'categories',
          value: 'fiction',
          type: 'checkbox',
          checked: false,
        },
      });
    });

    expect(result.current.form.categories).not.toContain('fiction');
    expect(result.current.form.categories).toContain('drama');
  });

  it('should preserve existing form values when adding new ones', () => {
    const { result } = renderHook(() => useForm({ existing: 'value' }));

    act(() => {
      result.current.handleChange({
        target: {
          name: 'new',
          value: 'newValue',
          type: 'text',
        },
      });
    });

    expect(result.current.form.existing).toBe('value');
    expect(result.current.form.new).toBe('newValue');
  });
});
