import React from 'react'

//components
import Button from '../Button'


class IntroComponent extends React.Component {
    render() {

        return (
            <div className='IntroComponent'>

                <div className='title'>Rangi Bora</div>

                <div className='info'>
                    Instantly create WCAG2 AA compliant color palettes.
                    Get programatically created color palettes that are WCAG2 AA compliant.
                </div>
                <div className='hexInput'>
                    <div className='label'>Your base color</div>
                    <input className={this.props.hexError ? 'error' : ''} type='text' placeholder='#FFFFFF' maxLength='7'
                        value={this.props.hexCode}
                        onChange={this.props.baseColorChange.bind(this)}/>
                    {this.props.hexError && <div className='error-message'>Please enter a 3 or 6 digit hex code</div>}
                </div>

                <Button
                    title='Create'
                    click={this.props.createSchemesFromIntro}/>

            </div>
        )
    }
}

export default IntroComponent
