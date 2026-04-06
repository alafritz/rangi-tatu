//libraries
import React from 'react'

//helpers
import helpers from '../app/helpers'

//components
import Button from '../Button'

//assets
import picker from '../app/img/picker.svg'
import picker2 from '../app/img/picker2.svg'
import question from '../app/img/question.svg'
import question2 from '../app/img/question2.svg'


class HeaderComponent extends React.Component {

    render() {

        let isBaseColorDark = helpers.isBaseColorDark(this.props)
        
        let baseColor = this.props.baseColor.length >= 3 ? this.props.baseColor : null

        let textColor = isBaseColorDark ? '#ffffff' : '#333333'

        let pickerIcon = isBaseColorDark ? picker2 : picker
        let questionIcon = isBaseColorDark ? question2 : question

        return (
            <div className='HeaderComponent' style={{color: textColor, background: baseColor}}>
                <div className='header-content'>
                    <h1 className='title'>
                        Rangi Bora
                    </h1>
                    <div className='header-right'>
                        <Button
                            click={this.props.toggleFilters}
                            passClass='headerButton'
                            title='Filters'/>
                        <Button
                            click={this.props.togglePicker}
                            passClass='headerButton'
                            title={<span><img src={pickerIcon} /> Edit color</span>}/>
                        <Button
                            click={this.props.openAbout}
                            passClass='headerButton'
                            title={<img src={questionIcon} />}/>
                    </div>
                </div>
            </div>
        )
    }

} // HeaderComponent

export default HeaderComponent
