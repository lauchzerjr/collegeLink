export type UnsubscribeFn = () => void;

export interface SubscribableController<ReducerType> {
  subscribe: (reducer: ReducerType) => UnsubscribeFn;
}

type Fn = (...args: any[]) => any;
type Reducer = Record<string, Fn>;
type Unsubscribe = () => void;

let seed = 0;
export abstract class AbstractSubscribableController<
  ReducerType extends Reducer
> implements SubscribableController<ReducerType>
{
  private observers: Map<number, ReducerType> = new Map();

  subscribe(reducer: ReducerType): Unsubscribe {
    seed++;
    this.observers.set(seed, reducer);

    // Retornando o unsubscribe
    return () => {
      this.observers.delete(seed);
    };
  }

  // Aqui pode ter o nome que quiser: dispatch, emit, notify, etc
  dispatch<K extends keyof ReducerType>(
    event: K,
    ...args: Parameters<ReducerType[K]>
  ) {
    this.observers.forEach((observer) => observer[event]?.(...args));
  }
}
