import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { useUiStore } from '../../src/hooks';
import { store, uiSlice } from '../../src/store';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe('useUiStore', () => {
  beforeAll(() => jest.clearAllMocks());

  test('should return default values', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    });
  });

  test('should isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    // TODO: ojo al tomar valores primitivos ya que no cambian ni se mantienen por referencia'isDateModalOpen'
    const { isDateModalOpen, openDateModal } = result.current;

    act(() => {
      openDateModal();
    });

    // TODO: ver aquí:
    // console.log({ result: result.current, isDateModalOpen });

    expect(result.current.isDateModalOpen).toBe(true);
  });

  test('should closeDateModal  ', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(useUiStore, {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { closeDateModal } = result.current;

    act(() => {
      closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBe(false);
  });
});
