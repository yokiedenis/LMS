import * as webVitals from 'web-vitals';

type ReportHandler = (metric: { name: string; delta: number; id: string; }) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    webVitals.getCLS(onPerfEntry);
    webVitals.getFID(onPerfEntry);
    webVitals.getFCP(onPerfEntry);
    webVitals.getLCP(onPerfEntry);
    webVitals.getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;