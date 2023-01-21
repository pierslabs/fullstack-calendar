import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from '../../../src/store/ui/uiSlice';

describe('uiSlice', () => {
  test('should return default values', () => {
    const a = uiSlice.getInitialState();
    console.log(a);
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
  });

  test('should change state correctly', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state).toEqual({ isDateModalOpen: true });

    state = uiSlice.reducer(state, onCloseDateModal());

    expect(state).toEqual({ isDateModalOpen: false });
  });
});
