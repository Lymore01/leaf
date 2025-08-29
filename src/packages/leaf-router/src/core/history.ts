// Wrapper for history API
export class History {
    private listeners: Array<(path: string) => void> = [];
    
    constructor() {
        window.addEventListener('popstate', this.handlePopState);
    }
    
    private handlePopState = () => {
        this.notifyListeners(window.location.pathname);
    };
    
    public push(path: string) {
        window.history.pushState({}, '', path);
        this.notifyListeners(path);
    }
    
    public replace(path: string) {
        window.history.replaceState({}, '', path);
        this.notifyListeners(path);
    }
    
    public onChange(listener: (path: string) => void) {
        this.listeners.push(listener);
    }
    
    public offChange(listener: (path: string) => void) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
    
    private notifyListeners(path: string) {
        this.listeners.forEach(listener => listener(path));
    }
}