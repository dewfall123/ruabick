import { ref, Ref } from 'vue';

type IState = string | number | boolean | undefined;

export function useToggle<T = boolean | undefined>(): {
  state: Ref<boolean>;
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
};

export function useToggle<T = IState>(
  defaultValue: T,
): {
  state: Ref<T>;
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
};

export function useToggle<T = IState, U = IState>(
  defaultValue: T,
  reverseValue: U,
): {
  state: Ref<T | U>;
  toggle: (value?: T | U) => void;
  setLeft: () => void;
  setRight: () => void;
};

export function useToggle<D extends IState = IState, R extends IState = IState>(
  defaultValue: D = false as D,
  reverseValue?: R,
) {
  const state = ref<D | R>(defaultValue);

  const setState = (value: D | R) => {
    // TODO
    state.value = value as any;
  };

  const reverseValueOrigin = (reverseValue === undefined
    ? !defaultValue
    : reverseValue) as D | R;

  // 切换返回值
  const toggle = (value: D | R) => {
    if (value === undefined) {
      value = state.value === defaultValue ? reverseValueOrigin : defaultValue;
    }
    setState(value);
  };

  // 设置默认值
  const setLeft = () => {
    setState(defaultValue);
  };

  // 设置取反值
  const setRight = () => {
    setState(reverseValueOrigin);
  };

  return {
    state,
    toggle,
    setLeft,
    setRight,
  };
}
