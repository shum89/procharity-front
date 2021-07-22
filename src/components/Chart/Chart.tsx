/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { UserData } from '../../pages/Dashboard/Dashboard';
import useStyles from './Chart.styles';

interface ChartProps {
  data: UserData | null;
}
interface ChartData {
  time: number;
  amount: number;
}

export default function Chart({ data }: ChartProps) {
  const theme = useTheme();
  const classes = useStyles();
  const chartData: ChartData[] = Object.keys(data?.added_users ?? {}).reduce((previousValue, currentValue) => {
    const amount = data?.added_users[currentValue] ?? 0;
    const day = Date.parse(currentValue);

    const newObject = { time: day, amount };
    previousValue.push(newObject);
    return previousValue;
  }, [] as ChartData[]);
  const label = (value: any, name: any, props: any) => [value, 'Количество'];
  const laa = (lab: any, payload: any) => {
    if (lab === 0) {
      return 'date';
    }
    const db = new Date(lab);
    const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Intl.DateTimeFormat('ru-Ru', options).format(db);
    return date;
  };

  return (
    <>
      <Typography className={classes.title} variant="h5">
        Cтатистика пользователей за текущий месяц
      </Typography>
      <ResponsiveContainer height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            tickFormatter={(value, index: number) => {
              const dateObj: Date = new Date(value);
              const day = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;

              return day;
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
            wrapperStyle={{ width: 300, backgroundColor: '#FFF', color: 'black' }}
          />
          <YAxis allowDecimals={false} stroke={theme.palette.text.primary}>
            <Label angle={270} position="left" style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}>
              Пользователи
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.secondary.light} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
