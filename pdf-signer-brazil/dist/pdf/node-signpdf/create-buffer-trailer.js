"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createBufferTrailer = (pdf, info, addedReferences) => {
    let rows = [];
    rows[0] = '0000000000 65535 f ';
    addedReferences.forEach((offset, index) => {
        const paddedOffset = `0000000000${offset}`.slice(-10);
        rows[index + 1] = `${index} 1\n${paddedOffset} 00000 n `;
    });
    rows = rows.filter(row => row !== undefined);
    return Buffer.concat([
        Buffer.from('xref\n'),
        Buffer.from(`${info.xref.startingIndex} 1\n`),
        Buffer.from(rows.join('\n')),
        Buffer.from('\ntrailer\n'),
        Buffer.from('<<\n'),
        Buffer.from(`/Size ${info.xref.maxIndex + 1}\n`),
        Buffer.from(`/Prev ${info.xRefPosition}\n`),
        Buffer.from(`/Root ${info.rootRef}\n`),
        Buffer.from('/Info 15 0 R\n'),
        Buffer.from('>>\n'),
        Buffer.from('startxref\n'),
        Buffer.from(`${pdf.length}\n`),
        Buffer.from('%%EOF'),
    ]);
};
exports.default = createBufferTrailer;
