import React from 'react'

//components
import Button from '../Button'

class IntroComponent extends React.Component {
    render() {

        let buttonPassClass = this.props.hexCode.length < 4 ? 'restrict' : ''

        return (
            <div className='IntroComponent'>

                <div className='title'>Rangi Bora</div>

                <div className='info'>
                    Instantly create WCAG2 AA compliant color palettes.
                    Get programatically created color palettes that are WCAG2 AA compliant.
                </div>

                <div className='hexInput'>
                    <div className='label'>Your base color</div>
                    <input type='text' placeholder='#FFFFFF' maxLength='7'
                        value={this.props.hexCode}
                        onChange={this.props.baseColorChange.bind(this)}/>
                </div>

                <Button
                    title='Let&apos;s Go'
                    passClass={buttonPassClass}
                    click={this.props.createSchemesFromIntro}/>

            </div>
        )
    }
}

export default IntroComponent
