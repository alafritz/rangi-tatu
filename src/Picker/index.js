// libraries
import React from 'react'

// components
import Button from '../Button'
import Selector from './Selector'

// assets
import constants from '../../constants'

class PickerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { advancedOpen: false }
    }

    keypress(e){
        if(e.key == 'Enter'){
            this.props.createSchemes()
        }
    }

    toggleAdvanced() {
        this.setState(prev => ({ advancedOpen: !prev.advancedOpen }))
    }

    render() {

        let buttonPassClass = 'title' + (this.props.hexCode.length < 4 ? ' restrict' : '')

        return (
            <div className='PickerComponent' onClick={this.props.togglePicker}>

                <div className='modal' onClick={e => e.stopPropagation()}>

                    <div className='DropHex'>
                        <div className='title'>Base color (hex code)</div>
                        <input className='wrapper' type='text' placeholder='#FFFFFF' maxLength='7'
                            value={this.props.hexCode}
                            onKeyPress={this.keypress.bind(this)}
                            onChange={this.props.baseColorChange.bind(this)}/>
                    </div>

                    <div className='advancedToggle' onClick={this.toggleAdvanced.bind(this)}>
                        <span className={'chevron' + (this.state.advancedOpen ? ' open' : '')}>&#9662;</span>
                        Advanced Options
                    </div>

                    <div className={'advancedOptions' + (this.state.advancedOpen ? ' open' : '')}>
                        <Selector
                            passClass='hue'
                            title='Hue Step'
                            subheader='How far apart colors are on the color wheel'
                            options={constants.SelectorOptions.hueOptions}
                            active={this.props.hue}
                            click={this.props.changeHue}/>

                        <Selector
                            passClass='saturation'
                            title='Saturation Step'
                            subheader='How quickly colors fade toward gray'
                            options={constants.SelectorOptions.saturationOptions}
                            active={this.props.saturation}
                            click={this.props.changeSaturation}/>

                        <Selector
                            passClass='shade'
                            title='Shade/Light Step'
                            subheader='How drastically colors shift toward white or black'
                            options={constants.SelectorOptions.shadeOptions}
                            active={this.props.shade}
                            click={this.props.changeShade}/>
                    </div>

                    <div className='button'>
                        <Button
                            click={this.props.createSchemes}
                            passClass={buttonPassClass}
                            title='Create'/>
                    </div>

                </div>

            </div>
        )
    }
}

export default PickerComponent
