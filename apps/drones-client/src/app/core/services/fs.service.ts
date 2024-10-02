export abstract class FSService {
  public abstract getFile(url: string): Promise<ArrayBuffer>;
}

export function FSServiceFactory(): FSService {
  if (window.electron) {
    return new FSElectronService();
  }

  return new FSWebService();
}

export class FSElectronService extends FSService {
  public override getFile(url: string): Promise<ArrayBuffer> {
    return window.electron.fs.getFile(url);
  }
}

export class FSWebService extends FSService {
  public override getFile(url: string): Promise<ArrayBuffer> {
    throw new Error('Method not implemented');
  }
}
