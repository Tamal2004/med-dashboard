export const hexToRgb = (hex, alpha = undefined) => {
    const hexArray = hex
        .replace(
            /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            (m, r, g, b) => '#' + r + r + g + g + b + b
        )
        .substring(1)
        .match(/.{2}/g)
        .map(x => parseInt(x, 16));

    let prefix = 'rgb';
    if (alpha) {
        prefix += 'a';
        hexArray.push(alpha);
    }

    return `${prefix}(${hexArray.join(', ')})`;
};
