import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {  TrendingUpIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';


import { CreateInvoice } from "./createInvoice";
import { ChartLineLabel } from './revenuechart';


export default function InvoiceOverview() {
   
  return (
    <div>
        <Separator/>
        <div className=" py-4 flex flex-row justify-between items-center">
            <h1 className='text-2xl'>Invoice</h1>
            <CreateInvoice/>
        </div>
        <Separator/>

      <div className="grid md:grid-cols-3 gap-4 p-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">$1,250.00</CardTitle>
            <CardAction>
              <Badge variant={"outline"}>
                <TrendingUpIcon />
                +4053%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-1 items-start justify-center flex-col">
            <span className="flex gap-2 items-center">
              Trending up this month <TrendingUpIcon size={14} />
            </span>
            <CardDescription>Visitors for the last 6 months</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">$1,250.00</CardTitle>
            <CardAction>
              <Badge variant={"outline"}>
                <TrendingUpIcon />
                +4053%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-1 items-start justify-center flex-col">
            <span className="flex gap-2 items-center">
              Trending up this month <TrendingUpIcon size={14} />
            </span>
            <CardDescription>Visitors for the last 6 months</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">$1,250.00</CardTitle>
            <CardAction>
              <Badge variant={"outline"}>
                <TrendingUpIcon />
                +4053%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-1 items-start justify-center flex-col">
            <span className="flex gap-2 items-center">
              Trending up this month <TrendingUpIcon size={14} />
            </span>
            <CardDescription>Visitors for the last 6 months</CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="">
        <ChartLineLabel/>
      </div>
    </div>
  );
}
