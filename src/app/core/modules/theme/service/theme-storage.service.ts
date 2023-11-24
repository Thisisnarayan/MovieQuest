import { Injectable, InjectionToken } from '@angular/core';
import { Mode } from '../../../model/theme-toggle-model';


/**
 * Injection Token for ModeStorage
 */
export const MODE_STORAGE_SERVICE = new InjectionToken<ThemeStorageService>(
  "MODE_STORAGE"
);

export interface ModeStorage {
 
  save(mode: Mode): void;

  get(): Mode;
}

@Injectable()
export class ThemeStorageService {

  LOCAL_STORAGE_KEY = "mode";

  save(mode: Mode): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, mode.toString());
  }
  get(): Mode {
    return <Mode>localStorage.getItem(this.LOCAL_STORAGE_KEY) || undefined;
  }
}
