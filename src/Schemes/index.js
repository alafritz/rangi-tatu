// libraries
import React from 'react'
import convert from 'color-convert'

import Scheme from './Scheme'
import filterSchemes from '../app/filterSchemes'

class SchemesComponent extends React.Component {

    isBaseColorDark() {
        let darkColor = false
        if (this.props.baseColor.length >= 3 && this.props.schemesCombinations.length >= 0) {
            let color  = convert.hex.hsl(this.props.baseColor)
            if (color[2] < 50) darkColor = true
        }
        return darkColor
    }

    render() {

        let baseColor = this.props.baseColor && this.props.baseColor.length >= 3 ? this.props.baseColor : null
        let textColor = this.isBaseColorDark() ? '#ffffff' : '#333333'
        let filteredSchemes = filterSchemes(
            this.props.schemesCombinations,
            this.props.filterHue,
            this.props.filterSaturation,
            this.props.filterLightness
        )
        let isFiltered = this.props.filterHue !== null
            || this.props.filterSaturation !== null
            || this.props.filterLightness !== null

        return(

            <div className='SchemesComponent' style={{background: baseColor}} onScroll={this.props.onScroll}>
                { filteredSchemes.length >= 1 ?
                    <div className='schemes'>
                        {filteredSchemes.map((scheme, i) => (
                            <Scheme hexColor={baseColor} colors={scheme.colors} name={scheme.name} key={i} />
                        ))}
                    </div> :
                    <div className='noSchemesMessage' style={{color: textColor}}>
                        {isFiltered ?
                            <span>No palettes match your applied filters.<br></br> <a className='resetLink' onClick={this.props.resetFilters}>Reset filters</a></span> :
                            'Oops! No compliant color groupings possible. Please enter a new hex code.'
                        }
                    </div>
                }
            </div>
        )
    }
}

export default SchemesComponent
