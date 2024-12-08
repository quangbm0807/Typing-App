import React from 'react';
import { Card, Table, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, PieChart, Pie, Tooltip as RechartsTooltip } from 'recharts';
import type { WordStat } from '../types';

interface StatisticsProps {
    wordStats: Record<string, WordStat>;
}

const Statistics: React.FC<StatisticsProps> = ({ wordStats }) => {
    // Filter only words with incorrect attempts for charts and table
    const incorrectWordsData = Object.values(wordStats).filter(stat => stat.incorrect > 0);

    const wordStatsData = incorrectWordsData
        .sort((a, b) => b.attempts - a.attempts)
        .slice(0, 10);

    const pieChartData = incorrectWordsData.map(stat => ({
        name: stat.word,
        value: stat.attempts,
        accuracy: stat.accuracy,
    }));

    const columns = [
        {
            title: 'Từ',
            dataIndex: 'word',
            key: 'word',
        },
        {
            title: 'Số lần gõ',
            dataIndex: 'attempts',
            key: 'attempts',
            sorter: (a: WordStat, b: WordStat) => b.attempts - a.attempts,
        },
        {
            title: 'Sai',
            dataIndex: 'incorrect',
            key: 'incorrect',
        },
        {
            title: 'Độ chính xác',
            dataIndex: 'accuracy',
            key: 'accuracy',
            render: (value: number) => `${value.toFixed(1)}%`,
            sorter: (a: WordStat, b: WordStat) => b.accuracy - a.accuracy,
        },
    ];

    return (
        <>
            <Card title="Thống kê từ vựng">
                <Tabs
                    items={[
                        {
                            key: '1',
                            label: 'Biểu đồ cột',
                            children: (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={wordStatsData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="word" />
                                        <YAxis />
                                        <RechartsTooltip />
                                        <Bar dataKey="attempts" fill="#8884d8">
                                            {wordStatsData.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={entry.accuracy > 80 ? '#52c41a' : '#f5222d'}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            ),
                        },
                        {
                            key: '2',
                            label: 'Biểu đồ tròn',
                            children: (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={pieChartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            label={({ name, value }) => `${name}: ${value}`}
                                        >
                                            {pieChartData.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={entry.accuracy > 80 ? '#52c41a' : '#f5222d'}
                                                />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ),
                        },
                    ]}
                />
            </Card>

            <Card title="Chi tiết các từ sai">
                <Table
                    dataSource={incorrectWordsData}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    rowKey="word"
                    scroll={{ x: 'max-content' }} // Makes the table responsive
                />
            </Card>
        </>
    );
};

export default Statistics;
