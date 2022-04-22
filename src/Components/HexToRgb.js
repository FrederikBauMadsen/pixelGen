export default function hex2RGB(h){
    if(h.length === 4 || h.length === 5) {
        return [parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16), parseInt(h[3] + h[3], 16)];
    }
    return [parseInt(h[1] + h[2], 16), parseInt(h[3] + h[4], 16), parseInt(h[5] + h[6], 16)];
}
