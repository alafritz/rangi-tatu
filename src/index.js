// libraries
import React from 'react'
import { createRoot } from 'react-dom/client'
import convert from 'color-convert'
import contrast from 'get-contrast'
// assets
import './index.scss'
import constants from '../constants'
import createRandomNames from './app/data/name.js'
import helpers from './app/helpers'

import Container from './Container'
import SettingsModal from './SettingsModal'
import Intro from './Intro'
import About from './About'

class Renderer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            intro: true, // landing page
            picker: false, // modal closed by default
            loading: false, // appears after picker create button clicked and before Schemes
            schemes: false, // schemes page appear  or not appear

            about: false, // application/team information that overlays whole app

            hexCode: '',
            baseColor: '',
            hue: '15°',
            saturation: '15%',
            shade: '15%',
            schemesCombinations: [],
            hexError: false,
            showFilters: false,
            filterHue: null,
            filterSaturation: null,
            filterLightness: null
        }
    }

    // accepts: base degree and complimantary angle degree
    // outputs: 2 complimantary color degrees [firstComp, secondComp]
    hslComplimentary(baseD, compD) {
        if (compD <= 0) return null

        let firstComp = baseD + 180 - compD
        if (firstComp < 0) firstComp = firstComp + 360
        if (firstComp > 360) firstComp = firstComp - 360

        let secondComp = baseD -180 + compD
        if(secondComp < 0) secondComp = secondComp + 360
        if(secondComp > 360) secondComp = secondComp - 360

        return [firstComp, secondComp]
    }

    isSchemeWcagCompliant(colorScheme) {
        let passWcag = true

        colorScheme.colors.forEach(color => {
            let hslBackground = `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
            let colorContrast = contrast.score(this.state.baseColor, hslBackground)

            if(colorContrast === 'F') passWcag = false

        })

        return passWcag
    }


    generateCombinations(callback) {
        let newSchemesCombinations = []
        let baseHsl = convert.hex.hsl(this.state.baseColor.replace('#', ''))
        let hue = parseInt(this.state.hue)
        let count1 = 0
        let count2 = 0

        for(let d = 5; d <= 170; d += hue) { // primary hue step
            for(let dd = d + hue; dd <= 170; dd += hue){ // secondary hue step
                let complimentaryColors1 = this.hslComplimentary(baseHsl[0], d)
                let complimentaryColors2 = this.hslComplimentary(baseHsl[0], dd)

                let shade = parseInt(this.state.shade)
                let saturation = parseInt(this.state.saturation)
                // FIXME: 15% shade actually stops at 90 and never reaches 100

                for (let l = constants.minShadeLightStep;
                    l <= constants.maxShadeLightStep;
                    l += shade) { // shade/light step by 10°

                    for (let s = constants.minSaturationStep;
                        s <= constants.maxSaturationStep;
                        s += saturation) { // saturation step by 10%

                        count1 += 1

                        let colorScheme = {
                            colors:[
                                [complimentaryColors1[0], s, l],
                                [complimentaryColors2[0], s, l],
                                [complimentaryColors2[1], s, l],
                                [complimentaryColors1[1], s, l],
                            ],
                            name: createRandomNames()
                        }

                        if(this.isSchemeWcagCompliant(colorScheme)) {
                            count2 += 1
                            newSchemesCombinations.push(colorScheme)
                        }// if all colors in colorScheme are wcag compliant, scheme will be pushed

                    } // stepping through saturation
                } // stepping through shade/lightness

            }
        }

        console.info(`%cTotal: ${count1}, Passed: ${count2}`, 'background: #832C65')

        this.setState({schemesCombinations: newSchemesCombinations}, () => {
            callback()
            setTimeout(()=>{
                document.getElementsByClassName('SchemesComponent')[0].scrollTo(0, 0)
            }, 300)
        })
    } //

    // actions
    togglePicker() {
        this.setState(prev => ({picker: !prev.picker}))
    }

    toggleFilters() {
        this.setState(prev => ({showFilters: !prev.showFilters}))
    }

    openAbout() {
        this.setState({about: true})
    }

    closeAbout() {
        this.setState({about: false})
    }

    closeIntro() {
        this.setState({intro: false})
    }

    createSchemesFromIntro() {
        if (!helpers.isValidHex(this.state.hexCode)) {
            this.setState({ hexError: true })
            return
        }
        this.setState({
            intro: false,
            picker: false,
            loading: true,
            hexError: false,
            baseColor: this.state.hexCode,
            showFilters: false,
            filterHue: null,
            filterSaturation: null,
            filterLightness: null
        })
        setTimeout(() => {
            this.generateCombinations(() =>
                this.setState({ loading: false, schemes: true })
            )
        }, 500)
    }

    changeHue(val) {
        this.setState({hue: val})
    }

    changeSaturation(val) {
        this.setState({saturation: val})
    }

    changeShade(val) {
        this.setState({shade: val})
    }

    changeFilter(property, value) {
        const key = 'filter' + property
        this.setState({ [key]: this.state[key] === value ? null : value })
    }

    resetFilters() {
        this.setState({
            filterHue: null,
            filterSaturation: null,
            filterLightness: null
        })
    }

    createSchemes() {
        if (!helpers.isValidHex(this.state.hexCode)) {
            this.setState({ hexError: true })
            return
        }

        this.setState({
            picker: false,
            loading: true,
            schemes: false,
            hexError: false,
            baseColor: this.state.hexCode,
            showFilters: false,
            filterHue: null,
            filterSaturation: null,
            filterLightness: null
        })

        // callback func created to wait for schemes to be generated before loading page clears
        setTimeout(() => {
            this.generateCombinations(() =>
                this.setState({
                    loading: false,
                    schemes: true,
                })
            )
        }, 800)
    }

    baseColorChange(e) {
        let val = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value
        this.setState({hexCode: val, hexError: false})
    }

    render() {
        return (
            <div>
                <Container {...this.state}
                    togglePicker={this.togglePicker.bind(this)}
                    toggleFilters={this.toggleFilters.bind(this)}
                    openAbout={this.openAbout.bind(this)}
                    changeFilter={this.changeFilter.bind(this)}
                    resetFilters={this.resetFilters.bind(this)}
                    baseColorChange={this.baseColorChange.bind(this)}
                    createSchemes={this.createSchemes.bind(this)}
                />

                {this.state.picker ?
                    <SettingsModal {...this.state}
                        togglePicker={this.togglePicker.bind(this)}
                        changeHue={this.changeHue.bind(this)}
                        changeSaturation={this.changeSaturation.bind(this)}
                        changeShade={this.changeShade.bind(this)}
                        createSchemes={this.createSchemes.bind(this)}
                        baseColorChange={this.baseColorChange.bind(this)}
                    />
                    : null}

                {this.state.intro ?
                    <Intro
                        hexCode={this.state.hexCode}
                        hexError={this.state.hexError}
                        baseColorChange={this.baseColorChange.bind(this)}
                        createSchemesFromIntro={this.createSchemesFromIntro.bind(this)}/>
                    : null}

                { this.state.about ?
                    <About
                        closeAbout=
                            {this.closeAbout.bind(this)} />
                    : null}

            </div>
        );
    }
}

const root = createRoot(document.getElementById('app'));
root.render(<Renderer />);
