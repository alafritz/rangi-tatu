// libraries
import React from 'react'

// components
import Button from '../Button'
import Selector from '../Selector'

// assets
import constants from '../../constants'

class SettingsModalComponent extends React.Component {


    keypress(e){
        if(e.key == 'Enter'){
            this.props.createSchemes()
        }
    }


    render() {

        return (
            <div className='SettingsModalComponent' onClick={this.props.togglePicker}>

                <div className='modal' onClick={e => e.stopPropagation()}>

                    <div className='modal-title'>
                        Color settings
                    </div>

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


                    <div className='button-row'>
                        <Button
                            click={this.props.togglePicker}
                            passClass='cancelButton'
                            title='Cancel'/>
                        <Button
                            click={this.props.createSchemes}
                            passClass='createButton'
                            title='Apply'/>
                    </div>

                </div>

            </div>
        )
    }
}

export default SettingsModalComponent
