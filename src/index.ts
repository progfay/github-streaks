#!/usr/bin/env node

import fetch from 'node-fetch'
import chalk from 'chalk'
import { parse } from 'fast-html-parser'

import type { HTMLElement } from 'fast-html-parser'

type AttributesType = {
  [key: string]: string
}

const GITHUB_USERNAME_REGEXP = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

const range = (start: number, end: number): number[] => {
  const r: number[] = []
  for (let i = start; i < end; i++) {
    r.push(i)
  }
  return r
}

const fetchElements = async (url: string, selector: string): Promise<HTMLElement[]> => {
  const response = await fetch(url)
  const html = await response.text()
  const root = parse(html, {
    lowerCaseTagName: false,
    script: false,
    style: false,
    pre: false
  })
  const elements = root.querySelectorAll(selector)
  return elements
}

const getAttributes = (element: HTMLElement) => {
  const attributes: AttributesType = {}
  for (const attr of element.rawAttrs.split(' ')) {
    const [key, ...value] = attr.split('=')
    attributes[key] = value.join('=').replace(/^"(.*)"$/, '$1')
  }
  return attributes
}

const main = async () => {
  const username = process.argv[2].replace(/^@/, '')
  if (!GITHUB_USERNAME_REGEXP.test(username)) {
    throw Error('The argument must be a GitHub username.')
  }

  const joinedYear = await fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(json => { if (!json.created_at) throw new Error(json.message); return json })
    .then(json => json.created_at.replace(/^(\d{4}).+$/, '$1'))
    .then(year => parseInt(year, 10))
    .catch(error => {
      console.log(chalk.red(error))
      process.exit()
    })

  const currentDate = new Date()

  const years = await Promise.all(
    range(joinedYear, currentDate.getFullYear() + 1)
      .map(year => (
        fetchElements(`https://github.com/users/${username}/contributions?from=${year}-12-01&to=${year}-12-31`, 'rect.day')
          .then(days => days.map(day => getAttributes(day)))
          .then(days => days.map(day => ({ date: day['data-date'], count: parseInt(day['data-count'], 10) })))
          .then(days => days.reduce((map, day) => map.set(day.date, day.count), new Map<string, number>()))
      ))
  )

  const days = Array.from((new Map<string, number>(
    years.reduce((accumulator, year) => [...accumulator, ...year.entries()], [] as [string, number][]))).entries())
  .sort((a, b) => a[0] < b[0] ? 1 : -1)

  const today = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
  const todayIndex = days.findIndex(day => day[0] === today)

  console.log(days.splice(todayIndex).findIndex(day => day[1] === 0))
}

main()
