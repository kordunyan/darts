export abstract class AbstractStorageService  {

    constructor() {}

    protected updateObjectItem(key: string, value: any) {
        this.updateItem(key, JSON.stringify(value));
    }

    protected getObjectItem(key: string): any {
        const result = this.getItem(key);
        if (result) {
            return JSON.parse(result);
        }
        return undefined;
    }

    protected updateItem(key: string, value: any) {
        window.localStorage.removeItem(key);
        window.localStorage.setItem(key, value);
    }

    protected getItem(key: string): any {
        return window.localStorage.getItem(key);
    }
}