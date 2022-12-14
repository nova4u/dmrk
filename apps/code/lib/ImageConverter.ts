import settings from "../settings.json"

type Options = {
  format: ImageFormat
  download: boolean
  copyToClipboard: boolean
  node: HTMLElement
  cloneNode: HTMLElement
  height: number
  width: number
  scale: number
}

type ImageFormat = "svg" | "png"

export default class ImageConverter {
  private svg: string

  private constructor(private readonly options: Options, private readonly fontStyle: string) {
    this.svg = this.toSvgDataURI()
  }

  public static async generate(
    options: Pick<Options, "format" | "download" | "copyToClipboard"> & {
      font: string
    },
    node: HTMLElement
  ) {
    const { clientWidth: width, clientHeight: height } = node
    const cloneNode = node.cloneNode(true) as HTMLElement
    const fontStyle: string = await this.getFontFamilyStyle(options.font)
    const image = new ImageConverter(
      {
        ...options,
        node: node,
        cloneNode,
        width,
        height,
        scale: options.copyToClipboard ? 3 : 1.3,
      },
      fontStyle
    )
    if (options.download) {
      image.download()
    }

    if (options.copyToClipboard) {
      image.copyToClipboard()
    }
  }

  private toBlob(): Promise<Blob> {
    return new Promise(async (resolve) => {
      const canvas = await this.draw()
      canvas.toBlob((blob) => resolve(blob as Blob))
    })
  }

  private copyToClipboard() {
    this.toBlob().then((data) => {
      return navigator.clipboard.write([
        new window.ClipboardItem({
          "image/png": data,
        }),
      ])
    })
  }

  private draw(): Promise<HTMLCanvasElement> {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.src = this.svg
    canvas.width = this.options.width * this.options.scale
    canvas.height = this.options.height * this.options.scale
    return new Promise((resolve) => {
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
        resolve(canvas)
      }
    })
  }

  private toSvgDataURI() {
    this.applyStyles(this.options.node, this.options.cloneNode)
    this.options.cloneNode.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
    this.options.cloneNode.style.transform = `scale(${this.options.scale})`
    this.options.cloneNode.style.transformOrigin = `top left`
    const serializedNode = this.serializeNode(this.options.cloneNode)
    return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${
      this.options.width * this.options.scale
    }" height="${this.options.height * this.options.scale}">
    <foreignObject x="0" y="0" width="100%" height="100%">
    <style>${this.fontStyle}</style>
        ${this.escapeXhtml(serializedNode, true)}
          </foreignObject>
        </svg>
        `
  }

  private serializeNode = (node: HTMLElement) => {
    return new XMLSerializer().serializeToString(node)
  }

  private escapeXhtml = (string: string, escapePercentSign: boolean) => {
    if (escapePercentSign) {
      string = string.replace(/%/g, "%25")
    }
    return string.replace(/#/g, "%23").replace(/\n/g, "%0A")
  }

  private async download(fileName: string = "dmrk-screengen") {
    const canvas = await this.draw()
    const data = canvas.toDataURL("image/png", 1)
    const link = document.createElement("a")
    const { format } = this.options
    if (format === "png") {
      link.href = data
    }
    if (format === "svg") {
      link.href = this.svg
    }
    link.download = `${fileName}.${format}`
    link.click()
    link.remove()
  }

  private static getFontFamilyStyle = (fontName: string): Promise<string> => {
    return new Promise(async (res) => {
      const font = settings?.fontFamily.find((font) => font.name === fontName)
      if (!font) return
      const fontStyles = await import(`./fonts/${font?.source}`).then((mod) => res(mod.default))
    })
  }

  private applyStyles = (element: HTMLElement, target: HTMLElement) => {
    const styles = window.getComputedStyle(element)
    if (styles.cssText) target.style.cssText = styles.cssText
    Array.from(styles).forEach((style) => {
      target.style.setProperty(
        style,
        styles.getPropertyValue(style),
        styles.getPropertyPriority(style)
      )
    })
    if (!element.children) return
    Array.from(element.children).forEach((child, i) => {
      this.applyStyles(child as HTMLElement, target.children[i] as HTMLElement)
    })
  }
}
