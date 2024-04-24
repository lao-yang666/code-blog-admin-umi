import { Viewer } from '@bytemd/react'
import breaks from '@bytemd/plugin-breaks'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import medium from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import frontmatter from '@bytemd/plugin-frontmatter'
import React from 'react'
import markdownTheme from '@ziuchen/bytemd-plugin-markdown-theme'
import highlightTheme from '@ziuchen/bytemd-plugin-highlight-theme'
import themes from '@ziuchen/bytemd-plugin-markdown-theme/dist/themes.json'
import hls from '@ziuchen/bytemd-plugin-highlight-theme/dist/highlights.json'
const MdViewer: React.FC<any> = ({ value }) => {
  const plugins = [
    gfm(),
    math(),
    breaks(),
    gemoji(),
    mermaid(),
    highlight(),
    medium(),
    frontmatter(),
    markdownTheme({
      themes: themes,
    }),
    highlightTheme({
      highlights: hls,
    }),
  ]
  return (
    <Viewer
      value={value}
      plugins={plugins}
    />
  )
}

export default MdViewer;