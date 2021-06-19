/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { Data } from './Dashboard';

interface ChartProps {
  data: Data[];
}
export default function Chart({ data }: ChartProps) {
  const theme = useTheme();
  return (
    <>
      <Typography>Общее число пользователей 100000 </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" stroke={theme.palette.text.primary} />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#FFF', color: 'black' }} />
          <YAxis stroke={theme.palette.text.primary}>
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
