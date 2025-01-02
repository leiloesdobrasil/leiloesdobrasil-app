"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Mock data
const mockData = {
  metrics: {
    totalRevenue: {
      value: 45231.89,
      change: 20.1,
      trend: "up",
    },
    subscriptions: {
      value: 2350,
      change: 180.1,
      trend: "up",
    },
    sales: {
      value: 12234,
      change: 19,
      trend: "up",
    },
    activeNow: {
      value: 573,
      change: 201,
      trend: "up",
    },
  },
  recentSales: [
    {
      id: 1,
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: 1999.0,
    },
    {
      id: 2,
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: 39.0,
    },
    {
      id: 3,
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: 299.0,
    },
    {
      id: 4,
      name: "William Kim",
      email: "will@email.com",
      amount: 99.0,
    },
    {
      id: 5,
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: 39.0,
    },
  ],
  chartData: [
    { month: "Jan", value: 2800 },
    { month: "Feb", value: 2200 },
    { month: "Mar", value: 2000 },
    { month: "Apr", value: 1200 },
    { month: "May", value: 4000 },
    { month: "Jun", value: 2400 },
    { month: "Jul", value: 2000 },
    { month: "Aug", value: 4200 },
    { month: "Sep", value: 2800 },
    { month: "Oct", value: 3000 },
    { month: "Nov", value: 3200 },
    { month: "Dec", value: 2600 },
  ],
};

function Overview({ data }: { data: Array<{ month: string; value: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="value"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function RecentSales({
  data,
}: {
  data: Array<{ id: number; name: string; email: string; amount: number }>;
}) {
  return (
    <div className="space-y-8">
      {data.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {sale.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">
            +${sale.amount.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsView() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden md:flex">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Jan 20, 2023 - Feb 09, 2023
          </Button>
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${mockData.metrics.totalRevenue.value.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{mockData.metrics.totalRevenue.change}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +{mockData.metrics.subscriptions.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{mockData.metrics.subscriptions.change}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +{mockData.metrics.sales.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{mockData.metrics.sales.change}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +{mockData.metrics.activeNow.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{mockData.metrics.activeNow.change} since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={mockData.chartData} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <p className="text-sm text-muted-foreground">
                  You made 265 sales this month.
                </p>
              </CardHeader>
              <CardContent>
                <RecentSales data={mockData.recentSales} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
