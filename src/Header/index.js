//libraries
import React from 'react'

//helpers
import helpers from '../app/helpers'

//components
import Button from '../Button'
import HexInput from '../HexInput'

//assets
import gear from '../app/img/gear.svg'
import gear2 from '../app/img/gear-white.svg'
import info from '../app/img/info.svg'
import info2 from '../app/img/info-white.svg'


class HeaderComponent extends React.Component {

    render() {

        let isBaseColorDark = helpers.isBaseColorDark(this.props)
        
        let baseColor = this.props.baseColor.length >= 3 ? this.props.baseColor : null

        let textColor = isBaseColorDark ? '#ffffff' : '#333333'

        let gearIcon = isBaseColorDark ? gear2 : gear
        let infoIcon = isBaseColorDark ? info2 : info

        return (
            <div className={'HeaderComponent' + (isBaseColorDark ? ' dark' : '')} style={{color: textColor, background: baseColor}}>
                <div className='header-content'>
                    <h1 className='title'>
                        Rangi Bora
                    </h1>
                    <div className='header-center'>
                        <HexInput
                            hexCode={this.props.hexCode}
                            hexError={this.props.hexError}
                            onChange={this.props.baseColorChange}
                            onKeyPress={(e) => { if (e.key === 'Enter') this.props.createSchemes() }}>
                            <Button
                                click={this.props.createSchemes}
                                passClass='headerButton createButton'
                                title='Create'/>
                        </HexInput>
                    </div>
                    <div className='header-right'>
                        <Button
                            click={this.props.toggleFilters}
                            passClass='headerButton'
                            title='Filters'/>
                        <Button
                            click={this.props.togglePicker}
                            passClass='headerButton'
                            title={<img src={gearIcon} />}/>
                        <Button
                            click={this.props.openAbout}
                            passClass='headerButton'
                            title={<img src={infoIcon} />}/>
                    </div>
                </div>
            </div>
        )
    }

} // HeaderComponent

export default HeaderComponent
