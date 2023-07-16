'use client';

import { Box } from '@mantine/core';
import { DocumentNavigation } from './components/document-navigation';
import { useActiveDocumentValue, useDocumentContext } from './scripts/document-context';
import { DocumentHeader } from './components/document-header';
import { BaseDocumentViewer } from './components/document-viewer/base-document-viewer';
import { useState } from 'react';
import { findDecreaseZoom, findIncreaseZoom, zoomOptions } from './scripts/zoom';
import { useApplicationSettings } from '@/scripts/user-settings';
import { FullPageLoader } from '../full-page-loader';

export default function DocumentPage() {
  const activeDocument = useActiveDocumentValue();
  const [appSettings] = useApplicationSettings();
  const [currentScale, setCurrentScale] = useState(appSettings.defaultZoomValue);
  const [context] = useDocumentContext()
  
  if (context == null) {
    return <FullPageLoader />;
  }

  return (
    <Box w='100%' h='100%'>
      <Box sx={{ backgroundColor: 'white' }}>
        <DocumentHeader 
          zoomProperties={{ 
            options: zoomOptions,
            currentZoom: currentScale,
            onZoomChange: v => setCurrentScale(v) ,
            onZoomIncrease: () => setCurrentScale(v => findIncreaseZoom(v)),
            onZoomDecrease: () => setCurrentScale(v => findDecreaseZoom(v))
          }} 
        />
      </Box>
      <DocumentNavigation />
      {
        activeDocument &&
        <BaseDocumentViewer 
          file={activeDocument}
          scale={parseFloat(currentScale)}
        />
      }
    </Box>
  )
}
