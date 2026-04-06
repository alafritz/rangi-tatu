import React from 'react'
import convert from 'color-convert'

import Selector from '../Picker/Selector'
import filterSchemes from '../app/filterSchemes'

class FilterBarComponent extends React.Component {

    isBaseColorDark() {
        let darkColor = false
        if (this.props.baseColor.length >= 3) {
            let color = convert.hex.hsl(this.props.baseColor)
            if (color[2] < 50) darkColor = true
        }
        return darkColor
    }

    isFiltered() {
        return this.props.filterHue !== null
            || this.props.filterSaturation !== null
            || this.props.filterLightness !== null
    }

    render() {
        let baseColor = this.props.baseColor && this.props.baseColor.length >= 3 ? this.props.baseColor : null
        let textColor = this.isBaseColorDark() ? '#ffffff' : '#333333'
        let filtered = this.isFiltered()
        let totalCount = this.props.schemesCombinations.length
        let filteredCount = filtered
            ? filterSchemes(this.props.schemesCombinations, this.props.filterHue, this.props.filterSaturation, this.props.filterLightness).length
            : totalCount

        return (
            <div className={'FilterBarComponent' + (this.isBaseColorDark() ? ' dark' : '')} style={{ color: textColor, background: baseColor }}>
                <div className='filterRow'>

                    <Selector
                        passClass='filterSelector'
                        title='Saturation'
                        options={[
                            { value: 'low', label: 'Low' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'high', label: 'High' }
                        ]}
                        active={this.props.filterSaturation}
                        click={this.props.changeFilter.bind(this, 'Saturation')} />

                    <Selector
                        passClass='filterSelector'
                        title='Hue'
                        options={[
                            { value: 'warm', label: 'Warm' },
                            { value: 'cold', label: 'Cold' }
                        ]}
                        active={this.props.filterHue}
                        click={this.props.changeFilter.bind(this, 'Hue')} />

                    <Selector
                        passClass='filterSelector'
                        title='Lightness'
                        options={[
                            { value: 'dark', label: 'Dark' },
                            { value: 'mid', label: 'Mid' },
                            { value: 'light', label: 'Light' }
                        ]}
                        active={this.props.filterLightness}
                        click={this.props.changeFilter.bind(this, 'Lightness')} />
                </div>
                <span className='filterCount'>
                    {filteredCount} of {totalCount}
                    {/* {filtered ?
                        <a className='resetLink' onClick={this.props.resetFilters}> Reset</a>
                        : null} */}
                </span>
            </div>
        )
    }
}

export default FilterBarComponent
