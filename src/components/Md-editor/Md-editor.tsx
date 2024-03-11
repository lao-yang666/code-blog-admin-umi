import breaks from '@bytemd/plugin-breaks'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import medium from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import frontmatter from '@bytemd/plugin-frontmatter'
import { Editor } from '@bytemd/react'
import React from 'react'
import markdownTheme from '@ziuchen/bytemd-plugin-markdown-theme'
import themes from '@ziuchen/bytemd-plugin-markdown-theme/dist/themes.json'
import highlightTheme from '@ziuchen/bytemd-plugin-highlight-theme'
import hls from '@ziuchen/bytemd-plugin-highlight-theme/dist/highlights.json'
import savePlugin from './plugins/plugin-save'
import backPlugin from './plugins/plugin-back'
import './Md-editor.less';
import zhHans from 'bytemd/locales/zh_Hans.json'
const MdEditor: React.FC<any> = ({ value, onChange, onSave, onBack }) => {
  const plugins = [
    gfm(),
    breaks(),
    gemoji(),
    highlight(),
    math(),
    medium(),
    mermaid(),
    frontmatter(),
    markdownTheme({
      themes: themes,
    }),
    highlightTheme({
      highlights: hls,
    }),
    savePlugin(onSave),
    backPlugin(onBack),
    // Add more plugins here
  ]
  return (
    <Editor
      locale={zhHans}
      value={value}
      plugins={plugins}
      onChange={(v) => {
        onChange(v)
      }}
    />
  )
}

export default MdEditor;