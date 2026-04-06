//libraries
import React from 'react'

class AboutComponent extends React.Component {

    render() {
        return (
            <div className='AboutComponent' onClick={this.props.closeAbout}>
                <div className='modal' onClick={e => e.stopPropagation()}>
                    <div className='closeButton' onClick={this.props.closeAbout}>&times;</div>
                    <div className='title'>what&apos;s this?</div>
                    <div className='info'>
                        There were no sites that could generate schemes of WCAG2 AA compliant colors. So I decided to do something about that, and the rest, they say, is history.
                    </div>
                    <div className='madeBy'>
                        Made by <a href='http://www.alafritz.com/' target='_blank' rel='noopener noreferrer'>Fritz</a> & <a href='http://florcalderon.com/' target='_blank' rel='noopener noreferrer'>Flor</a>.
                        <div>Names supplied by <a href='https://www.fantasynamegenerators.com/' target='_blank' rel='noopener noreferrer'>Emily</a>.</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutComponent
