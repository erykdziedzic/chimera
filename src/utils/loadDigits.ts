import zeroSrc from '../img/digits/0.png'
import oneSrc from '../img/digits/1.png'
import twoSrc from '../img/digits/2.png'
import threeSrc from '../img/digits/3.png'
import fourSrc from '../img/digits/4.png'
import fiveSrc from '../img/digits/5.png'
import sixSrc from '../img/digits/6.png'
import sevenSrc from '../img/digits/7.png'
import eightSrc from '../img/digits/8.png'
import nineSrc from '../img/digits/9.png'

import config from '../config'
import loadImage from './loadImage'

async function loadDigit(src: string) {
    return await loadImage(src, config.hud.digit.width, config.hud.digit.height)
}


export default async function loadDigits(): Promise<HTMLImageElement[]> {
    return [
        await loadDigit(zeroSrc),
        await loadDigit(oneSrc),
        await loadDigit(twoSrc),
        await loadDigit(threeSrc),
        await loadDigit(fourSrc),
        await loadDigit(fiveSrc),
        await loadDigit(sixSrc),
        await loadDigit(sevenSrc),
        await loadDigit(eightSrc),
        await loadDigit(nineSrc),
    ]
}