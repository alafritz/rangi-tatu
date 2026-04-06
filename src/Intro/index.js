import React from 'react'

//components
import Button from '../Button'
import HexInput from '../HexInput'


class IntroComponent extends React.Component {
    render() {

        return (
            <div className='IntroComponent'>

                <div className='title'>Rangi Bora</div>

                <div className='subheader'>
                    Break out from color normcore
                </div>

                <div className='info'>
                    Find exciting color palettes for your projects. All colors generated are WCAG AA compliant as well!
                </div>
                <HexInput
                    label='Your base color'
                    hexCode={this.props.hexCode}
                    hexError={this.props.hexError}
                    onChange={this.props.baseColorChange.bind(this)}>
                    <Button
                        title='Create'
                        click={this.props.createSchemesFromIntro}/>
                </HexInput>

            </div>
        )
    }
}

export default IntroComponent
