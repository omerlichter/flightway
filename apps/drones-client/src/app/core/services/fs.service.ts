export abstract class FSService {
  public abstract getFile(url: string): Promise<ArrayBuffer>;
  public abstract getFilePath(file: File): string;
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

  public override getFilePath(file: File): string {
    return window.electron.fs.getFilePath(file);
  }
}

export class FSWebService extends FSService {
  public override getFile(url: string): Promise<ArrayBuffer> {
    throw new Error('Method not implemented');
  }

  public override getFilePath(file: File): string {
    return file.name;
  }
}
