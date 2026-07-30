export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          inlineStyles: { onlyMatchedOnce: false },
          convertPathData: { floatPrecision: 2 },
        },
      },
    },
    'removeDimensions',
    { name: 'removeAttrs', params: { attrs: '(style|preserveAspectRatio|overflow|fill-opacity)' } },
  ],
}
