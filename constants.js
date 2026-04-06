
export default {
    minShadeLightStep: 10,
    maxShadeLightStep: 90,
    minSaturationStep: 10,
    maxSaturationStep: 90,
    SelectorOptions: {
        hueOptions: [
            { value: '10°', label: 'Close' },
            { value: '15°', label: 'Moderate' },
            { value: '20°', label: 'Far' },
        ],
        saturationOptions: [
            { value: '10°', label: 'Gradual' },
            { value: '15°', label: 'Moderate' },
            { value: '20°', label: 'Fast' },
        ],
        shadeOptions: [
            { value: '10°', label: 'Subtle' },
            { value: '15°', label: 'Moderate' },
            { value: '20°', label: 'Drastic' },
        ],
    }
}
