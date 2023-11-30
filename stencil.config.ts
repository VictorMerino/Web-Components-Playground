import { Config } from '@stencil/core';
import { env } from '@alepop/stencil-env';

export const config: Config = {
  namespace: 'web-components-playground',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
  plugins: [env()],
};
