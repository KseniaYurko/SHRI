import { SegmentName, segmentNames } from './model';
export function isElement(element: Node): element is HTMLElement {
    return element.nodeType === 1;
}
export function isTemplateNode(element: Node): element is HTMLTemplateElement {
    return isElement(element) && element.nodeName === 'TEMPLATE';
}
export function imageCreator(templateId: string): (() => Node) | null {
    const templateElement = document.getElementById(templateId);
    if (!templateElement)
        return null;
    if (!isTemplateNode(templateElement))
        return null;
    const clone = () => templateElement.content.cloneNode(true);
    return clone;
}
export function checkNonNullable<T>(value: T): asserts value is NonNullable<T> {
    if (value === null) {
        throw new Error('value is null');
    }
}
export function makeDisplays(amount: number, parentElement: Element, domOptions: {className: string, templateId: string}): Element[] {
    const displays = [...parentElement.querySelectorAll(`.${domOptions.className}`)];
    for (let i = displays.length - 1; i >= amount; i -= 1) {
        displays[i].remove();
        displays.pop();
    }
    const getImage = imageCreator(domOptions.templateId);
    while (getImage && displays.length < amount) {
        const display = getImage();
        parentElement.append(display);
        const last = parentElement.lastChild;
        if (last && isElement(last))
            displays.push(last);
    }
    return displays;
}
export function updateDisplay(segments: SegmentName[], display: Element): void {
    for (const segmentName of segmentNames) {
        display.classList.remove(segmentName);
    }
    for (const segmentName of segments) {
        display.classList.add(segmentName);
    }
}
export function updateDisplayBlock(segments: SegmentName[][], parentElement: Element, domOptions: {className: string, templateId: string}): void {
    const displays = makeDisplays(segments.length, parentElement, domOptions);
    segments.forEach((segment, i: number) => {
        updateDisplay(segment, displays[i]);
    });
}
export function initAnimation(domOptions: {className: string, templateId: string}) {
    const frameDelay = 200;
    const frameBuffers = new Map<Element, SegmentName[][][]>();
    function animateFrame() {
        for (const [parent, frameBuffer] of frameBuffers) {
            if (frameBuffer.length) {
                const block = frameBuffer.pop();
                if (!block)
                    return;
                updateDisplayBlock(block, parent, domOptions);
            }
            else {
                frameBuffers.delete(parent);
            }
        }
    }
    setInterval(animateFrame, frameDelay);
    return frameBuffers;
}
