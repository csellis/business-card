#!/usr/bin/env node

import chalk from "chalk"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import corners from "./corners.js"
import dividers from "./dividers.js"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const me = JSON.parse(readFileSync(join(root, "data/me.json"), "utf8"))
const style = JSON.parse(readFileSync(join(root, "data/style.json"), "utf8"))

const base = chalk[style.base]
const accent = chalk[style.accent]

const width = 61
const leftPad = 4
const spaces = n => " ".repeat(Math.max(0, n))

const row = (plain, colored, indent = leftPad) =>
    border + spaces(indent) + colored + spaces(width - indent - plain.length) + border

const rightRow = (plain, colored, rightMargin = 2) =>
    border + spaces(width - rightMargin - plain.length) + colored + spaces(rightMargin) + border

const link = (label, url) => ({
    plain: `${label}: ${url}`,
    colored: `${base(label)}: ${accent(url)}`,
})

const divider = dividers[style.divider]
const { topLeft, topRight, bottomLeft, bottomRight } = corners[style.corners]

const border = base("│")
const topBorder = base(topLeft + "─".repeat(width) + topRight)
const bottomBorder = base(bottomLeft + "─".repeat(width) + bottomRight)
const dividerLine = base("├" + divider.repeat(width) + "┤")
const blankLine = border + spaces(width) + border

const name = { plain: `${me.name} 🃏 ${me.handle}`, colored: `${accent(me.name)} 🃏 ${accent(me.handle)}` }
const title = { plain: `${me.title} @ ${me.company}`, colored: `${me.title} @ ${me.company}` }
const website = link("Website", me.website)
const github = link("GitHub", me.github)
const linkedin = link("LinkedIn", me.linkedin)
const twitter = link("Twitter", me.twitter)
const substack = link("Substack", me.substack)
const cmd = { plain: `npx ${me.handle}`, colored: accent(`npx ${me.handle}`) }

const card = `
    ${topBorder}
    ${blankLine}
    ${row(name.plain, name.colored)}
    ${row(title.plain, title.colored)}
    ${blankLine}
    ${row(website.plain, website.colored)}
    ${row(github.plain, github.colored)}
    ${row(linkedin.plain, linkedin.colored)}
    ${row(twitter.plain, twitter.colored)}
    ${row(substack.plain, substack.colored)}
    ${blankLine}
    ${dividerLine}
    ${rightRow(cmd.plain, cmd.colored)}
    ${bottomBorder}
`

console.log(card)
