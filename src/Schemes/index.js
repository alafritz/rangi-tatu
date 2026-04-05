// libraries
import React from 'react'
import convert from 'color-convert'

import Scheme from './Scheme'

class SchemesComponent extends React.Component {

    isBaseColorDark() {
        let darkColor = false
        if (this.props.baseColor.length >= 3 && this.props.schemesCombinations.length >= 0) {
            let color  = convert.hex.hsl(this.props.baseColor)
            if (color[2] < 50) darkColor = true
        }
        return darkColor
    }

    getSortedSchemes() {
        const schemes = [...this.props.schemesCombinations]
        const { sortBy, sortDirection } = this.props
        if (!sortBy) return schemes

        const sortKey = (scheme) => {
            switch (sortBy) {
                case 'hue':
                    return scheme.colors[0][0]
                case 'saturation':
                    return scheme.colors[0][1]
                case 'lightness':
                    return scheme.colors[0][2]
            }
        }

        schemes.sort((a, b) => {
            const diff = sortKey(a) - sortKey(b)
            return sortDirection === 'asc' ? diff : -diff
        })
        return schemes
    }

    sortArrow(property) {
        if (this.props.sortBy !== property) return ''
        return this.props.sortDirection === 'asc' ? ' \u2191' : ' \u2193'
    }

    render() {

        let baseColor = this.props.baseColor && this.props.baseColor.length >= 3 ? this.props.baseColor : null

        let textColor = this.isBaseColorDark() ? '#ffffff' : '#333333'

        let sortedSchemes = this.getSortedSchemes()

        return(

            <div className='SchemesComponent' style={{background: baseColor}}>
                { this.props.schemesCombinations.length >= 1 ?
                    <div className='schemesInner'>
                        <div className='sortBar' style={{color: textColor}}>
                            <span className='sortLabel'>Sort by:</span>
                            {['hue', 'saturation', 'lightness'].map(prop => (
                                <button
                                    key={prop}
                                    className={'sortButton' + (this.props.sortBy === prop ? ' active' : '')}
                                    style={this.props.sortBy === prop
                                        ? { background: textColor, color: baseColor }
                                        : { borderColor: textColor, color: textColor }}
                                    onClick={this.props.changeSort.bind(this, prop)}>
                                    {prop.charAt(0).toUpperCase() + prop.slice(1)}{this.sortArrow(prop)}
                                </button>
                            ))}
                        </div>
                        <div className='schemes'>
                            {sortedSchemes.map((scheme, i) => (
                                <Scheme hexColor={baseColor} colors={scheme.colors} name={scheme.name} key={i} />
                            ))}
                        </div>
                    </div> :
                    <div className='noSchemesMessage' style={{color: textColor}}>Oops! There aren&apos;t any compliant color groupings. Please choose a new color and try again.</div>
                }
            </div>
        )
    }
}

export default SchemesComponent
