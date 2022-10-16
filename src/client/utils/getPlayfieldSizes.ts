export const getPlayfieldSizes = (height: number, cols: number) => {
    const width = height / 2;
    const blockSize = width / cols;

    return [width, blockSize];
};
