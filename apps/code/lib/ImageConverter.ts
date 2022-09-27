type Options = {
  format: ImageFormat;
  download: boolean;
  copyToClipboard: boolean;
  node: HTMLElement;
  cloneNode: HTMLElement;
  height: number;
  width: number;
};

type ImageFormat = "svg" | "png";

export default class ImageConverter {
  private svg: string;

  private constructor(private readonly options: Options) {
    this.svg = this.toSvgDataURI();
  }

  public static generate(
    options: Pick<Options, "format" | "download" | "copyToClipboard">,
    node: HTMLElement
  ) {
    const { clientWidth: width, clientHeight: height } = node;
    const cloneNode = node.cloneNode(true) as HTMLElement;
    const image = new ImageConverter({
      ...options,
      node: node,
      cloneNode,
      width,
      height,
    });
    if (options.download) {
      image.download();
    }

    if (options.copyToClipboard) {
      image.copyToClipboard();
    }
  }

  private toBlob(): Promise<Blob> {
    return new Promise(async (resolve) => {
      const canvas = await this.draw();
      canvas.toBlob((blob) => resolve(blob as Blob));
    });
  }

  private copyToClipboard() {
    this.toBlob().then((data) => {
      return navigator.clipboard.write([
        new ClipboardItem({
          "image/png": data,
        }),
      ]);
    });
  }

  private draw(): Promise<HTMLCanvasElement> {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = this.svg;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    return new Promise((resolve) => {
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
        resolve(canvas);
      };
    });
  }

  private toSvgDataURI(): string {
    this.applyStyles(this.options.node, this.options.cloneNode);
    this.options.cloneNode.setAttribute(
      "xmlns",
      "http://www.w3.org/1999/xhtml"
    );
    const serializedNode = this.serializeNode(this.options.cloneNode);
    return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${
      this.options.width
    }" height="${this.options.height}">
    <foreignObject x="0" y="0" width="100%" height="100%">
        ${this.escapeXhtml(serializedNode, true)}
          </foreignObject>
        </svg>
        `;
  }

  private serializeNode = (node: HTMLElement) => {
    return new XMLSerializer().serializeToString(node);
  };

  private escapeXhtml = (string: string, escapePercentSign: boolean) => {
    if (escapePercentSign) {
      string = string.replace(/%/g, "%25");
    }
    return string.replace(/#/g, "%23").replace(/\n/g, "%0A");
  };

  private async download(fileName: string = "dmrk-screengen") {
    const canvas = await this.draw();
    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    const { format } = this.options;
    if (format === "png") {
      link.href = data;
    }
    if (format === "svg") {
      link.href = this.svg;
    }
    link.download = `${fileName}.${format}`;
    link.click();
    link.remove();
  }

  private applyStyles = (element: HTMLElement, target: HTMLElement) => {
    const styles = window.getComputedStyle(element);
    if (styles.cssText) target.style.cssText = styles.cssText;
    Array.from(styles).forEach((style) => {
      target.style.setProperty(
        style,
        styles.getPropertyValue(style),
        styles.getPropertyPriority(style)
      );
    });
    if (!element.children) return;
    Array.from(element.children).forEach((child, i) => {
      this.applyStyles(child as HTMLElement, target.children[i] as HTMLElement);
    });
  };
}
