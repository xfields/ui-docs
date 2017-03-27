import React, {Component, PropTypes} from 'react'
import { Select, Checkbox, Button, message, InputNumber } from 'antd'
import Grid from './grid'
import ColorItem from './colorItem'
import FontItem from './fontItem'
import style from './style'
// import cx from 'classnames'

const Option = Select.Option

export default class Tool extends Component {
  constructor() {
    super()
    this.state = {
      selectedColorIdx: undefined,
      selectedFontIdx: undefined,
      isBgColor: false,
      fontUnit: 'px',
      rem: 75
    }
  }

  static propTypes = {
    doc: PropTypes.object
  }

  render() {
    const {selectedColorIdx, selectedFontIdx, fontUnit, rem} = this.state
    let {doc} = this.props
    const css = this.getCss()

    if (!doc) return null

    let colors = doc.colors || []
    const colorGridItems = colors.map((item, idx) => {
      return React.createElement(ColorItem, {
        idx: idx,
        onClick: ::this.handleColorSelected,
        data: item
      })
    })

    let fonts = doc['font-size'] || []
    const fontGridItems = fonts.map((item, idx) => {
      return React.createElement(FontItem, {
        idx: idx,
        onClick: ::this.handleFontSelected,
        data: item
      })
    })

    let selectedColor = selectedColorIdx !== undefined
      ? colors[selectedColorIdx].key
      : '-1'

    let selectedFont = selectedFontIdx !== undefined
      ? fonts[selectedFontIdx].key
      : '-1'

    return (
      <div className={style.tools}>
        <ul className={style.picker}>
          <li>
            <span className={style.label}>颜色：</span>
            <Select
              showSearch
              value={selectedColor}
              style={{ width: 100 }}
              placeholder="颜色"
              optionFilterProp="children"
              onChange={::this.handleColorSelected}
            >
              <Option value="-1" key={-1}>无</Option>
              {
                colors.map((item, idx) => (
                  <Option value={String(idx)} key={idx}>{item.key}</Option>
                ))
              }
            </Select>
          </li>
          <li>
            <Checkbox onChange={::this.handleIsBgChange}>背景色</Checkbox>
          </li>
        </ul>
        <ul className={style.picker}>
          <li>
            <span className={style.label}>字体：</span>
            <Select
              showSearch
              value={selectedFont}
              style={{ width: 100 }}
              placeholder="文字"
              optionFilterProp="children"
              onChange={::this.handleFontSelected}
            >
              <Option value="-1" key={-1}>无</Option>
              {
                fonts.map((item, idx) => (
                  <Option value={String(idx)} key={idx}>{item.key}</Option>
                ))
              }
            </Select>
          </li>
          <li>
            <span className={style.label}>单位：</span>
            <Select
              value={fontUnit}
              style={{ width: 80 }}
              placeholder="单位"
              onSelect={::this.handleUnitSelected}
            >
              <Option value="px">px</Option>
              <Option value="rem">rem</Option>
              <Option value="flexible">flexible</Option>
            </Select>
          </li>
          <li style={{display: fontUnit === 'rem' ? 'inline-block' : 'none'}}>
            <span className={style.label}>REM: </span>
            <InputNumber min={1} value={rem} size="10" onChange={::this.handleRemChange} />
            <span> px</span>
          </li>
        </ul>
        <div className={style.result}>
          <textarea ref="css" value={css.join('\r\n')} />
          <Button onClick={::this.handleCopy} type="primary" disabled={css.length === 0}>
            复制
          </Button>
        </div>
        <div className={style.section}>
          <h2>颜色：</h2>
          <Grid docId={doc.id} data={colorGridItems} />
        </div>
        <div className={style.section}>
          <h2>文字：</h2>
          <Grid docId={doc.id} data={fontGridItems} />
        </div>
      </div>
    )
  }

  handleColorSelected(v) {
    if (v === '-1') {
      v = undefined
    }
    this.setState({
      selectedColorIdx: v
    })
  }

  handleFontSelected(v) {
    if (v === '-1') {
      v = undefined
    }
    this.setState({
      selectedFontIdx: v
    })
  }

  handleUnitSelected(v) {
    this.setState({
      fontUnit: v
    })
  }

  handleRemChange(v) {
    this.setState({
      rem: v
    })
  }

  handleIsBgChange(e) {
    this.setState({
      isBgColor: e.target.checked
    })
  }

  getCss() {
    let css = []
    const {doc} = this.props
    const {selectedColorIdx, selectedFontIdx, isBgColor, fontUnit, rem} = this.state

    if (selectedColorIdx !== undefined) {
      const color = doc.colors[selectedColorIdx]
      let colorPrefix = isBgColor ? 'background-color' : 'color'
      css.push(`${colorPrefix}: ${color.value};`)
    }

    if (selectedFontIdx !== undefined) {
      const font = doc['font-size'][selectedFontIdx]
      let style = this.getFontSizeStyle(font.value, fontUnit, rem)
      css.push(`font-size: ${style};`)
      if (font.bold) {
        css.push('font-weight: 700;')
      }
    }
    return css
  }

  getFontSizeStyle(size, unit, rem) {
    switch (unit) {
      case 'rem':
        return `${parseFloat((size / rem).toFixed(4))}rem`
      case 'flexible':
        return `dpr(${size}px)`
      case 'px':
      default:
        return `${size}px`
    }
  }

  handleCopy() {
    this.refs.css.select()
    let res = document.execCommand('copy')
    if (res) {
      message.success('css已复制至剪贴板')
    } else {
      message.error('复制失败，请重试或手动复制')
    }
  }
}
