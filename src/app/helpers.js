import contrast from 'get-contrast'

export default {

    isValidHex: (hex) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(hex),

    isBaseColorDark: function (props) {
        let darkColor = false

        if (this.isValidHex(props.baseColor) && props.schemesCombinations.length >= 0) {

            let colorContrast = contrast.score(props.baseColor, '#fff')
            if (colorContrast === 'AA' || colorContrast === 'AAA') darkColor = true
        }
        return darkColor
    }
}
