#!/usr/bin/env node

import chalk from 'chalk'
import { range } from './lib/range'
import { fetchElements } from './lib/fetchElements'
import { fetchGitHubUserInfo } from './lib/fetchGitHubUserInfo'

const GITHUB_USERNAME_REGEXP = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

const main = async () => {
  const username = process.argv[2].replace(/^@/, '')
  if (!GITHUB_USERNAME_REGEXP.test(username)) {
    throw Error('The argument must be a GitHub username.')
  }

  const joinedYear = await fetchGitHubUserInfo(username)
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
          .then(days => days.map(({ attributes }) => ({ date: attributes['data-date'], count: parseInt(attributes['data-count'], 10) })))
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
