/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react'
import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts'
import { UserData } from '../../pages/Dashboard/Dashboard'
import useStyles from './Chart.styles'

interface ChartProps {
  data: UserData | null
  title: string
}
interface ChartData {
  time: number
  amountAdded?: number
  amountUnsubscribed?: number
  amountDistinctUnsubscribed?: number
  allActive?: number
  activeSubscribed?: number
  activeUnsubscribed?: number
}

export default function Chart({ data, title }: ChartProps) {
  const theme = useTheme()
  const classes = useStyles()
  // eslint-disable-next-line no-console
  const chartData: ChartData[] = Object.keys(data?.added_users ?? {}).reduce((previousValue, currentValue) => {
    const amountAdded = data?.added_users[currentValue] ?? 0
    const day = Date.parse(currentValue)
    const amountUnsubscribed = data?.users_unsubscribed[currentValue] ?? 0
    const amountDistinctUnsubscribed = data?.distinct_users_unsubscribed[currentValue] ?? 0
    const allActive = data?.active_users_statistic.all[currentValue] ?? 0
    const activeSubscribed = data?.active_users_statistic.subscribed[currentValue] ?? 0
    const activeUnsubscribed = data?.active_users_statistic.unsubscribed[currentValue] ?? 0
    let newObject
    if (title === 'Статистика новых пользователей за месяц') {
      newObject = { time: day, amountAdded }
    } else if (title === 'Статистика отписавшихся пользователей за месяц') {
      newObject = { time: day, amountUnsubscribed, amountDistinctUnsubscribed }
    } else if (title === 'Статистика активных пользователей за месяц') {
      newObject = { time: day, activeUnsubscribed, activeSubscribed, allActive }
    } else {
      newObject = { time: day, amountUnsubscribed, amountAdded }
    }
    previousValue.push(newObject)
    return previousValue
  }, [] as ChartData[])
  const label = (value: any, name: any, props: any) => {
    let labelName;
    switch (name) {
      case 'amountAdded':
        labelName = 'Новых пользователей'
        break
      case 'amountUnsubscribed':
        labelName = 'Отписавшихся пользователей'
        break
      case 'amountDistinctUnsubscribed':
        labelName = 'Отписавшихся уникальных пользователей'
        break
      case 'allActive':
        labelName = 'Активных пользователей'
        break
      case 'activeSubscribed':
        labelName = 'Активных подписавшихся пользователей'
        break
      case 'activeUnsubscribed':
        labelName = 'Активных отписавшихся пользователей'
        break
      default:
        break
    }

    return [value, labelName]
  }
  const laa = (lab: any, payload: any) => {
    if (lab === 0) {
      return 'date'
    }
    const db = new Date(lab)
    const options: any = { day: 'numeric', month: 'long', year: 'numeric' }
    const date = new Intl.DateTimeFormat('ru-Ru', options).format(db)
    return date
  }

  return (
    <>
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      <ResponsiveContainer height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            tickFormatter={(value, index: number) => {
              const dateObj: Date = new Date(value)
              const day = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`

              return day
            }}
            interval={0}
            angle={30}
            dataKey="time"
            tickMargin={10}
            stroke={theme.palette.text.primary}
            style={{
              fontSize: 'clamp(0.875rem, calc(0.875rem + ((1vw - 0.9rem) * 0.8929)), 0.5rem)',
              minHeight: '0vw',
            }}
          />
          <Tooltip
            label="дата"
            labelFormatter={laa}
            formatter={label}
            wrapperStyle={{ width: 420, backgroundColor: '#FFF', color: 'black' }}
          />
          <YAxis allowDecimals={false} stroke={theme.palette.text.primary}>
            <Label angle={270} position="left" style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}>
              Пользователи
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amountAdded" stroke={theme.palette.secondary.light} dot={false} />
          <Line type="monotone" dataKey="amountUnsubscribed" stroke={theme.palette.error.main} dot={false} />
          <Line
            type="monotone"
            dataKey="amountDistinctUnsubscribed"
            stroke={theme.palette.secondary.light}
            dot={false}
          />

          <Line type="monotone" dataKey="activeSubscribed" stroke={theme.palette.secondary.light} dot={false} />
          <Line type="monotone" dataKey="activeUnsubscribed" stroke={theme.palette.error.main} dot={false} />
          <Line type="monotone" dataKey="allActive" stroke={theme.palette.info.light} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
