import React from 'react'

import swatch from '../../assets/swatch.svg'

class HexInput extends React.Component {
    render() {
        return (
            <div className='HexInputComponent'>
                {this.props.label && <div className='label'>{this.props.label}</div>}
                <div className='input-row'>
                    <img className='swatch-icon' src={swatch} />
                    <input
                        className={this.props.hexError ? 'error' : ''}
                        type='text' placeholder='#FFFFFF' maxLength='7'
                        value={this.props.hexCode}
                        onKeyPress={this.props.onKeyPress}
                        onChange={this.props.onChange} />
                    {this.props.children}
                </div>
                {this.props.hexError && <div className='error-message'>Please enter a 3 or 6 digit hex code</div>}
            </div>
        )
    }
}

export default HexInput
