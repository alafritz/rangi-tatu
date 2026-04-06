//libraries
import React from 'react'

//components
import Header from '../Header'
import FilterBar from '../FilterBar'
import Loading from '../Loading'
import Schemes from '../Schemes'


class ContainerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { headerHidden: false }
        this.lastScrollTop = 0
    }

    handleScroll(e) {
        const scrollTop = e.target.scrollTop
        const delta = scrollTop - this.lastScrollTop
        if (delta > 5 && scrollTop > 50) {
            this.setState({ headerHidden: true })
        } else if (delta < -5) {
            this.setState({ headerHidden: false })
        }
        this.lastScrollTop = scrollTop
    }

    render() {
        return (
            <div className='ContainerComponent'>
                <div className={'headerWrapper' + (this.state.headerHidden ? ' hidden' : '')}>
                    <Header {...this.props} />
                </div>
                {this.props.schemes ?
                    <div className={'filterBarSlider' + (this.props.showFilters ? ' open' : '')}>
                        <FilterBar {...this.props} />
                    </div>
                    : null}
                {this.props.loading ? <Loading {...this.props}/> : null}
                {this.props.schemes ? <Schemes {...this.props}
                    onScroll={this.handleScroll.bind(this)} /> : null}
            </div>
        );
    }
}

export default ContainerComponent
