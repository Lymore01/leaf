export function testClickEvent(el: HTMLElement) {
  const event = new MouseEvent("click", { bubbles: true, cancelable: true });
  const wasHandled = el.dispatchEvent(event);
  console.log("Click dispatched. Handled?", wasHandled);
}