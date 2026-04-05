const FILTER_RANGES = {
    hue:        { warm: [0, 180], cold: [180, 360] },
    saturation: { low: [0, 33], medium: [33, 67], high: [67, 100] },
    lightness:  { dark: [0, 33], mid: [33, 67], light: [67, 100] }
}

function circularMeanHue(colors) {
    let sinSum = 0, cosSum = 0
    colors.forEach(c => {
        const rad = c[0] * Math.PI / 180
        sinSum += Math.sin(rad)
        cosSum += Math.cos(rad)
    })
    let avg = Math.atan2(sinSum, cosSum) * 180 / Math.PI
    if (avg < 0) avg += 360
    return avg
}

export default function filterSchemes(schemes, filterHue, filterSaturation, filterLightness) {
    let results = schemes.filter(scheme => {
        const sat = scheme.colors[0][1]
        const lit = scheme.colors[0][2]

        if (filterHue) {
            const avgHue = circularMeanHue(scheme.colors)
            const [min, max] = FILTER_RANGES.hue[filterHue]
            if (avgHue < min || avgHue > max) return false
        }
        if (filterSaturation) {
            const [min, max] = FILTER_RANGES.saturation[filterSaturation]
            if (sat < min || sat > max) return false
        }
        if (filterLightness) {
            const [min, max] = FILTER_RANGES.lightness[filterLightness]
            if (lit < min || lit > max) return false
        }
        return true
    })

    if (filterHue) {
        results.sort((a, b) => {
            const aHue = circularMeanHue(a.colors)
            const bHue = circularMeanHue(b.colors)
            return filterHue === 'warm' ? aHue - bHue : bHue - aHue
        })
    }

    return results
}
