export abstract class VNodeBase {
  dom?: Node;
  
  abstract mount(): Node;
  abstract patch(newNode: VNodeBase): void;
  abstract unmount(): void;

  // lifecycle hooks
  onMount?(): void;
  onUpdate?(newNode: VNodeBase): void;
  onUnmount?(): void;
}
