import React from 'react'

class SelectorComponent extends React.Component {

    constructor(props) {
        super(props);
        this.displayName = 'SelectorComponent'
    }

    render() {
        return (
            <div className={'SelectorComponent ' + (this.props.passClass ? this.props.passClass : '')}>
                <div className='title'>{this.props.title}
                </div>
                {this.props.subheader ?
                    <div className='subheader'>{this.props.subheader}</div>
                    : null}
                <div className='wrapper'>
                    {this.props.options.map((option, i) => <button
                        className={this.props.active === option.value ? 'active' : ''} key={i}
                        onClick={this.props.click.bind(this, option.value)}>
                        {option.label}
                    </button>)}
                    {/* {this.props.options.map((option, i) => <button
                        className={this.props.active === option ? 'active' : ''} key={i}
                        onClick={this.props.click.bind(this, option)}>
                        {option}
                    </button> )} */}
                </div>
            </div>
        )
    }
}

export default SelectorComponent
