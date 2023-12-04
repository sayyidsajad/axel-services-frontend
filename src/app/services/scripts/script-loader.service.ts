import { Injectable } from '@angular/core';

@Injectable()
export class ScriptLoaderService {
  constructor() { }
  loadScript(scriptUrl: string, callback: () => void): void {
    if (window.google && window.google.maps) {
      if (callback) {
        callback();
      }
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptUrl;
    script.onload = () => {
      if (callback) {
        callback();
      }
    };
    document.body.appendChild(script);
  }
}
